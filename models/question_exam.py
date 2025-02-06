from models.config import db
from sqlalchemy import Column, Integer, String , Text, ForeignKey
from sqlalchemy.orm import relationship

class Question(db.Model):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    exam_name = Column(String(255), ForeignKey('exam.name'), nullable=False)
    question_text = Column(Text, nullable=False)
    option_a = Column(String(255), nullable=False)
    option_b = Column(String(255), nullable=False)
    option_c = Column(String(255), nullable=False)
    option_d = Column(String(255), nullable=False)
    correct_option = Column(String(255), nullable=False)  # 'A', 'B', 'C', 'D'
    marks = Column(Integer, nullable=True, default=0)

    exam = relationship('Exam', back_populates='questions')

    def __repr__(self):
        return f'<Question {self.question_text}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "exam_name": self.exam_name if self.exam else None,
            "question_text": self.question_text,
            "option_a": self.option_a,
            "option_b": self.option_b,
            "option_c": self.option_c,
            "option_d": self.option_d,
            "correct_option": self.correct_option,
            "marks": self.marks
        }