from sqlalchemy import Column, Integer, String,  DateTime, ForeignKey, Time
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(50), nullable=False, index=True)
    email = Column(String(50),  nullable=False, unique=True, index=True)
    password = Column(String(50), nullable=False) 

    focus_sessions = relationship("FocusSession", back_populates="user", cascade="all, delete-orphan")

class FocusSession(Base):
    __tablename__ = "Focus_sessions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    total_time = Column(Time, nullable=False)  # Stores duration as hours, minutes, seconds
    focus_time = Column(Time, nullable=False)
    break_time = Column(Time, nullable=False)

    user = relationship("User", back_populates="focus_sessions")
