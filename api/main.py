from fastapi_responseschema import wrap_app_responses
from passlib.context import CryptContext
from sqlalchemy.orm import sessionmaker
from starlette.middleware.cors import CORSMiddleware

from database.database import engine
from fastapi import FastAPI
from route.auth_route import auth
from route.invoice_route import invoice
from route.port_route import ports
from route.user_delivery_address_route import deliAddress
from route.user_route import users
import models
from route.voyage_route import voyages
from schemas.schema import Route

models.Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(
    title="NEXTGEN LOGISTICS",
    description="Logistics API",
    version=2,
)
wrap_app_responses(app, Route)


@app.on_event("startup")
def start_up_event():
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.email == "admin@gmail.com").first()
    if not user:
        admin = models.User(email="admin@gmail.com", hashed_password=pwd_context.hash("Admin@123"),
                            type_user=models.UserType.ADMIN)
        db.add(admin)
        db.commit()
        db.refresh(admin)


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:3000",
    "http://localhost:3001",
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
app.include_router(prefix="/api", router=invoice)
app.include_router(prefix="/api", router=ports)
app.include_router(prefix="/api", router=voyages)
app.include_router(prefix="/api", router=deliAddress)
