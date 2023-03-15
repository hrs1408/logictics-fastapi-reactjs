from typing import List

from sqlalchemy import desc, and_
from sqlalchemy.orm import Session

from models import Voyage
from repository.base_repository import BaseRepository


class VoyageRepository(BaseRepository):

    @staticmethod
    def is_exist(db: Session, port_id: int, invoice_id: str):
        # return db.query(Voyage).filter(Voyage.port_id == port_id and Voyage.invoice_id == invoice_id).first()
        return db.query(Voyage).filter(and_(Voyage.port_id == port_id, Voyage.invoice_id == invoice_id)).first()

    @staticmethod
    def find_by_invoice(db: Session, invoice_id: str):
        return db.query(Voyage).filter(Voyage.invoice_id == invoice_id).order_by(desc(Voyage.id)).all()
