from models.config import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class CourseTopics(db.Model):
    __tablename__ = 'CourseTopics'
    id = Column(Integer, primary_key=True)
    course_id = Column(Integer, ForeignKey('CourseContent.id'), nullable=False)
    content = Column(String(1200), nullable=False)
    
    # realationships
    course = relationship('CourseContent', back_populates='topics')
    topic_details = relationship('TopicDetails', back_populates='topic', cascade="all, delete-orphan")
    
    def serialize(self):
        return {
            "id": self.id,
            "subtopic_id": self.subtopic_id,
            "content": self.content
        }
