from sqlalchemy.orm import Session

from models import Port
from repository.base_repository import BaseRepository


class PortRepository(BaseRepository):

    @staticmethod
    def find_by_id_port(db: Session, port_id: int) -> Port | None:
        return db.query(Port).filter(Port.id == port_id).first()

    @staticmethod
    def find_by_name(db: Session, name: str) -> Port | None:
        return db.query(Port).filter(Port.name == name).first()

    @staticmethod
    def find_by_code(db: Session, code: str) -> Port | None:
        return db.query(Port).filter(Port.code == code).first()

    @staticmethod
    def get_all_port(db: Session, skip: int, limit: int) -> list[Port]:
        return db.query(Port).offset(skip).limit(limit).all()
