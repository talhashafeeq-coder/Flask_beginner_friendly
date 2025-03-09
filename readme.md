# CourseHub Backend

Welcome to the backend of **CourseHub**! This backend is built using Flask (Python) and manages the API for user authentication, course handling, and assessments.

## 🚀 Features
- Course management<br>
- Assessments for users<br>
- Admin panel for data entry<br>
- MySQL database integration<br>

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Python 3.x
- pip (Python package manager)
- MySQL database

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/talhashafeeq-coder/CourseHub.git<br>
cd CourseHub/backend  # Navigate to backend directory
```

### 2️⃣ Create a Virtual Environment 
```bash
python -m venv venv
source venv/bin/activate  # For macOS/Linux
venv\Scripts\activate    # For Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```


### 5️⃣ Run Migrations (If Using Flask-Migrate)
```bash
flask db upgrade
```

### 6️⃣ Start the Flask Server
```bash
python run.py  # Or flask run
```
The backend will be available at `http://127.0.0.1:5000/`

## 📊 Database Tables
The backend consists of the following database tables:

1. **Config.py** - Handles database connection.<br>
2. **Add Courses** - Stores added courses.<br>
3. **Courses Content** - Stores course-related content.<br>
4. **Course Topic** - Covers topics related to each course.<br>
5. **Exam** - Manages exams related to courses.<br>
6. **Exam Questions** - Stores questions for each exam.<br>
7. **Topic Details** - Provides details for each course topic.<br>
8. **User Login** - Manages user authentication and login details.<br>

## 🔗 API Endpoints

### Courses
| Method | Endpoint        | Description             |
|--------|---------------|-------------------------|
| GET    | /add_content/add_content`     | Get all courses        |
| POST   | `/add_content/add_content`     | Add a new course       |
| GET    | `/add_content/get_content/id` | Get course by ID       |
| DELETE | `/add_content/delete_content/:id` | Delete a course by ID  |

### Course Topics
| Method | Endpoint            | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/topic_subtopic/add_subtopic`         | Get all course topics       |
| POST   | `/topic_subtopic/add_subtopic`         | Add a new course topic      |

### Sub Topics
| Method | Endpoint              | Description                  |
|--------|---------------------|------------------------------|
| GET    | `/subtopic/get_topic_subtopic`        | Get all sub-topics          |
| POST   | `/subtopic/add_topic_subtopic`        | Add a new sub-topic         |
| GET    | `/subtopic/get_subtopic/id`    | Get a sub-topic by ID       |
| DELETE | `/subtopic/delete_subtopic/id`    | Delete a sub-topic by ID    |

### Add Course
| Method | Endpoint         | Description                 |
|--------|----------------|-----------------------------|
| GET    | `/add_language/get_courses` | Get all language name|
| POST   | `/add_language/add_course` | Add a new language name|
| DELETE | `/add_language//delete_course/<int:course_id>` | Delete an language by ID |

### Exams
| Method | Endpoint       | Description              |
|--------|--------------|--------------------------|
| GET    | `/exam_collection/exam_collection`     | Get all exams           |
| POST   | `/exam_collection/exam_collection`     | Add a new exam          |


### Exam Questions
| Method | Endpoint               | Description                     |
|--------|----------------------|---------------------------------|
| GET    | `/exam-questions/exam-questions`    | Get all exam questions        |
| POST   | `/exam-questions/exam-questions`    | Add a new exam question       |
| DELETE | `/exam-questions/exam-questions/:id` | Delete an exam question by ID |


---

### 📌 Contributing
Feel free to submit pull requests or open issues to improve this project!

