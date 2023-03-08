from typing import Optional, List

from pydantic import BaseModel, root_validator

from models import ShippingType, TransportEquipment, Payments, KindOfGoods, Status
from schemas.user_schemas import UserSchemas


class CreateInvoiceSchema(BaseModel):
    sender_full_name: str
    sender_phone: str
    sender_address: str
    sender_province: str
    sender_district: str
    sender_ward: str

    receiver_full_name: str
    receiver_phone: str
    receiver_address: str
    receiver_province: str
    receiver_district: str
    receiver_ward: str

    shipping_type: ShippingType
    # Khối lượng
    weight: int
    # Số kiện hàng
    quantity: int
    # Giá trị đơn hàng
    price: int
    # Trọng lượng quy đổi (DxRxC)
    length: int
    width: int
    height: int
    # Tiền thu hộ
    cod: int
    # Loại hàng hoá
    kind_of_goods: KindOfGoods
    # Nội dung hàng hoá
    goods_content: Optional[str]
    # Phí đóng gói
    expense_cover: int
    # Phí kiểm đếm
    expense_count: int
    # Hình thức thanh toán
    payments: Payments
    # Cho xem hàng hay không
    is_show_goods: bool
    # Thiết bị vận tải
    transport_equipment: TransportEquipment
    # Yêu cầu khác
    requirement_other: Optional[str]

    @root_validator()
    def validation(cls, values):
        if values.get('weight') > 50000:
            raise ValueError("Maximum cargo weight 50,000 kg")
        return values


class InvoiceChangeStatusSchema(BaseModel):
    status: Status


class InvoiceSchema(BaseModel):
    id: str

    owner_id: str
    owner: UserSchemas
    # voyages :relationship("Voyage", back_populates="invoice")
    sender_full_name: Optional[str]
    sender_phone: Optional[str]
    sender_address: Optional[str]
    sender_province: Optional[str]
    sender_district: Optional[str]
    sender_ward: Optional[str]

    receiver_full_name: Optional[str]
    receiver_phone: Optional[str]
    receiver_address: Optional[str]
    receiver_province: Optional[str]
    receiver_district: Optional[str]
    receiver_ward: Optional[str]

    shipping_type: ShippingType
    # Khối lượng
    weight: Optional[str]
    # Số kiện hàng
    quantity: Optional[str]
    # Giá trị đơn hàng
    price: Optional[str]
    # Trọng lượng quy đổi (DxRxC)
    length: Optional[str]
    width: Optional[str]
    height: Optional[str]
    # Tiền thu hộ
    cod: Optional[str]
    # Loại hàng hoá
    kind_of_goods: Optional[str]
    # Nội dung hàng hoá
    goods_content: Optional[str]
    # Phí đóng gói
    expense_cover: Optional[str]
    # Phí kiểm đếm
    expense_count: Optional[str]
    # Hình thức thanh toán
    payments: Optional[str]
    # Cho xem hàng hay không
    is_show_goods: Optional[str]
    # Thiết bị vận tải
    transport_equipment: Optional[str]
    # Yêu cầu khác
    requirement_other: Optional[str]
    status: Status
    created_at: str

    class Config:
        orm_mode = True


class ChangeStatusObjectSchema(BaseModel):
    invoice_id: int
    status: Status


class ChangeStatusSchema(BaseModel):
    invoices: List[ChangeStatusObjectSchema]
