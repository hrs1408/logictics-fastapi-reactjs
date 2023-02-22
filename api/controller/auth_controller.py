from datetime import datetime, timedelta
from typing import Union, Any

import jwt
from fastapi import Depends

from database.database import SessionLocal
from models import User
from schemas.user_schemas import LoginResponse

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


def verify_password(db, email, password):
    user = db.query(User).filter(User.email == email).first()
    if email == user.email and (password+'notreallyhashed') == user.hashed_password:
        return True
    return False
