from datetime import datetime

from pydantic import BaseModel

from schemas.item_schemas import Item


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class UserInformationBase(BaseModel):
    fullname: str
    phone_number: str
    date_of_birth: str
    address: str


class UserInformationCreate(UserInformationBase):
    pass


class UserInformation(UserInformationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class UserInternalInformation(BaseModel):
    id: int
    work_address: str
    position: str

    class Config:
        orm_mode = True


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    token: str
    exp: datetime
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []
    user_information: UserInformation | None = None
    user_internal_information: dict = {}

    class Config:
        orm_mode = True



