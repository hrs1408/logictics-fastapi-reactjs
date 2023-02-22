from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from database.database import SessionLocal
from controller.user_controller import get_users, get_user
from schemas.user_schemas import User as UserSchemas
from ultis.securty import validate_token

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


@users.get("/users/", response_model=list[UserSchemas], dependencies=[Depends(validate_token)])
def get_all_user(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    listUser = get_users(db, skip=skip, limit=limit)
    return listUser


@users.get("/users/{user_id}", response_model=UserSchemas, dependencies=[Depends(validate_token)])
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
