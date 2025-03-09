from models.config import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class CourseContent(db.Model):
    __tablename__ = 'CourseContent'
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('AddCourse.id'), nullable=False)
    description = Column(String(1200), nullable=False)
    topic_name = Column(String(255), nullable=False)
    
    course = relationship('AddCourse', back_populates='contents', foreign_keys=[project_id])
    
    # Realationships Subtopics
    topics = relationship('CourseTopics', back_populates='course', cascade="all, delete-orphan")
    # topics = relationship('TopicSubtopics', back_populates='course', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<CourseContent {self.content}>'

    def serialize(self):
        return {
            "id": self.id,
            "project_id": self.project_id,
            "description": self.description,
            "topic_name": self.topic_name
        }
