from urllib.request import Request

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status

from config import get_db
from controller.user_controller import get_user_by_email, create_user
from repository.user_repository import UserRepository
from schemas.user_schemas import UserCreate as UserCreateSchemas
from controller.auth_controller import verify_password, generate_token
from database.database import SessionLocal
from schemas.user_schemas import LoginRequest
from schemas.user_schemas import User as UserSchemas
from ultis.securty import validate_token

app = APIRouter(
    tags=["Authentication"]
)


@app.post('/login')
def login(request_data: LoginRequest, db: Session = Depends(get_db)):
    if verify_password(email=request_data.email, password=request_data.password, db=db):
        data = generate_token(email=request_data.email)
        return {
            "data": data
        }
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.post("/register/", response_model=UserSchemas)
def register(user: UserCreateSchemas, db: Session = Depends(get_db)):
    db_user = UserRepository.find_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


@app.get("/get_me/", dependencies=[Depends(validate_token)])
def get_me(user_email: str = Depends(validate_token), db: Session = Depends(get_db)):
    return {
        "message": "Get user information successfully",
        "result": get_user_by_email(db, email=user_email),
        "status": "success"
    }
