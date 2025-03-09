from models.config import db
from sqlalchemy import Column, Integer, String,Enum
from sqlalchemy.orm import relationship
import enum

class StatusEnum(enum.Enum):
    ACTIVE = "active"
    CLOSED = "closed"

class DifficultyEnum(enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "advanced"

class AddCourse(db.Model):
    __tablename__ = 'AddCourse'
    id = Column(Integer, primary_key=True)
    language_name = Column(String(255), nullable=False)
    topic_name = Column(String(255), nullable=False) 
    status = Column(Enum(StatusEnum), default=StatusEnum.ACTIVE, nullable=False)
    price = Column(Integer, nullable=False)
    diffculty_level = Column(Enum(DifficultyEnum), default=DifficultyEnum.BEGINNER, nullable=False) 
 

    contents = relationship('CourseContent', back_populates='course')

    def __repr__(self):
        return f'<AddCourse {self.language_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "language_name": self.language_name,
            "topic_name": self.topic_name,
            "status": self.status.value,  # Convert Enum to string
            "price": self.price,
            "diffculty_level": self.diffculty_level.value  # Convert Enum to string
        }
