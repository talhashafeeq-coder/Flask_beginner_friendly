import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndexUrl from '../Hooks/IndexUrl'
import { Toaster, toast } from 'react-hot-toast';
import '../style_folder/adminlinkpages.css';

const CourseContent = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [description, setDescription] = useState('');
  const [topicName, setTopicName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/add_language/get_courses');
        // console.log(response.data.courses);
        setProjects(response.data.courses || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedProject || !description || !topicName) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/add_content/add_content', {
        project_id: selectedProject,
        description,
        topic_name: topicName
      });
      toast.success(response.data.message);
      setSelectedProject('');
      setDescription('');
      setTopicName('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      toast.error('Failed to add content');
    }
    setLoading(false);
  };

  return (
    <> 
    <IndexUrl.Navbar2 />
    <IndexUrl.ScrollToTop/>
    <div className='wapper'>
    <div className="container mt-5 sub_wapper">
      <Toaster />
      <h3 className="mb-4 text-center">Add Course Content</h3>
      {/* show loading! */}
      {loading && <div className="alert alert-info" role="alert">Loading...</div>}
      {/* show error */}
     {error && (
    <div className="alert alert-danger" role="alert">
        {error}
    </div>
)}
      <form onSubmit={handleSubmit} className="shadow  wapper">
      <div className="form-group mb-3">
      <label htmlFor="content" className='label_style'>Select Project</label>
          <select
            value={selectedProject}
            className="form-control input_style"
            onChange={(e) => setSelectedProject(e.target.value)}
            required>
            <option value="">-- Select a Project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.language_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="content" className='label_style'>Topic Name</label>
          <input
            className="form-control input_style"
            type="text"
            placeholder="Enter topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
        <label htmlFor="content" className='label_style'>Description</label>
          <input
            as="textarea"
            className="form-control input_style"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button variant="primary" type="submit" >
          Add Content
        </button>
      </form>
      </div>
    </div>
    <IndexUrl.AddSubtopicForm />
    <IndexUrl.AddTopicSubtopicForm />

    </>

  );
};

export default CourseContent;





