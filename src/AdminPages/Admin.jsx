import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBookOpen, FaUsers, FaPagelines } from "react-icons/fa";
import IndexUrl from "../Hooks/IndexUrl"; // Navbar Import
import "../style_folder/Admin.css";

const Dashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [addcontent, setAddcontent] = useState(0);
  // const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);

      // API Calls
      const coursesRes = await axios.get("http://127.0.0.1:5000/add_language/get_courses");
      const studentsRes = await axios.get("http://127.0.0.1:5000/add_content/add_content"); 

      // Updating States
      setTotalCourses(coursesRes.data.courses.length);
      setAddcontent(studentsRes.data.length || 0);
      // setTotalUsers(userRes.data.|| 0);
    } catch (error) {
      setError(true);
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading Dashboard... ⏳</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">❌ Error fetching dashboard data!</div>;
  }

  return (
    <>
      <IndexUrl.Navbar2 /> {/* Navbar Added */}
      <div className=" wapper">
        <div className="dashboard-row">
          <div className="dashboard-card">
            <FaBookOpen className="dashboard-icon" />
            <div className="dashboard-info">
              <h2>{totalCourses}</h2>
              <p>Total Courses</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <FaPagelines className="dashboard-icon " />
            <div className="dashboard-info">
              <h2>{addcontent}</h2>
              <p>Total Content</p>
            </div>
          </div>

          <div className="dashboard-card">
            <FaUsers className="dashboard-icon" />
            <div className="dashboard-info">
              <h2>0</h2>
              <p>Total User</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
