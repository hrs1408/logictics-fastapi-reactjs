from fastapi import APIRouter, Depends, status, HTTPException
from fastapi_pagination import Page, Params, paginate
from config import get_db
from models import Invoice
from repository.invoice_repository import InvoiceRepository
from repository.jwt_repository import JWTBearer
from schemas.invoice_schemas import InvoiceSchema, CreateInvoiceSchema
from schemas.schema import ResponseSchema
from ultis.securty import get_current_user

invoice = APIRouter(
    tags=['Invoice'],
    prefix="/invoice",
    dependencies=[Depends(JWTBearer())]
)


@invoice.get('/', response_model=Page[InvoiceSchema])
def get_all_invoice(params: Params = Depends(), db=Depends(get_db)):
    invoices = InvoiceRepository.find_all(db, Invoice)
    return paginate(invoices, params)

@invoice.get('/get-by-user', response_model=Page[InvoiceSchema])
def get_by_user(params: Params = Depends(), db=Depends(get_db), sub: int = Depends(get_current_user)):
    invoices = InvoiceRepository.find_by_user_id(db, sub)
    return paginate(invoices, params)


@invoice.post("/", response_model=ResponseSchema[InvoiceSchema])
def create_invoice(request: CreateInvoiceSchema, db=Depends(get_db), sub: int = Depends(get_current_user)):
    db_invoice = Invoice(**request.dict(), owner_id=sub)
    db_invoice = InvoiceRepository.insert(db, db_invoice)
    return ResponseSchema.from_api_route(data=db_invoice, status_code=status.HTTP_200_OK)


@invoice.get('/{invoice_id}', response_model=ResponseSchema[InvoiceSchema])
def find_by_id(invoice_id: int, db=Depends(get_db)):
    db_invoice = InvoiceRepository.find_by_id(db, Invoice, invoice_id)
    if db_invoice is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invoice not found")

    return ResponseSchema.from_api_route(data=db_invoice, status_code=status.HTTP_200_OK)


@invoice.delete('/{invoice_id}', response_model=ResponseSchema)
def delete_by_id(invoice_id: int, db=Depends(get_db), sub: int = Depends(get_current_user)):
    db_invoice = InvoiceRepository.find_by_id(db, Invoice, invoice_id)

    if db_invoice is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invoice not found")

    if db_invoice.owner_id != sub:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    InvoiceRepository.delete(db, db_invoice)

    return ResponseSchema.from_api_route(status_code=status.HTTP_204_NO_CONTENT, data=None)
