from models.config import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class TopicDetails(db.Model):
    __tablename__ = 'TopicDetails'
    id = Column(db.Integer, primary_key=True)
    topic_id = Column(Integer, ForeignKey('CourseTopics.id'), nullable=False)
    subtopic_name = Column(db.String(255), nullable=False)
    description = Column(db.String(1200), nullable=False)
    
    # realtionship
    topic = relationship('CourseTopics', back_populates='topic_details')
    
    def serialize(self):
        return {
            "id": self.id,
            "topic_id": self.topic_id,
            "subtopic_name": self.subtopic_name,
            "description": self.description
        }