from fastapi import Depends, HTTPException, APIRouter, status
from fastapi_pagination import Page, Params, paginate
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from config import get_db
from models import User, UserInternalInformation, UserType, UserInformation
from repository.jwt_repository import JWTBearer
from repository.user_repository import UserRepository, UserInternalInformationRepository, UserInfoRepository
from schemas.schema import ResponseSchema
from schemas.user_schemas import UserInformationSchema, UserSchemas, UserInternalCreateSchema
from schemas.user_schemas import UserInformationCreate, UserInternalInformationCreate
from ultis.securty import get_current_user

users = APIRouter(
    tags=["User"],
    dependencies=[Depends(JWTBearer())]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@users.get("/users", response_model=Page[UserSchemas])
def get_all_user(params: Params = Depends(), db: Session = Depends(get_db)):
    list_user = UserRepository.find_all(db, User)
    return paginate(list_user, params)


@users.get("/users/{user_id}")
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = UserRepository.find_by_id(db, User, id=user_id)
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
        user_info = UserInformationSchema(
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


@users.post('/users/add-user-internal', response_model=ResponseSchema[UserSchemas])
def add_user_internal(user_create_internal: UserInternalCreateSchema, db=Depends(get_db),
                      sub: int = Depends(get_current_user)):
    user = UserRepository.find_by_id(db, User, sub)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    elif user.type_user != UserType.ADMIN:
        raise HTTPException(status_code=403, detail="Forbidden")

    check_user = UserRepository.find_by_email(db, user_create_internal.email)
    if check_user is not None:
        raise HTTPException(status_code=400, detail="Email is already exists")

    new_user = User()
    new_user.email = user_create_internal.email
    new_user.hashed_password = pwd_context.hash(user_create_internal.password)
    new_user = UserRepository.insert(db, new_user)

    new_user_internal = UserInternalInformation()
    new_user_internal.user_id = new_user.id
    new_user_internal.position = user_create_internal.position
    new_user_internal.work_address = user_create_internal.work_address
    UserInternalInformationRepository.insert(db, new_user_internal)

    new_user_info = UserInformation()

    new_user_info.user_id = new_user.id
    new_user_info.fullname = user_create_internal.full_name
    new_user_info.phone_number = user_create_internal.phone

    UserInfoRepository.insert(db, new_user_info)

    return ResponseSchema.from_api_route(data=new_user, status_code=200)
