from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.database.connection import get_db
from app.database.models import Admin

TOKEN_URL = "/api/auth/login"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=TOKEN_URL)


def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> Admin:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(token)
        admin_id = payload.get("sub")
        if not admin_id:
            raise credentials_exception
    except ValueError as exc:
        raise credentials_exception from exc

    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin or not admin.is_active:
        raise credentials_exception
    return admin


def require_superadmin(admin: Admin = Depends(get_current_admin)) -> Admin:
    if admin.role.value != "superadmin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Superadmin required",
        )
    return admin
