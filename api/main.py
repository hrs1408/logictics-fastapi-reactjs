from database.database import engine
from fastapi import FastAPI

from route.auth_route import auth
from route.user_route import users
from route.item_route import items
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="My FastAPI",
    description="Api tutorial",
    version=2
)

app.include_router(auth)
app.include_router(users)
app.include_router(items)


