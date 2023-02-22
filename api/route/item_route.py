from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from schemas.item_schemas import ItemCreate, Item
from controller.item_controller import create_user_item, get_items
from ultis.securty import validate_token

items = APIRouter(
    tags=["Item"]
)

def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@items.post("/users/{user_id}/items/", response_model=Item, dependencies=[Depends(validate_token)])
def create_item_for_user(user_id: int, item: ItemCreate, db: Session = Depends(get_db)):
    return create_user_item(db=db, item=item, user_id=user_id)


@items.get("/items/", response_model=list[Item], dependencies=[Depends(validate_token)])
def get_all_item(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    listuser = get_items(db, skip=skip, limit=limit)
    return listuser