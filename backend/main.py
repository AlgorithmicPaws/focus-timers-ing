from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
from database import SessionLocal, engine
from sqlalchemy.orm import Session
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


@app.post("/users/", status_code=status.HTTP_201_CREATED, response_model=None)
def create_user(user: schemas.UserBase, db: Session = Depends(get_db)):
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "name": new_user.name, "email": new_user.email}

@app.get("/users/{user_email}", response_model=schemas.UserBase)
def read_user(user_email: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@app.post("/sessions/", status_code=status.HTTP_201_CREATED, response_model=None)
def create_focus_session(session: schemas.FocusSessionBase, db: Session = Depends(get_db)):
    nuevo_sesion = models.FocusSession(
        user_id=session.user_id,
        date=session.date or datetime.utcnow(),
        total_time=session.focus_time + session.break_time,
        focus_time=session.focus_time,
        break_time=session.break_time
    )
    
    db.add(nuevo_sesion)
    db.commit()
    db.refresh(nuevo_sesion)

    return {
        "id": nuevo_sesion.id,
        "user_id": nuevo_sesion.user_id,
        "date": nuevo_sesion.date,
        "total_time": nuevo_sesion.total_time,
        "focus_time": nuevo_sesion.focus_time,
        "break_time": nuevo_sesion.break_time,
    }

@app.get("/sessions/{session_id}", response_model= None)
def get_focus_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(models.FocusSession).filter(models.FocusSession.id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    return {
        "user_id": session.user_id,
        "date": session.date,
        "total_time": session.total_time,
        "focus_time": session.focus_time,
        "break_time": session.break_time,
    }
@app.get("/")
def read_root():
    return {"Hello": "World"}
