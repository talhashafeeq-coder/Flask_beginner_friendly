from models.config import db
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime


class Exam(db.Model):
    __tablename__ = 'exam'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False , unique=True)
    description = Column(String(255), nullable=False)
    total_marks = Column(Integer, nullable=False)
    time_limit = Column(Integer, nullable=False, default=30)
    created_at = Column(db.DateTime, default=datetime.utcnow)
    updated_at = Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    questions = relationship('Question', back_populates='exam')

    def __repr__(self):
        return f'<Exam {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "total_marks": self.total_marks,
            "time_limit": self.time_limit,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

