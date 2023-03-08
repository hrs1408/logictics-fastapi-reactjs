from pydantic import BaseModel


class PortBase(BaseModel):
    name: str
    code: str


class PortCreate(PortBase):
    pass


class PortSchema(PortBase):
    id: int
    created_at: str

    class Config:
        orm_mode = True
