from flask import Flask
from models.config import db, Config
# from controllers.json_html import auth_bp as json_html_bp
from controllers.add_course_routes import auth_bp as add_course_bp
from controllers.course_content_route import auth_bp as course_content_bp
from controllers.question_rotes import auth_bp as question_bp
from controllers.exam_collection_route import auth_bp as exam_collection_bp
# from controllers.user_collection_routes import auth_bp as user_Collection_bp
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    # Initialize the database
    db.init_app(app)

    # Register Blueprints
    # app.register_blueprint(json_html_bp, url_prefix='/json_html')
    app.register_blueprint(add_course_bp, url_prefix='/add_language')
    app.register_blueprint(course_content_bp, url_prefix='/add_content')
    app.register_blueprint(question_bp, url_prefix='/add_question')
    app.register_blueprint(exam_collection_bp, url_prefix='/exam_collection')
    # app.register_blueprint(user_Collection_bp, url_prefix='/user_flow')


    # Create database tables
    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
