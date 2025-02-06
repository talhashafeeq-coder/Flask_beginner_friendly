import React, { useState, useEffect } from "react";
import IndexUrl from "../Hooks/IndexUrl";
import axios from "axios";
import CountUp from "react-countup";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style_folder/Admin.css";

const Dashboard = () => {
  const [totalCourse, setTotalCourse] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchCourseContent = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:5000/add_language/add_course/total"
      );
      console.log("Fetched total course:", response.data.total_course);
      setLoading(false);
      // Set total_course value
      setTotalCourse(response.data.total_course || 0);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error("Error fetching total course:", error);
    } finally {
      setLoading(false);
    }
  };
   useEffect(() => {
    fetchCourseContent();
  }, []);
   // **Handle different states**
  if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading Admin Pages... ⏳</div>;
  }
   if (error) {
    return <div className="alert alert-danger text-center mt-5">❌ Error fetching Admin Pages. Please try again later.</div>;
  }
   return (
    <>
      <IndexUrl.Navbar2 />
      <div className="wapper">
        {/* Header Section */}
        <header
          className="header_style" >
          <h1 className="heading_style" >
            Admin Dashboard
          </h1>
          <p className="sub_heading_para" >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione delectus optio aperiam!
          </p>
        </header>
        {/* Stats Section */}
        <div
          className="container section" >
          <div className="left_side" >          {/* Left Side Text */}
            <h2 className="left_side_heading" >
              Total Courses Content Available
            </h2>
            <p className={"left_side_para"} >
              Explore a wide variety of courses to enhance your skills and
              career!
            </p>
          </div>
          <div className="right_side">       {/* Right Side Counter & Progress Bar */}
            <h3 className="right_side_heading">
              <CountUp end={totalCourse} duration={4} separator="," />
            </h3>
            <div className="right_side_progress">
              <ProgressBar
                className="right_side_progress_bar"
                now={totalCourse}
                animated />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
