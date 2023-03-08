from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Table
from sqlalchemy.orm import relationship, Mapper

from database.database import Base

from enum import Enum


class ShippingType(str, Enum):
    CPN = "CPN",


class KindOfGoods(str, Enum):
    DOCUMENT = "DOCUMENT",
    GOODS = "GOODS",
    COLD_GOODS = "COLD_GOODS",
    BIOLOGICAL_PRODUCT = "BIOLOGICAL_PRODUCT",


class Payments(str, Enum):
    PAYMENT_SENDER = "PAYMENT_SENDER",
    PAYMENT_RECEIVER = "PAYMENT_RECEIVER",


class TransportEquipment(str, Enum):
    MOTORBIKE = "MOTORBIKE",
    CAR = "CAR"


class Status(str, Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REFUSE = "REFUSE"


class UserType(str, Enum):
    ADMIN = "ADMIN",
    STAFF = "STAFF",
    USER = "USER"


class Port(Base):
    __tablename__ = "ports"
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    code = Column(String(255))
    voyages = relationship("Voyage", back_populates="port")


class Voyage(Base):
    __tablename__ = "voyages"
    id = Column(Integer, primary_key=True)

    port_id = Column(Integer, ForeignKey("ports.id"))
    port = relationship("Port", back_populates="voyages")

    invoice_id = Column(Integer, ForeignKey("invoices.id"))
    invoice = relationship("Invoice", back_populates="voyages")

    # Người ship
    shipper_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    shipper = relationship("User", back_populates="shippers")


class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", backref="invoices")

    voyages = relationship("Voyage", back_populates="invoice")

    sender_full_name = Column(String(255), nullable=True)
    sender_phone = Column(String(255), nullable=True)
    sender_address = Column(String(255), nullable=True)
    sender_province = Column(String(255), nullable=True)
    sender_district = Column(String(255), nullable=True)
    sender_ward = Column(String(255), nullable=True)

    receiver_full_name = Column(String(255), nullable=True)
    receiver_phone = Column(String(255), nullable=True)
    receiver_address = Column(String(255), nullable=True)
    receiver_province = Column(String(255), nullable=True)
    receiver_district = Column(String(255), nullable=True)
    receiver_ward = Column(String(255), nullable=True)

    shipping_type = Column(String(255), default=ShippingType.CPN)
    # Khối lượng
    weight = Column(Integer, nullable=True)
    # Số kiện hàng
    quantity = Column(Integer, nullable=True)
    # Giá trị đơn hàng
    price = Column(Integer, nullable=True)
    # Trọng lượng quy đổi (DxRxC)
    length = Column(Integer, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)

    # Tiền thu hộ
    cod = Column(Integer, nullable=True)
    # Loại hàng hoá
    kind_of_goods = Column(String(255), default=KindOfGoods.DOCUMENT, nullable=True)
    # Nội dung hàng hoá
    goods_content = Column(String(255), nullable=True)
    # Phí đóng gói
    expense_cover = Column(Integer, nullable=True)
    # Phí kiểm đếm
    expense_count = Column(Integer, nullable=True)

    # Hình thức thanh toán
    payments = Column(String(255), default=Payments.PAYMENT_SENDER, nullable=True)
    # Cho xem hàng hay không
    is_show_goods = Column(Boolean, default=True, nullable=True)
    # Thiết bị vận tải
    transport_equipment = Column(String(255), default=TransportEquipment.MOTORBIKE, nullable=True)
    # Yêu cầu khác
    requirement_other = Column(String(255), nullable=True)
    status = Column(String(255), nullable=True, default=Status.PENDING)


class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    hashed_password = Column(String(255))
    type_user = Column(String(255), default=UserType.USER, nullable=True)
    is_active = Column(Boolean, default=True, nullable=True)
    refresh_token_sub = Column(String(255), nullable=True)

    user_information = relationship("UserInformation", back_populates="user", uselist=False)
    user_internal_information = relationship("UserInternalInformation", back_populates="user", uselist=False)
    shippers = relationship("Voyage", back_populates="shipper")


class UserInformation(Base):
    __tablename__ = "user_information"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(255), default=None, nullable=True)
    phone_number = Column(String(255), default=None, nullable=True)
    date_of_birth = Column(String(255), default=None, nullable=True)
    address = Column(String(255), default=None, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="user_information")


class UserInternalInformation(Base):
    __tablename__ = "user_internal_information"

    id = Column(Integer, primary_key=True, index=True)
    work_address = Column(String(255), nullable=True)
    position = Column(String(255), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="user_internal_information")


class UserDeliveryAddress(Base):
    __tablename__ = "user_delivery_address"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    address = Column(String(255), nullable=True)
    province = Column(String(255), nullable=True)
    district = Column(String(255), nullable=True)
    ward = Column(String(255), nullable=True)

    user = relationship("User", back_populates="user_delivery_address")
