from models.config import db
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class AddCourse(db.Model):
    __tablename__ = 'AddCourse'
    id = Column(Integer, primary_key=True)
    language_name = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False, unique=True) 
    is_part = Column(Integer, nullable=False)
    status = Column(Integer, nullable=False)

   
    contents = relationship('CourseContent', back_populates='course')

    def __repr__(self):
        return f'<AddCourse {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "language_name": self.language_name,
            "name": self.name,
            "is_part": self.is_part,
            "status": self.status,
        }
