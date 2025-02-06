from flask import Flask , jsonify , Blueprint , request
from models.config import db
from models.question_exam import Question
from models.exam_collection import Exam

auth_bp = Blueprint('add_question', __name__)

@auth_bp.route('/question', methods=['POST'])
def add_question():
    try:
        data = request.get_json()
        exam_name = data.get('exam_name')

        if not exam_name:
            return {"error": "exam_name is required"}, 400

        # Check if the exam_id exists in the exam table
        existing_exam = Exam.query.filter_by(name=exam_name).first()
        if not existing_exam:
            return {"error": f"Exam with id {exam_name} does not exist"}, 400

        new_question = Question(
            exam_name=exam_name,
            question_text=data['question_text'],
            option_a=data['option_a'],
            option_b=data['option_b'],
            option_c=data['option_c'],
            option_d=data['option_d'],
            correct_option=data['correct_option'],
            marks=data.get('marks', 0)  # Provide default value if not included
        )
        db.session.add(new_question)
        db.session.commit()
        return jsonify({'message': 'Question added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400@auth_bp.route('/question', methods=['GET'])
@auth_bp.route('/question', methods=['GET'])
def get_question():
    try:
        question = Question.query.all()
        return jsonify([question.serialize() for question in question]), 200
    except Exception as e:
        # Log the error
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/verify_question', methods=['POST'])
def verify_question():
    try:
        data = request.get_json()
        question_id = data.get('question_id')
        selected_option = data.get('selected_option')  # Get the selected option from the request

        if not question_id or not selected_option:
            return {"error": "Both question_id and selected_option are required"}, 400

        # Check if the question_id exists in the question table
        existing_question = Question.query.filter_by(id=question_id).first()
        if not existing_question:
            return {"error": f"Question with id {question_id} does not exist"}, 400

        # Fetch the correct option from the question
        correct_option = existing_question.correct_option  # Assuming 'correct_option' is stored in the DB

        # Check if the selected option matches the correct option
        is_correct = selected_option == correct_option

        return jsonify({
            'is_correct': is_correct,
            'correct_option': correct_option
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/verify_question', methods=['GET'])
def get_verify_question():
    try:
        question = Question.query.all()
        return jsonify([question.serialize() for question in question]), 200
    except Exception as e:
        # Log the error
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400