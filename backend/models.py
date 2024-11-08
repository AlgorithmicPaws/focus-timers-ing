from sqlalchemy import Column, Integer, String,  DateTime, ForeignKey, Time
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(50), nullable=False, index=True)
    email = Column(String(50),  nullable=False, unique=True, index=True)
    password = Column(String(100), nullable=False) 

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
    # Define the one-to-one relationship with PomodoroCounter
    pomodoro_counter = relationship("PomodoroCounter", back_populates="session", uselist=False, cascade="all, delete-orphan")

class PomodoroCounter(Base):
    __tablename__ = "Pomodoro_counters"

    id = Column(Integer, primary_key=True, autoincrement=True)
    focus_interval = Column(Time, nullable=False)  # Interval length for focus sessions, in seconds
    short_break_interval = Column(Time, nullable=False)  # Short break interval length, in seconds
    long_break_interval = Column(Time, nullable=False)  # Long break interval length, in seconds
    number_pomodoros = Column(Integer, nullable=False)  # Number of pomodoros completed in the session

    # Define the one-to-one relationship with FocusSession
    session_id = Column(Integer, ForeignKey("Focus_sessions.id"), unique=True)
    session = relationship("FocusSession", back_populates="pomodoro_counter")