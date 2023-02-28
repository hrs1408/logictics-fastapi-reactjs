from fastapi import APIRouter, Depends
from fastapi_pagination import Page, Params, paginate

from config import get_db
from models import Invoice
from repository.invoice_repository import InvoiceRepository
from repository.jwt_repository import JWTBearer
from schemas.invoice_schemas import InvoiceSchema, CreateInvoiceSchema
from schemas.schema import ResponseSchema

invoice = APIRouter(
    tags=['Invoice'],
    prefix="/invoice",
    dependencies=[Depends(JWTBearer())]
)


@invoice.get('/', response_model=Page[InvoiceSchema])
def get_all_invoice(params: Params = Depends(), db=Depends(get_db)):
    invoices = InvoiceRepository.find_all(db, Invoice)
    return paginate(invoices, params)


@invoice.post("/")
def create_invoice(request: CreateInvoiceSchema, db=Depends(get_db)):
    return request
    # data = request
    # invoice = InvoiceRepository.insert(request)
    # return ResponseSchema.from_api_route(data=request)