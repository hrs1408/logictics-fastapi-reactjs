from typing import List

from fastapi import Depends, HTTPException, APIRouter, status
from fastapi_pagination import Params, paginate, Page
from sqlalchemy.orm import Session
from config import get_db
from models import User, Invoice, Port, Voyage, Status
from repository.invoice_repository import InvoiceRepository

from repository.jwt_repository import JWTBearer
from repository.port_repository import PortRepository
from repository.user_repository import UserRepository
from repository.voyage_repository import VoyageRepository
from schemas.port_schames import PortCreate, PortSchema
from schemas.schema import ResponseSchema
from schemas.voyage_schemas import VoyageSchema, VoyageCreateSchema
from ultis.securty import get_current_user

voyages = APIRouter(
    tags=["Voyages"],
    prefix="/voyages",
    dependencies=[Depends(JWTBearer())]
)


@voyages.post('/', response_model=ResponseSchema[VoyageSchema])
def create_voyage(request: VoyageCreateSchema, db=Depends(get_db)):
    check_voyage = VoyageRepository.is_exist(db, request.port_id, request.invoice_id)

    if check_voyage is not None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invoice in this position have been created")

    invoice = InvoiceRepository.find_by_id(db, request.invoice_id)
    if invoice is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invoice Not Found")
    elif invoice.status != Status.ACCEPTED:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invoice in the waiting state")

    port = PortRepository.find_by_id(db, Port, request.port_id)
    if port is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Port Not Found")
    db_voyage = Voyage(
        port_id=port.id,
        invoice_id=invoice.id
    )

    if request.shipper_id is not None:
        user = UserRepository.find_by_id(db, User, request.shipper_id)
        db_voyage.shipper_id = user.id

    db_voyage = VoyageRepository.insert(db, db_voyage)

    return ResponseSchema.from_api_route(data=db_voyage, status_code=status.HTTP_201_CREATED)


@voyages.get('/get-by-invoice/{invoice_id}', response_model=ResponseSchema[List[VoyageSchema]])
def get_by_invoice(invoice_id: str, db=Depends(get_db)):
    db_voyage = VoyageRepository.find_by_invoice(db, invoice_id)
    return ResponseSchema.from_api_route(data=db_voyage, status_code=200)
