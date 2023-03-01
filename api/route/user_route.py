from fastapi import Depends, HTTPException, APIRouter, status
from sqlalchemy.orm import Session
from automapper import mapper
from config import get_db
from controller.user_controller import get_users, get_user, update_user_information, update_user_internal_information
from models import User, UserInternalInformation
from repository.jwt_repository import JWTBearer
from repository.user_repository import UserRepository, UserInternalInformationRepository
from schemas.schema import ResponseSchema
from schemas.user_schemas import UserSchemas, UserInformation
from schemas.user_schemas import UserInformationCreate, UserInternalInformationCreate
from ultis.securty import get_current_user

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
    # return update_user_internal_information(db=db, user_inter_infor=user_inter_infor, user_id=user_id)
