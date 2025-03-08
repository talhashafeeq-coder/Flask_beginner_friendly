import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import '../style_folder/adminlinkpages.css';


const AddSubtopicForm = () => {
  const [subtopics, setSubtopics] = useState([]); // List of subtopics
  const [selectedSubtopic, setSelectedSubtopic] = useState(""); // Selected subtopic ID
  const [content, setContent] = useState(""); // Subtopic content
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch subtopic names from the backend
  useEffect(() => {
    const fetchSubtopics = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("http://127.0.0.1:5000/add_content/add_content");      
        if (response.data && Array.isArray(response.data)) {
          setSubtopics(response.data);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch subtopics. Please try again.");
        toast.error(err.response?.data?.error || "Failed to fetch subtopics.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubtopics();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!selectedSubtopic || !content) {
      toast.error("Please select a subtopic and enter content");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:5000/topic_subtopic/add_subtopic", {
        course_id: selectedSubtopic,
        content,
      });

      if (response.status === 201) {
        toast.success("Subtopic added successfully!");
        setSelectedSubtopic("");
        setContent("");
      } else {
        throw new Error(response.data.error || "Failed to add subtopic");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add subtopic. Please try again.");
      toast.error(err.response?.data?.error || "Failed to add subtopic.");
    }
  };

  return (
    <div className='wapper '>
      <div className="container mt-5 sub_wapper">
        <Toaster />
        <h2 className="mb-4 text-center">
          Add Subtopic
          </h2>
        
        {loading && <div className="alert alert-info">Loading...</div>}
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="shadow p-4 wapper">
          {/* Subtopic Dropdown */}
          <div className="form-group mb-3">
            <label htmlFor="subtopic" className='label_style'>
              Select Subtopic
              </label>
            <select
              className="form-control input_style"
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              required
            >
              <option value="">-- Select Subtopic --</option>
              {subtopics.map((subtopic) => (
                <option key={subtopic.id} value={subtopic.id}>
                  {subtopic.topic_name}
                </option>
              ))}
            </select>
          </div>

          {/* Content Input */}
          <div className="form-group mb-3">
            <label htmlFor="content" className='label_style'>
              Content
              </label>
            <input
              className="form-control input_style"
              type="text"
              placeholder="Enter subtopic content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Add Subtopic
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubtopicForm;
