import React, { useState, useEffect } from "react";
import axios from "axios";
import {Spinner ,Form} from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import '../style_folder/adminlinkpages.css';

const AddTopicSubtopicForm = () => {
  const [topics, setTopics] = useState([]); // List of topics
  const [selectedTopic, setSelectedTopic] = useState(""); // Selected topic ID
  const [subtopicName, setSubtopicName] = useState(""); // Subtopic name
  const [description, setDescription] = useState(""); // Subtopic description
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch topic names from the backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("http://127.0.0.1:5000/topic_subtopic/add_subtopic"); // Adjust this API endpoint
        console.log("chdck",response.data);
        if (response.data && Array.isArray(response.data.subtopics)) {
            setTopics(response.data.subtopics); // Correct: Extract the array from `subtopics`
          } else {
            throw new Error("Invalid data format received");
          }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        toast.error("Failed to fetch topics");
      }
    };

    fetchTopics();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTopic || !subtopicName || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/subtopic/add_topic_subtopic", {
        topic_id: selectedTopic,
        subtopic_name: subtopicName,
        description: description,
      });

      if (response.status === 201) {
        toast.success("Subtopic added successfully!");
        setSelectedTopic("");
        setSubtopicName("");
        setDescription("");
      }
    } catch (error) {
      toast.error("Failed to add subtopic");
    }
  };

  return (
    <div className='wapper'>
    <div className="container mt-5 sub_wapper">
      <Toaster />
      <h2 className="mb-4 text-center">Add Topic & Subtopic</h2>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <p className="text-danger">Failed to load topics</p>}

      <form onSubmit={handleSubmit} className="shadow p-4 wapper">
        {/* Topic Dropdown */}
        <div className="form-group mb-3">
        <label htmlFor="content" className='label_style'>Select Topic</label>
          <select
            value={selectedTopic}
            className="form-control input_style"
            onChange={(e) => setSelectedTopic(e.target.value)}
            required
          >
            <option value="">-- Select Topic --</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.content} {/* Showing topic name instead of ID */}
              </option>
            ))}
          </select>
        </div>

        {/* Subtopic Name Input */}
        <div className="form-group mb-3">
        <label htmlFor="content" className='label_style'>Subtopic Name</label>
        <input
            type="text"
            className="form-control input_style"
            placeholder="Enter subtopic name"
            value={subtopicName}
            onChange={(e) => setSubtopicName(e.target.value)}
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group mb-3">
        <label htmlFor="content" className='label_style'>Description</label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button variant="primary" type="submit">
          Add Subtopic
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddTopicSubtopicForm;
