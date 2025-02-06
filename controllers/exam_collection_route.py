from flask import Flask , jsonify , Blueprint , request
from models.config import db
from models.exam_collection import Exam
auth_bp = Blueprint('exam_collection', __name__)

@auth_bp.route('/exam_collection', methods=['POST'])
def add_exam_collection():
    try:
        data = request.get_json()
        exam_collection = Exam(name=data['name'], description=data['description'], total_marks=data['total_marks'], time_limit=data['time_limit'],created_at=data['created_at'],updated_at=data['updated_at'])
        db.session.add(exam_collection)
        db.session.flush()
        db.session.commit()
        return jsonify({'message': 'Exam collection added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@auth_bp.route('/exam_collection', methods=['GET'])
def get_exam_collection():
    try:
        exam_collection = Exam.query.all()
        return jsonify([collection.serialize() for collection in exam_collection]), 200
    except Exception as e:
        # Log the error
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400
