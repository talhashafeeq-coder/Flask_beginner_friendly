from models.config import db
from sqlalchemy import Column, Integer, String , ForeignKey
from sqlalchemy.orm import relationship
import datetime

class Userdata(db.Model):
    __tablename__ = 'userdata'  
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(255), unique=False, nullable=False)
    jwt_tokens = relationship('Jwt_token', back_populates='user')


    def __repr__(self):
        return '<User %r>' % self.email
    
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password
        }


class Jwt_token(db.Model):
    __tablename__ = 'jwt_token'
    id = Column(Integer, primary_key=True)
    token = Column(String(255), unique=True, nullable=False)
    issued_at = Column(db.DateTime, default=datetime.datetime.utcnow)
    expires_at = Column(db.DateTime, nullable=False)
    user_id = Column(Integer, ForeignKey('userdata.id'), nullable=False)
    user = relationship('Userdata', back_populates='jwt_tokens')

    def __repr__(self):
        return '<Jwt_token %r>' % self.token
    