from flask import Flask, jsonify, Blueprint, request
from models.config import db
from models.TopicDetails import TopicDetails

auth_bp = Blueprint('topicSubtopic', __name__)

# 📌 Route 1: Add a New Subtopic
@auth_bp.route('/add_topic_subtopic', methods=['POST'])
def add_topic_subtopic():
    try:
        data = request.get_json()

        required_fields = ['topic_id', 'subtopic_name', 'description']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        new_subtopic = TopicDetails(
            topic_id=data['topic_id'],
            subtopic_name=data['subtopic_name'],
            description=data['description']
        )

        db.session.add(new_subtopic)
        db.session.commit()

        return jsonify({'message': 'Subtopic added successfully'}), 201
    # 🐱‍👤 Error Handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 📌 Route 2: Get All Subtopics
@auth_bp.route('/get_all_subtopics', methods=['GET'])
def get_all_subtopics():
    try:
        subtopics = TopicDetails.query.all()

        if not subtopics:
            return jsonify({'message': 'No subtopics found'}), 404

        subtopic_list = [subtopic.serialize() for subtopic in subtopics]

        return jsonify({'subtopics': subtopic_list}), 200
        # 🐱‍👤 Error Handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 📌 Route 3: Get a Single Subtopic by ID
@auth_bp.route('/get_subtopic/<int:id>', methods=['GET'])
def get_subtopic(id):
    try:
        subtopic = TopicDetails.query.get(id)

        if not subtopic:
            return jsonify({'error': 'Subtopic not found'}), 404

        return jsonify(subtopic.serialize()), 200
        # 🐱‍👤 Error Handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 📌 Route 4: Update a Subtopic
@auth_bp.route('/update_subtopic/<int:id>', methods=['PUT'])
def update_subtopic(id):
    try:
        subtopic = TopicDetails.query.get(id)
        if not subtopic:
            return jsonify({'error': 'Subtopic not found'}), 404

        data = request.get_json()

        if 'topic_id' in data:
            subtopic.topic_id = data['topic_id']
        if 'subtopic_name' in data:
            subtopic.subtopic_name = data['subtopic_name']
        if 'description' in data:
            subtopic.description = data['description']

        db.session.commit()

        return jsonify({'message': 'Subtopic updated successfully'}), 200
            # 🐱‍👤 Error Handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 📌 Route 5: Delete a Subtopic
@auth_bp.route('/delete_subtopic/<int:id>', methods=['DELETE'])
def delete_subtopic(id):
    try:
        subtopic = TopicDetails.query.get(id)
        # Check if subtopic exists
        if not subtopic:
            return jsonify({'error': 'Subtopic not found'}), 404
        
        # Delete the subtopic
        db.session.delete(subtopic)
        db.session.commit()

        return jsonify({'message': 'Subtopic deleted successfully'}), 200
            # 🐱‍👤 Error Handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500
