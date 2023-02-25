from datetime import datetime
import pandas as pd

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from pydantic import ValidationError

SECURITY_ALGORITHM = 'HS256'
SECRET_KEY = '123456'

reusable_oauth2 = HTTPBearer(
    scheme_name='Authorization'
)


def validate_token(http_authorization_credentials=Depends(reusable_oauth2)) -> str:
    """
    Decode JWT token to get email => return email
    """
    try:
        print(http_authorization_credentials.credentials)
        payload = jwt.decode(http_authorization_credentials.credentials, SECRET_KEY, algorithms=[SECURITY_ALGORITHM])
        exp = pd.to_datetime(payload.get('exp'), unit='s')
        if exp < datetime.now():
            raise HTTPException(status_code=403, detail="Token expired")
        return payload.get('email')
    except(jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=403,
            detail=f"Could not validate credentials",
        )


