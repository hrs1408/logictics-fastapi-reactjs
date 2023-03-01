from fastapi import Depends, HTTPException, APIRouter, status
from sqlalchemy.orm import Session
from config import get_db
from models import Port

from repository.jwt_repository import JWTBearer
from repository.port_repository import PortRepository
from schemas.port_schames import PortCreate
from schemas.schema import ResponseSchema

ports = APIRouter(
    tags=["Port"],
    dependencies=[Depends(JWTBearer())]
)


@ports.get("/ports")
def get_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    list_port = PortRepository.get_all_port(db, skip=skip, limit=limit)
    return ResponseSchema.from_api_route(data=list_port, status_code=status.HTTP_200_OK)


@ports.post("/ports")
def create_new_port(port: PortCreate, db: Session = Depends(get_db)):
    port_exit = PortRepository.find_by_name(db, port.name)
    if port_exit is not None:
        raise HTTPException(status_code=400, detail="Port already exist")
    else:
        port_new = Port(name=port.name, code=port.code)
        db_port = PortRepository.insert(db, port_new)
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.get("/ports/{port_id}")
def get_port_by_id(port_id: int, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_id_port(db, port_id)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.get("/ports/name/{port_name}")
def get_port_by_name(port_name: str, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_name(db, port_name)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.get("/ports/code/{port_code}")
def get_port_by_code(port_code: str, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_code(db, port_code)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.put("/ports/{port_id}")
def update_port(port_id: int, port: PortCreate, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_id_port(db, port_id)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    db_port.name = port.name if port.name is not None else db_port.name
    db_port.code = port.code if port.code is not None else db_port.code
    db_port = PortRepository.update(db, db_port)
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.delete("/ports/{port_id}")
def delete_port(port_id: int, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_id_port(db, port_id)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    db_port = PortRepository.delete(db, db_port)
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)
