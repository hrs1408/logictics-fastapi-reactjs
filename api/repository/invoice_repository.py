from sqlalchemy.orm import Session

from models import Invoice
from repository.base_repository import BaseRepository


class InvoiceRepository(BaseRepository):

    @staticmethod
    def find_by_user_id(db: Session, user_id: int):
        return db.query(Invoice).filter(Invoice.owner_id == user_id).all()
