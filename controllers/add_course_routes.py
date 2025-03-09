from flask import  jsonify, Blueprint, request
from models.config import db
from models.add_course import AddCourse, StatusEnum, DifficultyEnum

auth_bp = Blueprint('add_language', __name__)

# 📌 Route 1: Add a new course
@auth_bp.route('/add_course', methods=['POST'])
def add_course():
    try:
        data = request.get_json()
        # print("Received Data:", data)  # Debugging line

        # Required fields validation
        required_fields = ['language_name', 'topic_name', 'status', 'price', 'diffculty_level']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        # Extra check to avoid NULL values
        if not data['topic_name']:  
            return jsonify({'error': 'Topic name cannot be empty'}), 400
        
        # convert status to integer
        data['status'] = StatusEnum[data['status'].upper()]
        data['diffculty_level'] = DifficultyEnum[data['diffculty_level'].upper()]

        # Create new course with validated data and commit
        new_course = AddCourse(
            language_name=data['language_name'], 
            topic_name=data['topic_name'], 
            status=data['status'], 
            price=data['price'], 
            diffculty_level=data['diffculty_level']
        )

        db.session.add(new_course)
        db.session.commit()
        return jsonify({'message': 'Course added successfully'}), 201
    # 🐱‍👤 Error handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 📌 Route 2: Get all courses 
@auth_bp.route('/get_courses', methods=['GET'])
def get_courses():
    try:
        courses = AddCourse.query.all()
        course_list = []  
        # print("Received Data:", data)  # Debugging line
        
        # Required fields validation
        for course in courses:
            course_data = {
                'id': course.id,
                'language_name': course.language_name,
                'topic_name': course.topic_name,
                'status': course.status.name.capitalize() if isinstance(course.status, StatusEnum) else course.status,
                'price': course.price,
                'diffculty_level': course.diffculty_level.name.capitalize() if isinstance(course.diffculty_level, DifficultyEnum) else course.diffculty_level
            }
            course_list.append(course_data)
        return jsonify({'courses': course_list}), 200
    # 🐱‍👤 Error handling
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500
# 📌 Route 3: Delete a course
@auth_bp.route('/delete_course/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    try:
        course = AddCourse.query.get(course_id)
        if not course:
            return jsonify({'error': 'Course not found'}), 404

        db.session.delete(course)
        db.session.commit()
        return jsonify({'message': 'Course deleted successfully'}), 200
    # 🐱‍👤 Error handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    