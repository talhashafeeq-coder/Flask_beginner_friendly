from models.config import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class CourseContent(db.Model):
    __tablename__ = 'CourseContent'
    id = db.Column(Integer, primary_key=True)
    project_id = Column(String(255), ForeignKey('AddCourse.name'), nullable=False)
    content = Column(String(255), nullable=False)
    status = Column(Integer, nullable=False)
    
    course = relationship('AddCourse', back_populates='contents', foreign_keys=[project_id])

    def __repr__(self):
        return f'<CourseContent {self.content}>'

    def serialize(self):
        return {
            "id": self.id,
            "course_name": self.project_id,  # Directly store name in the foreign key
            "content": self.content,
            "status": self.status
        }
