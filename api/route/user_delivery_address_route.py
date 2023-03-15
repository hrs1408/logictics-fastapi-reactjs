from fastapi import Depends, HTTPException, APIRouter, status
from fastapi_pagination import paginate, Page, Params
from sqlalchemy.orm import Session
from config import get_db
from models import UserDeliveryAddress

from repository.jwt_repository import JWTBearer
from repository.user_delivery_address_repository import UserDeliveryAddressRepository
from schemas.schema import ResponseSchema
from schemas.user_delivery_address_schemas import UserDeliveryAddressSchemas, UserDeliveryAddressCreate
from ultis.securty import get_current_user

deliAddress = APIRouter(
    tags=["User Delivery Address"],
    prefix="/delivery-address",
    dependencies=[Depends(JWTBearer())]
)


@deliAddress.get("/", response_model=Page[UserDeliveryAddressSchemas])
def get_all(params: Params = Depends(), db: Session = Depends(get_db)):
    db_ports = db.query(UserDeliveryAddress).all()
    return paginate(db_ports, params)


@deliAddress.post("/", response_model=ResponseSchema[UserDeliveryAddressSchemas])
def create_new_address(deli_address: UserDeliveryAddressCreate, db: Session = Depends(get_db),
                       sub: int = Depends(get_current_user)):
    deliAddress_new = UserDeliveryAddress(**deli_address.dict())
    deliAddress_new.user_id = sub
    db_deliAddress = UserDeliveryAddressRepository.insert(db, deliAddress_new)
    return ResponseSchema.from_api_route(data=db_deliAddress, status_code=status.HTTP_200_OK)


@deliAddress.get("/{address_id}", response_model=ResponseSchema[UserDeliveryAddressSchemas])
def get_user_deli_address(address_id: int, db: Session = Depends(get_db)):
    db_deliAddress = UserDeliveryAddressRepository.find_by_id(db, UserDeliveryAddress, address_id)
    if db_deliAddress is None:
        raise HTTPException(status_code=404, detail="Delivery Address not found")
    return ResponseSchema.from_api_route(data=db_deliAddress, status_code=status.HTTP_200_OK)


@deliAddress.put("/{address_id}", response_model=ResponseSchema[UserDeliveryAddressSchemas])
def update_deli_address(address_id: int, deli_address: UserDeliveryAddressCreate, db: Session = Depends(get_db)):
    db_deliAddress = UserDeliveryAddressRepository.find_by_id(db, UserDeliveryAddress, address_id)
    if db_deliAddress is None:
        raise HTTPException(status_code=404, detail="Delivery Address not found")
    db_deliAddress.province = deli_address.province if deli_address.province else db_deliAddress.province
    db_deliAddress.district = deli_address.district if deli_address.district else db_deliAddress.district
    db_deliAddress.ward = deli_address.ward if deli_address.ward else db_deliAddress.ward
    db_deliAddress.address = deli_address.address if deli_address.address else db_deliAddress.address
    db_deliAddress = UserDeliveryAddressRepository.update(db, db_deliAddress)
    return ResponseSchema.from_api_route(data=db_deliAddress, status_code=status.HTTP_200_OK)


@deliAddress.delete("/{address_id}", response_model=ResponseSchema)
def delete_deli_address(address_id: int, db: Session = Depends(get_db)):
    db_deliAddress = UserDeliveryAddressRepository.find_by_id(db, UserDeliveryAddress, address_id)
    if db_deliAddress is None:
        raise HTTPException(status_code=404, detail="Delivery Address not found")
    UserDeliveryAddressRepository.delete(db, db_deliAddress)
    return ResponseSchema.from_api_route(status_code=status.HTTP_200_OK, data="Delete success")
