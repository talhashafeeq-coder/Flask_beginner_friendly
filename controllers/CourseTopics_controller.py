from flask import jsonify, Blueprint, request
from models.config import db
from models.CourseTopics import CourseTopics

auth_bp = Blueprint('topic', __name__)

# 📌 Route 1: Post Subtopic
@auth_bp.route('/add_subtopic', methods=['POST'])
def add_subtopic():
    try:
        data = request.get_json()
        # print("Received Data:", data)  # Debugging line
        # Validate required fields
        required_fields = ['course_id', 'content']
        if not all(field in data and data[field] for field in required_fields):
            return jsonify({'error': 'Missing or empty required fields'}), 400

        # Create new subtopic
        new_subtopic = CourseTopics(
            course_id=data['course_id'],
            content=data['content']
        )

        db.session.add(new_subtopic)
        db.session.commit()
        return jsonify({'message': 'Subtopic added successfully'}), 201
   #  🐱‍👤 Error handling
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
 # 📌 Route 2:GET Subtopic
@auth_bp.route('/add_subtopic', methods=['GET'])
def get_subtopics():
    try:
        subtopics = CourseTopics.query.all()
        # Check if subtopics exist
        if not subtopics:
            return jsonify({'message': 'No subtopics found'}), 404
        # Serialize subtopics
        subtopic_list = [
            {
                'id': subtopic.id,
                'course_id': subtopic.course_id,
                'content': subtopic.content
            }
            for subtopic in subtopics
        ]

        return jsonify({'subtopics': subtopic_list}), 200
#    🐱‍👤 Error handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500
