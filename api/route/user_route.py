from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from database.database import SessionLocal
from controller.user_controller import get_users, get_user, get_user_by_email, create_user
from schemas.user_schemas import User as UserSchemas
from schemas.user_schemas import UserCreate as UserCreateSchemas
users = APIRouter(
    tags=["User"]
)


def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@users.post("/users/", response_model=UserSchemas)
def create_user_api(user: UserCreateSchemas, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


@users.get("/users/", response_model=list[UserSchemas])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    listUser = get_users(db, skip=skip, limit=limit)
    return listUser


@users.get("/users/{user_id}", response_model=UserSchemas)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
