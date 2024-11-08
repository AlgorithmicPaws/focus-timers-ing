from fastapi import FastAPI, HTTPException, Depends, status, Query
from typing import Annotated
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import List, Optional
from datetime import datetime, timedelta
import models
import schemas

app = FastAPI()
app.title = "Focus Timers API"
app.description = "API for Focus Timers App, a productivity tool for students and professionals."

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.post("/users/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(user: schemas.UserBase, db: Session = Depends(get_db)):
    # Check if user with the given email already exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Hash the password before storing
    hashed_password = pwd_context.hash(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password  # Save the hashed password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user  # Response model should exclude the hashed password

@app.put("/users/{user_email}/password", response_model=schemas.UserResponse)
def update_password(user_email: str, new_password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    hashed_password = pwd_context.hash(new_password)
    user.password = hashed_password

    db.commit()
    db.refresh(user)
    return user

@app.get("/users/{user_email}", response_model=schemas.UserBase)
def read_user(user_email: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user 


@app.delete("/users/{user_email}", response_model=schemas.UserResponse)
def delete_user(user_email: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(user)
    db.commit()
    return user


@app.post("/login", response_model=bool)
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if user and pwd_context.verify(password, user.password):
        return True
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

@app.post("/sessions/", status_code=status.HTTP_201_CREATED, response_model=None)
def create_focus_session(session: schemas.FocusSessionBase, db: Session = Depends(get_db)):
    total_time = timedelta(minutes=session.focus_time+session.break_time)
    focus_time = timedelta(minutes=session.focus_time)
    break_time = timedelta(minutes=session.break_time)
    
    # Create the FocusSession instance with time values
    new_session = models.FocusSession(
        user_id=session.user_id,
        date=session.date or datetime.utcnow(),
        total_time=total_time,
        focus_time=focus_time,
        break_time=break_time,
    )

    # Convert pomodoro interval seconds into TIME format
    focus_interval = timedelta(minutes=session.pomodoro_counter.focus_interval)
    short_break_interval = timedelta(minutes=session.pomodoro_counter.short_break_interval)
    long_break_interval = timedelta(minutes=session.pomodoro_counter.long_break_interval)

    # Create the PomodoroCounter instance with converted time values
    pomodoro_counter = models.PomodoroCounter(
        focus_interval=focus_interval,
        short_break_interval=short_break_interval,
        long_break_interval=long_break_interval,
        number_pomodoros=session.pomodoro_counter.number_pomodoros,
        session=new_session,  # Associate it with the FocusSession
    )

    # Add both to the session and commit
    db.add(new_session)
    db.add(pomodoro_counter)
    db.commit()
    db.refresh(new_session)

    return new_session


@app.get("/sessions/", response_model=List[schemas.FocusSessionTimeFormat])
def get_focus_sessions(
    user_id: int,
    interval: Optional[str] = Query(
        None, 
        regex="^(week|month|3 months|6 months|year)$", 
        description="Filter sessions by past interval: week, month, 3 months, 6 months, year"
    ),
    db: Session = Depends(get_db)
):
    current_date = datetime.now()

    if interval == "week":
        start_date = current_date - timedelta(weeks=1)
    elif interval == "month":
        start_date = current_date - timedelta(days=30)
    elif interval == "3 months":
        start_date = current_date - timedelta(days=90)
    elif interval == "6 months":
        start_date = current_date - timedelta(days=180)
    elif interval == "year":
        start_date = current_date - timedelta(days=365)
    else:
        start_date = None

    query = db.query(models.FocusSession).filter(models.FocusSession.user_id == user_id)
    
    if start_date:
        query = query.filter(models.FocusSession.date >= start_date)
    
    sessions = query.all()
    
    if not sessions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sessions found for the specified user and interval")

    return sessions

@app.delete("/sessions/{session_id}", response_model=schemas.FocusSessionTimeFormat)
def delete_focus_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(models.FocusSession).filter(models.FocusSession.id == session_id).first()
    if session is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    db.delete(session)
    db.commit()
    return session

@app.get("/")
def read_root():
    return {"Hello": "World"}
