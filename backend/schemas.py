from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, time
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr  # Validates that email has a proper format
    password: str    # Consider using a more secure type or validation for passwords

    class Config:
        from_attributes = True  # Allows compatibility with ORM models like SQLAlchemy

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True

class PomodoroCounterBase(BaseModel):
    focus_interval: int
    short_break_interval: int
    long_break_interval: int
    number_pomodoros: int

    class Config:
        orm_mode = True
 
class FocusSessionBase(BaseModel):
    user_id: int  # The ID of the user associated with this session
    date: datetime = None  # Automatically defaults to now if not provided
    focus_time: int  # Focus time in seconds
    break_time: int  # Break time in seconds
    pomodoro_counter: PomodoroCounterBase

    class Config:
        from_attributes = True


class PomodoroCounterTimeFormat(BaseModel):
    focus_interval: time
    short_break_interval: time
    long_break_interval: time
    number_pomodoros: int

class FocusSessionTimeFormat(BaseModel):
    user_id: int
    date: datetime
    focus_time: time
    break_time: time
    pomodoro_counter: PomodoroCounterTimeFormat

    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    email: str
    password: str

# Jennsy aprove this code