from fastapi_responseschema import wrap_app_responses
from starlette.middleware.cors import CORSMiddleware

from database.database import engine
from fastapi import FastAPI
from route.auth_route import auth
from route.port_route import ports
from route.user_route import users
import models
from schemas.schema import Route

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NEXTGEN LOGISTICS",
    description="Logistics API",
    version=2,
)
wrap_app_responses(app, Route)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prefix="/api", router=auth)
app.include_router(prefix="/api", router=users)
app.include_router(prefix="/api", router=ports)
