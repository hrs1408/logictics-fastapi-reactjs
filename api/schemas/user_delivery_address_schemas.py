from pydantic import BaseModel


class UserDeliveryAddressBase(BaseModel):
    province: str
    district: str
    ward: str
    address: str


class UserDeliveryAddressCreate(BaseModel):
    province: str
    district: str
    ward: str
    address: str


class UserDeliveryAddressSchemas(UserDeliveryAddressBase):
    id: int
    user_id: int
    created_at: str

    class Config:
        orm_mode = True
