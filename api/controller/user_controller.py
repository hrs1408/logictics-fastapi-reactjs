from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models import User, UserInformation
from schemas.user_schemas import UserCreate, UserInformationCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_information(db: Session, user_info: UserInformationCreate, user_id: int):
    db_user_information_exit = db.query(UserInformation).filter(UserInformation.user_id == user_id).first()
    if db_user_information_exit is None:
        db_user_information = UserInformationCreate(**user_info.dict(), user_id=user_id)
        db.add(db_user_information)
        db.commit()
        db.refresh(db_user_information)
        return db_user_information
    else:
        db_user_information_exit.fullname = user_info.fullname
        db_user_information_exit.phone_number = user_info.phone_number
        db_user_information_exit.date_of_birth = user_info.date_of_birth
        db_user_information_exit.address = user_info.address
        db.commit()
        db.refresh(db_user_information_exit)
        return db_user_information_exit

