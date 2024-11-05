from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr  # Validates that email has a proper format
    password: str    # Consider using a more secure type or validation for passwords

    class Config:
        orm_mode = True  # Allows compatibility with ORM models like SQLAlchemy


class FocusSessionBase(BaseModel):
    user_id: int  # The ID of the user associated with this session
    date: datetime = None  # Automatically defaults to now if not provided
    focus_time: int  # Focus time in seconds
    break_time: int  # Break time in seconds

    class Config:
        orm_mode = True