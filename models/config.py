import os
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta

db = SQLAlchemy()


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "SQLALCHEMY_DATABASE_URI",
        "mysql://root@localhost:3306/test1"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False  

    SCRECT_KEY = os.environ.get("SCRECT_KEY", "your_strong_secret_key")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "your_jwt_secret_key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_TOKEN_LOCATION = ['headers']
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    


    



