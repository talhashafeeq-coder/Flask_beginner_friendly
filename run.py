# app.py
from flask import Flask
# from models.db import db, Config
# from controllers.Routes import auth_bp
from controllers.json_html import auth_bp

from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    # app.config.from_object(Config)
    CORS(app)
    # Initialize the database
    # db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # Additional setup (e.g., session management)
    # with app.app_context():
        # db.create_all()  # Create tables if they don't exist

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
    app.run(debug=True)

    
