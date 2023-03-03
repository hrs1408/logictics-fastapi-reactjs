from sqlalchemy.orm import Session
from models import User, UserInternalInformation, UserInformation
from repository.base_repository import BaseRepository


class UserRepository(BaseRepository):
    @staticmethod
    def find_by_email(db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def find_refresh_token_sub(db: Session, sub: str) -> User | None:
        return db.query(User).filter(User.refresh_token_sub == sub).first()


class UserInfoRepository(BaseRepository):

    @staticmethod
    def find_by_id(db: Session, user_id: int) -> User | None:
        return db.query(User).filter(User.id == user_id).first()


class UserInfoRepository(BaseRepository):

    @staticmethod
    def find_by_user_id(db: Session, user_id: int) -> User | None:
        return db.query(UserInformation).filter(UserInformation.user_id == user_id).first()


class UserInternalInformationRepository(BaseRepository):

    @staticmethod
    def find_by_user_id(db: Session, user_id: int) -> UserInternalInformation | None:
        return db.query(UserInternalInformation).filter(UserInternalInformation.user_id == user_id).first()
