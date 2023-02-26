from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from database.database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(String(255), index=True)
    # owner_id = Column(Integer, ForeignKey("users.id"))

    # owner = relationship("User", back_populates="items")


class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    hashed_password = Column(String(255))
    type_user = Column(String(255), default=None, nullable=True)
    is_active = Column(Boolean, default=True, nullable=True)
    refresh_token_sub = Column(String(255), nullable=True)

    # items = relationship("Item", back_populates="owner")
    user_information = relationship("UserInformation", back_populates="user", uselist=False)
    user_internal_information = relationship("UserInternalInformation", back_populates="user")


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
