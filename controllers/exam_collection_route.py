from flask import jsonify , Blueprint , request
from models.config import db
from models.exam_collection import Exam
auth_bp = Blueprint('exam_collection', __name__)

# 📌 Route 1: Add Exam
@auth_bp.route('/exam_collection', methods=['POST'])
def add_exam_collection():
    try:
        data = request.get_json()
        # print("Received Data:", data)  # Debugging line
        # Validate required fields
        exam_collection = Exam(name=data['name'], description=data['description'], total_marks=data['total_marks'], time_limit=data['time_limit'],created_at=data['created_at'],updated_at=data['updated_at'])
        if not exam_collection:
            return jsonify({'error': 'Invalid data'}), 400
        
        db.session.add(exam_collection)
        db.session.flush()
        db.session.commit()
        return jsonify({'message': 'Exam collection added successfully'}), 201
    # 🐱‍👤 Error handling
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# 📌 Route 2: Get Exam
@auth_bp.route('/exam_collection', methods=['GET'])
def get_exam_collection():
    try:
        exam_collection = Exam.query.all()
        return jsonify([collection.serialize() for collection in exam_collection]), 200
    except Exception as e:
        # Log the error
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
