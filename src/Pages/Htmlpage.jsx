import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import '../style_folder/PythonCourse.css'
import { Link } from "react-router-dom";


const htmlpage = () => {
    const [tutorials, setTutorials] = useState([]);
    const [topics, setTopics] = useState([]);
    const [expandedTopics, setExpandedTopics] = useState({});
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);
                setError(false);

                // 🟢 Fetch Main Course Content
                const contentResponse = await axios.get("http://127.0.0.1:5000/add_content/add_content");
                if (Array.isArray(contentResponse.data)) {
                    console.log("main content",contentResponse.data)
                    setTutorials(contentResponse.data);
                }

                // 🟢 Fetch Subtopics List
                const subtopicResponse = await axios.get("http://127.0.0.1:5000/topic_subtopic/add_subtopic");
                console.log("subtopicResponse",subtopicResponse.data.subtopics)
                const subtopics = subtopicResponse.data.subtopics;

                // 🟢 Fetch Subtopics Detailed Content
                const detailResponse = await axios.get("http://127.0.0.1:5000/subtopic/get_all_subtopics");
                console.log("detailResponse", detailResponse.data.subtopics)
                const allSubtopics = detailResponse.data.subtopics;

                // 🟢 Merge Topics with their Subtopics
                const resolvedTopics = subtopics.map(subtopic => ({
                    topic_id: subtopic.course_id,
                    sub_topic_id: subtopic.id,
                    sub_topic_name: subtopic.content,
                    details: allSubtopics.filter(item => item.topic_id === subtopic.id) // ✅ Only related subtopics!
                }));

                setTopics(resolvedTopics);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, []);

    // ✅ Sirf Python se start hone wale topics show honge
    const HTMLTutorials = tutorials.filter(tutorial =>
        tutorial.topic_name && tutorial.topic_name.trim().toLowerCase().startsWith("html")
    );

    // ✅ Toggle Function for Expanding Topics
    const toggleTopic = (topicId) => {
        setExpandedTopics(prevState => ({
            ...prevState,
            [topicId]: !prevState[topicId]
        }));
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Toggle Button */}
                     <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
                          {isOpen ? "✖ Close" : "☰ Menu"}
                      </button>
          
                      {/* Sidebar */}
                      <div className={`sidebar ${isOpen ? "open" : ""}`}>
                          <h4 className="heading">
                              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                                  HTML Course Topics
                              </Link>
                          </h4>
                          {loading ? (
                              <p>Loading...</p>
                          ) : error ? (
                              <p>Error loading data.</p>
                          ) : (
                              <ul style={{ listStyleType: "none", padding: "0" }}>
                                  {HTMLTutorials.map((tutorial) => {
                                      const topicSubtopics = topics.filter(t => t.topic_id === tutorial.id);
          
                                      return (
                                          <li key={tutorial.id} className="sub_heading">
                                              <button className="show_topics"
                                                  onClick={() => {
                                                      setSelectedTopic(tutorial);
                                                      setSelectedSubtopic(null);
                                                      if (topicSubtopics.length > 0) {
                                                          toggleTopic(tutorial.id);
                                                      }
                                                  }}
                                              >
                                                  {tutorial.topic_name} 
                                                  {topicSubtopics.length > 0 && (
                                                      <span className="sub_drop">  {expandedTopics[tutorial.id] ? "▼" : "▶"}</span>
                                                  )}
                                              </button>
          
                                              {expandedTopics[tutorial.id] && topicSubtopics.length > 0 && (
                                                  <ul style={{ marginLeft: "15px", listStyleType: "circle" }}>
                                                      {topicSubtopics.map((subtopic) => (
                                                          <li key={subtopic.sub_topic_id}>
                                                              <button className="show_subtopics"
                                                                  onClick={() => {
                                                                      setSelectedSubtopic(subtopic);
                                                                  }}
                                                                >
                                                                  {subtopic.sub_topic_name}
                                                              </button>
                                                          </li>
                                                      ))}
                                                  </ul>
                                              )}
                                          </li>
                                      );
                                  })}
                              </ul>
                          )}
                      </div>

            {/* Main Content */}
            <div className="main_content" >
            <h1 className="text-center mb-2 p-3 animate__animated animate__lightSpeedInLeft">HTML Tutorials</h1>

                {/* ✅ Show Main Topic Description */}
             {selectedTopic ? (
                                 <div>
                                     <h4 className="main_contentheading">{selectedTopic.topic_name}</h4>
                                     <p  className="main_contentPara"dangerouslySetInnerHTML={{ __html: he.decode(selectedTopic.description || "No description available.") }} />
             
                                 </div>
                             ) : (
                                <p className="loading-text  animate__animated animate__fadeInDownBig">Select a topic to view details<span className="dots"></span></p>
                            )}
             
                             {/* ✅ Show Subtopic Details Only If Selected */}
                             {selectedSubtopic && (
                 <div>
                     <h5 className="main_contentheading">{selectedSubtopic.sub_topic_name}</h5>
                     {selectedSubtopic.details.map((detail) => {
                         // console.log("Encoded HTML from backend:", detail.description);
                         // console.log("Decoded HTML after he.decode():", he.decode(detail.description));
             
                         return (
                             <div className="main_contentPara" key={detail.id} dangerouslySetInnerHTML={{ __html: he.decode(detail.description) }} />
                         );
                     })}
                 </div>
             )}
            </div>
        </div>
    );
};

export default htmlpage;

