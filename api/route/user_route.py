from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from config import get_db
from controller.user_controller import get_users, get_user, update_user_information
from repository.jwt_repository import JWTBearer
from schemas.user_schemas import UserSchemas, UserInformation
from schemas.user_schemas import UserInformationCreate

users = APIRouter(
    tags=["User"],
    dependencies=[Depends(JWTBearer())]
)


@users.get("/users", response_model=list[UserSchemas])
def get_all_user(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    list_user = get_users(db, skip=skip, limit=limit)
    return list_user


@users.get("/users/{user_id}", response_model=UserSchemas)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@users.put("/users/{user_id}/information", response_model=UserInformation)
def put_user_information(user_id: int, user_information: UserInformationCreate, db: Session = Depends(get_db)):
    db_user = get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return update_user_information(db=db, user_info=user_information, user_id=user_id)
