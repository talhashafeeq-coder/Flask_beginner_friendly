from flask import Flask , jsonify , Blueprint , request
from models.config import db
from models.course_content import CourseContent

auth_bp = Blueprint('add_content', __name__)


@auth_bp.route('/course_content', methods=['POST'])
def add_course_content():
    try:
        data = request.get_json()
        course_content = CourseContent(content=data['content'], status=data['status'], project_id=data['project_id'])
        db.session.add(course_content)
        db.session.flush()
        db.session.commit()
        return jsonify({'message': 'Course content added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/course_content', methods=['GET'])    
def get_course_content():
    try:
        course_content = CourseContent.query.all()
        return jsonify([content.serialize() for content in course_content]), 200
    
    except Exception as e:
        # Log the error
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400


    