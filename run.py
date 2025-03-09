from flask import Flask
from models.config import db, Config
from controllers.add_course_routes import auth_bp as add_course_bp
from controllers.course_content_route import auth_bp as course_content_bp
from controllers.question_rotes import auth_bp as question_bp
from controllers.exam_collection_route import auth_bp as exam_collection_bp
from controllers.TopicDetails_controller import auth_bp as topicSubtopic_bp
from controllers.CourseTopics_controller import auth_bp as topic_bp
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    # Initialize the database
    db.init_app(app)
    migrate = Migrate(app, db)

    # Register Blueprints
    app.register_blueprint(add_course_bp, url_prefix='/add_language')
    app.register_blueprint(course_content_bp, url_prefix='/add_content')
    app.register_blueprint(question_bp, url_prefix='/add_question')
    app.register_blueprint(exam_collection_bp, url_prefix='/exam_collection')
    app.register_blueprint(topicSubtopic_bp, url_prefix='/subtopic')
    app.register_blueprint(topic_bp, url_prefix='/topic_subtopic')


    # Create database tables
    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
