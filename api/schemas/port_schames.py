from pydantic import BaseModel


class PortBase(BaseModel):
    name: str
    code: str


class PortCreate(PortBase):
    pass


class Port(PortBase):
    id: int

    class Config:
        orm_mode = True
