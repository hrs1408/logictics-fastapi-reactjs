from sqlalchemy.orm import Session

from models import User
from repository.base_repository import BaseRepository


class UserRepository(BaseRepository):
    @staticmethod
    def find_by_email(db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def find_refresh_token_sub(db: Session, sub: str) -> User | None:
        return db.query(User).filter(User.refresh_token_sub == sub).first()
class UserInfoRepository(BaseRepository):
    pass
