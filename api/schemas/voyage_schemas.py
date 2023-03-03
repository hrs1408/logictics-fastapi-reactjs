from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, root_validator, validator, constr

from schemas.invoice_schemas import InvoiceSchema
from schemas.port_schames import PortSchema
from schemas.user_schemas import UserSchemas


class VoyageCreateSchema(BaseModel):
    port_id: int
    invoice_id: int
    shipper_id: Optional[int]


class VoyageSchema(BaseModel):
    id: int
    port_id: int
    port: PortSchema
    invoice_id: int
    invoice: InvoiceSchema
    shipper_id: Optional[int]
    shipper: Optional[UserSchemas]

    class Config:
        orm_mode = True
