from flask import jsonify , Blueprint , request
from models.config import db
from models.course_content import CourseContent

auth_bp = Blueprint('add_content', __name__)


# 📌 Route 1: Add Course Content
@auth_bp.route('/add_content', methods=['POST'])
def add_content():
    try:
        data = request.get_json()
        print("Received Data:", data)  # Debugging line

        # Required fields validation
        required_fields = ['project_id', 'description', 'topic_name']
        if not all(field in data and data[field] for field in required_fields):
            return jsonify({'error': 'Missing or empty required fields'}), 400

        new_content = CourseContent(
            project_id=data['project_id'],
            description=data['description'],
            topic_name=data['topic_name']
        )

        db.session.add(new_content)
        db.session.commit()
        return jsonify({'message': 'Content added successfully'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# 📌 Route 2: Get All Course Content
@auth_bp.route('/add_content', methods=['GET'])
def get_all_content():
    try:
        contents = CourseContent.query.all()
        return jsonify([{
            'id': content.id,
            'project_id': content.project_id,
            'description': content.description,
            'topic_name': content.topic_name
        } for content in contents]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 📌 Route 3: Get Single Course Content by ID
@auth_bp.route('/get_content/<int:content_id>', methods=['GET'])
def get_content(content_id):
    try:
        content = CourseContent.query.get(content_id)
        if not content:
            return jsonify({'error': 'Content not found'}), 404

        return jsonify({
            'id': content.id,
            'project_id': content.project_id,
            'description': content.description,
            'topic_name': content.topic_name
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 📌 Route 4: Delete Course Content by ID
@auth_bp.route('/delete_content/<int:content_id>', methods=['DELETE'])
def delete_content(content_id):
    try:
        content = CourseContent.query.get(content_id)
        if not content:
            return jsonify({'error': 'Content not found'}), 404

        db.session.delete(content)
        db.session.commit()
        return jsonify({'message': 'Content deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500    