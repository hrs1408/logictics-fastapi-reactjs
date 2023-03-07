from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, root_validator, validator, constr

from models import UserType


class UserCreateSchema(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    confirm_password: str
    phone: str
    address: str

    @root_validator()
    def verify_password_match(cls, values):
        password = values.get("password")
        if len(password) <= 6:
            raise ValueError("Mật khẩu phải lớn hơn 6 ký tự")
        confirm_password = values.get("confirm_password")
        if password != confirm_password:
            raise ValueError("Nhập lại mật khẩu chưa chính xác")
        return values


class UserInternalCreateSchema(BaseModel):
    full_name: str = Field(max_length=40)
    password: str = Field(min_length=6)
    work_address: str
    position: str
    email: EmailStr
    password: str
    phone: str
    type_user: UserType


class UserInformationBase(BaseModel):
    fullname: Optional[str]
    phone_number: Optional[str]
    date_of_birth: Optional[str]
    address: Optional[str]


class UserInformationCreate(UserInformationBase):
    pass


class UserInformationSchema(UserInformationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class UserInternalInformationBase(BaseModel):
    work_address: Optional[str]
    position: Optional[str]


class UserInternalInformationCreate(UserInternalInformationBase):
    pass


class UserInternalInfor(UserInternalInformationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class TokenResponse(BaseModel):
    access_token: str
    access_token_expire: datetime
    token_type: Optional[str] = 'Bearer'
    refresh_token: str
    refresh_token_expire: datetime


class AccessToken(BaseModel):
    access_token: str
    access_token_expire: datetime
    token_type: Optional[str] = 'Bearer'


class RefreshToken(BaseModel):
    refresh_token: str
    refresh_token_expire: datetime
    sub: Optional[str]


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class UserSchemas(BaseModel):
    id: int
    email: str
    # is_active: bool
    type_user: Optional[str]
    user_information: Optional[UserInformationSchema]
    user_internal_information: Optional[UserInternalInfor]

    class Config:
        orm_mode = True


class UserInternalResponseSchema(BaseModel):
    user: UserSchemas
    access_token: str
