from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, root_validator, validator, constr


class UserCreateSchema(BaseModel):
    email: EmailStr
    full_name: str = Field(max_length=40)
    password: str = Field(min_length=6)
    confirm_password: str
    phone: constr(regex=r'^0\d{3}[- ]?\d{3}[- ]?\d{4}$')
    address: str
    type_user: str

    @root_validator()
    def verify_password_match(cls, values):
        password = values.get("password")
        confirm_password = values.get("confirm_password")

        if password != confirm_password:
            raise ValueError("Re-enter incorrect password")
        return values

    @validator('phone')
    def normalize_phone_number(cls, v):
        """Xóa tất cả các khoảng trắng và dấu gạch ngang trong số điện thoại."""
        return v.replace(' ', '').replace('-', '')


class UserInformationBase(BaseModel):
    fullname: str | None
    phone_number: str | None
    date_of_birth: str | None
    address: str | None


class UserInformationCreate(UserInformationBase):
    pass


class UserInformation(UserInformationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class UserInternalInformationBase(BaseModel):
    work_address: str | None
    position: str | None


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
    is_active: bool
    type_user: str | None
    user_information: UserInformation | None
    user_internal_information: UserInternalInfor | None

    class Config:
        orm_mode = True
