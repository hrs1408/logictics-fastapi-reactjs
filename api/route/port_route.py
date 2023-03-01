from fastapi import Depends, HTTPException, APIRouter, status
from fastapi_pagination import Params, paginate, Page
from sqlalchemy.orm import Session
from config import get_db
from models import Port, User, UserType

from repository.jwt_repository import JWTBearer
from repository.port_repository import PortRepository
from repository.user_repository import UserRepository
from schemas.port_schames import PortCreate, PortSchema
from schemas.schema import ResponseSchema
from ultis.securty import get_current_user

ports = APIRouter(
    tags=["Port"],
    prefix="/ports",
    dependencies=[Depends(JWTBearer())]
)


@ports.get("/", response_model=Page[PortSchema])
def get_all(params: Params = Depends(), db: Session = Depends(get_db)):
    db_ports = PortRepository.find_all(db, Port)
    return paginate(db_ports, params)


@ports.post("/")
def create_new_port(port: PortCreate, db: Session = Depends(get_db), sub: int = Depends(get_current_user)):
    user = UserRepository.find_by_id(db, User, sub)
    if user.type_user != UserType.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    port_name_exist = PortRepository.find_by_name(db, port.name)
    port_code_exist = PortRepository.find_by_code(db, port.code)

    if port_name_exist is not None:
        raise HTTPException(status_code=400, detail="Port name already exist")

    if port_code_exist is not None:
        raise HTTPException(status_code=400, detail="Port code already exist")

    port_new = Port(name=port.name, code=port.code)
    db_port = PortRepository.insert(db, port_new)
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.get("/{port_id}", response_model=ResponseSchema[PortSchema])
def get_port_by_id(port_id: int, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_id_port(db, port_id)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.get("/name/{port_name}", response_model=ResponseSchema[PortSchema])
def get_port_by_name(port_name: str, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_name(db, port_name)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.get("/code/{port_code}", response_model=ResponseSchema[PortSchema])
def get_port_by_code(port_code: str, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_code(db, port_code)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.put("/{port_id}", response_model=ResponseSchema[PortSchema])
def update_port(port_id: int, port: PortCreate, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_id_port(db, port_id)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    db_port.name = port.name if port.name is not None else db_port.name
    db_port.code = port.code if port.code is not None else db_port.code
    db_port = PortRepository.update(db, db_port)
    return ResponseSchema.from_api_route(data=db_port, status_code=status.HTTP_200_OK)


@ports.delete("/{port_id}")
def delete_port(port_id: int, db: Session = Depends(get_db)):
    db_port = PortRepository.find_by_id_port(db, port_id)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")

    PortRepository.delete(db, db_port)
    return ResponseSchema.from_api_route(status_code=status.HTTP_204_NO_CONTENT)
