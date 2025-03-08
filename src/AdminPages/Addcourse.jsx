import React, { useState } from "react";
import IndexUrl from '../Hooks/IndexUrl'; {/* Navbar Import */ }
import axios from "axios";
import "../style_folder/adminlinkpages.css"; {/* style import */ }

const statusOptions = ["active", "closed"];
const difficultyOptions = ["beginner", "Intermediate", "advanced"];

const AddCourse = () => {
  const [formData, setFormData] = useState({
    language_name: "",
    topic_name: "",
    status: "active",
    price: "",
    diffculty_level: "beginner"
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://127.0.0.1:5000/add_language/add_course", formData, {
        headers: { "Content-Type": "application/json" }
      });

      setMessage(response.data.message);
      setFormData({ language_name: "", topic_name: "", status: "active", price: "", diffculty_level: "beginner" });
    } catch (err) {
      if (err.response) {
        // Server response with an error
        setError(err.response.data.error || "Something went wrong. Please try again.");
      } else if (err.request) {
        // No response from server (network issue)
        setError("No response from the server. Please check your connection.");
      } else {
        // Something else caused an error
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IndexUrl.Navbar2 />
      <div className="wapper">
        <div className="container mt-5 sub_wapper">
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Add New Course
          </h3>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="shadow p-4 wapper">
            <div className="form-group mb-3">
              <label htmlFor="language_name" className="label_style">
                Language Name
              </label>
              <input type="text" name="language_name" value={formData.language_name}
                onChange={handleChange} required className="form-control input_style" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="topic_name" className="label_style">
                Topic Name
              </label>
              <input type="text" name="topic_name" value={formData.topic_name}
                onChange={handleChange} required className="form-control input_style" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="status" className="label_style">
                Status
              </label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="form-control input_style" required>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="price" className="label_style">
                Price
              </label>
              <input type="number" name="price" value={formData.price} className="form-control input_style"
                onChange={handleChange} required />
            </div>

            <div className="form-group mb-3">
              <label>
                Difficulty Level
              </label>
              <select name="diffculty_level" value={formData.diffculty_level} onChange={handleChange} className="form-control input_style" required>
                {difficultyOptions.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <button variant="primary" type="submit" disabled={loading}>
              {loading ? "Adding Course..." : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
