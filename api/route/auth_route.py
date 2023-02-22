from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from controller.user_controller import get_user_by_email, create_user
from schemas.user_schemas import UserCreate as UserCreateSchemas
from controller.auth_controller import verify_password, generate_token
from database.database import SessionLocal
from schemas.user_schemas import LoginRequest
from schemas.user_schemas import User as UserSchemas
auth = APIRouter(
    tags=["Authentication"]
)


def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@auth.post('/login')
def login(request_data: LoginRequest, db: Session = Depends(get_db)):
    print(f'[x] request_data: {request_data.__dict__}')
    if verify_password(email=request_data.email, password=request_data.password, db=db):
        data = generate_token(email=request_data.email)
        return {'token': data.token, 'exp': data.exp}
    else:
        raise HTTPException(status_code=404, detail="User not found")


@auth.post("/register/", response_model=UserSchemas)
def register(user: UserCreateSchemas, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)
