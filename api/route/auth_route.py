from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends, status
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from config import get_db
from models import User, UserInformation
from repository.jwt_repository import JWTRepository, JWTBearer
from repository.user_repository import UserRepository, UserInfoRepository
from schemas.schema import ResponseSchema, Route
from schemas.user_schemas import UserCreateSchema, UserSchemas, LoginRequest, TokenResponse, AccessToken, \
    RefreshTokenRequest

from ultis.securty import get_current_user

auth = APIRouter(
    tags=["Authentication"],
    prefix="/auth"
)

# encrypt password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@auth.post('/login', response_model=ResponseSchema[TokenResponse])
def login(request: LoginRequest, db: Session = Depends(get_db)):
    _user = UserRepository.find_by_email(db, request.email)
    if _user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    if not pwd_context.verify(request.password, _user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password")

    token_response = JWTRepository.update_refresh_token(db, _user)

    return ResponseSchema.from_api_route(data=token_response, status_code=status.HTTP_200_OK).dict(exclude_none=True)


@auth.post("/register", response_model=ResponseSchema[TokenResponse])
def register(user: UserCreateSchema, db: Session = Depends(get_db)):
    is_valid_email = UserRepository.find_by_email(db, user.email)

    if is_valid_email is not None:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        email=user.email,
        hashed_password=hashed_password,
    )
    new_user = UserRepository.insert(db, new_user)

    user_info = UserInformation(
        fullname=user.full_name,
        phone_number=user.phone,
        address=user.address,
        user_id=new_user.id
    )

    UserInfoRepository.insert(db, user_info)

    token_response = JWTRepository.update_refresh_token(db, new_user)

    return ResponseSchema.from_api_route(data=token_response, status_code=status.HTTP_201_CREATED).dict(
        exclude_none=True)


@auth.get("/get-me", dependencies=[Depends(JWTBearer())], response_model=ResponseSchema[UserSchemas])
def get_me(sub: int = Depends(get_current_user), db: Session = Depends(get_db)):
    _user = UserRepository.find_by_id(db, User, sub)

    return ResponseSchema.from_api_route(data=_user, status_code=status.HTTP_200_OK).dict(exclude_none=True)


@auth.post("/refresh-token", response_model=ResponseSchema[TokenResponse])
def get_new_token(request: RefreshTokenRequest, db: Session = Depends(get_db)):
    _refresh_token = JWTRepository.decode_refresh_token(request.refresh_token)
    if _refresh_token is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    _user = UserRepository.find_refresh_token_sub(db, _refresh_token.get('sub')) if _refresh_token.get('sub') else None

    if _user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    access_token = JWTRepository.create_access_token(_user)

    dt = datetime.utcfromtimestamp(_refresh_token.get('exp'))
    now = datetime.utcnow()
    expires_delta = dt - now

    refresh_token = JWTRepository.create_refresh_token({'sub': _refresh_token.get('sub')}, expires_delta=expires_delta)

    token_response = TokenResponse(
        access_token=access_token.access_token,
        access_token_expire=access_token.access_token_expire,
        refresh_token=refresh_token.refresh_token,
        refresh_token_expire=refresh_token.refresh_token_expire
    )

    return ResponseSchema.from_api_route(data=token_response, status_code=status.HTTP_201_CREATED)
