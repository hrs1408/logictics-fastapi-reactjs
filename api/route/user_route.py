from typing import Optional

from fastapi import Depends, HTTPException, APIRouter, status
from fastapi_pagination import Page, Params, paginate
from sqlalchemy.orm import Session

from config import get_db
from models import User, UserInternalInformation
from repository.jwt_repository import JWTBearer
from repository.user_repository import UserRepository, UserInternalInformationRepository, UserInfoRepository
from schemas.schema import ResponseSchema
from schemas.user_schemas import UserInformationCreate, UserInternalInformationCreate
from schemas.user_schemas import UserSchemas
from ultis.securty import get_current_user

users = APIRouter(
    tags=["User"],
    dependencies=[Depends(JWTBearer())]
)


@users.get("/users", response_model=Page[UserSchemas])
def get_all_user(params: Params = Depends(), is_full: bool = False, search: Optional[str] = None,
                 db: Session = Depends(get_db)):
    if search is not None:
        db_user = db.query(User).filter(User.email.like(f"%{search}%")).all()
    else:
        db_user = db.query(User).all()

    if is_full is True:
        params.size = len(db_user)
    return paginate(db_user, params)


@users.get("/users/{user_id}")
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = UserRepository.find_by_id(db, User, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@users.put("/users/information")
def put_user_information(user_information: UserInformationCreate, db: Session = Depends(get_db),
                         sub: int = Depends(get_current_user)):
    user = UserRepository.find_by_id(db, User, sub)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_info = UserInfoRepository.find_by_user_id(db, sub)
    if user_info is None:
        user_info = UserInformation(
            fullname=user_information.full_name,
            phone_number=user_information.phone,
            address=user_information.address,
            user_id=user.id
        )
        user_info = UserInfoRepository.insert(db, user_info)
    else:
        user_info.fullname = user_information.fullname if user_information.fullname else user_info.fullname
        user_info.phone_number = user_information.phone_number if user_information.phone_number else user_info.phone_number
        user_info.address = user_information.address if user_information.address else user_info.address
        user_info.date_of_birth = user_information.date_of_birth if user_information.date_of_birth else user_info.date_of_birth
        user_info = UserInfoRepository.update(db, user_info)
    return ResponseSchema.from_api_route(data=user_info, status_code=status.HTTP_200_OK)


@users.put("/users/internal_information")
def put_user_inter_infor(user_create_internal: UserInternalInformationCreate,
                         db: Session = Depends(get_db), sub: int = Depends(get_current_user)):
    user = UserRepository.find_by_id(db, User, sub)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_internal_info = UserInternalInformationRepository.find_by_user_id(db, sub)
    if user_internal_info is None:
        user_internal_info = UserInternalInformation(
            work_address=user_create_internal.work_address,
            position=user_create_internal.position,
            user_id=user.id
        )
        user_internal_info = UserInternalInformationRepository.insert(db, user_internal_info)
    else:
        user_internal_info.position = user_create_internal.position if user_create_internal.position else user_internal_info.position
        user_internal_info.work_address = user_create_internal.work_address if user_create_internal.work_address else user_internal_info.work_address
        user_internal_info = UserInternalInformationRepository.update(db, user_internal_info)
    return ResponseSchema.from_api_route(data=user_internal_info, status_code=status.HTTP_200_OK)
