from datetime import datetime, timedelta
from typing import Union, Any
from passlib.context import CryptContext

import jwt

from models import User
from schemas.user_schemas import LoginResponse
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECURITY_ALGORITHM = 'HS256'
SECRET_KEY = '123456'


def generate_token(email: Union[str, Any]) -> str:
    expire = datetime.utcnow() + timedelta(
        seconds=60 * 60 * 24 * 3  # Expired after 3 days
    )
    to_encode = {
        "exp": expire, "email": email
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)
    return LoginResponse(token=encoded_jwt, exp=expire)


def verify_password(plain_password, hashed_password):
    print(pwd_context.verify(plain_password, hashed_password))
    return pwd_context.verify(plain_password, hashed_password)


def verify_password(db, email, password):
    user = db.query(User).filter(User.email == email).first()
    if email == user.email and pwd_context.verify(password, user.hashed_password):
        return True
    return False
