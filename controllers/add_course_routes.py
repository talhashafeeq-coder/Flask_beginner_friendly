from flask import Flask , jsonify , Blueprint , request
from models.config import db
from models.add_course import AddCourse

auth_bp = Blueprint('add_language', __name__)


@auth_bp.route('/add_course', methods=['POST'])
def add_course():
    try:
        data = request.get_json()
        course = AddCourse(name=data['name'],language_name=data['language_name'], is_part=data['is_part'], status=data['status'])
        db.session.add(course)
        db.session.flush()
        db.session.commit()
        return jsonify({'message': 'Course added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@auth_bp.route('/add_course', methods=['GET'])
def get_courses():
    try:
        courses = AddCourse.query.all()
        return jsonify([course.serialize() for course in courses]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/add_course/total', methods=['GET'])    
def get_total_course():
    try:
        courses = AddCourse.query.all()
        total_course = len(courses)
        return jsonify({
            'total_course': total_course,
            'courses': [content.serialize() for content in courses]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400