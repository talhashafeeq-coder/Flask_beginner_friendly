import React from "react";
import "../style_folder/SuccessBanner.css"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const SuccessBanner = () => {
  return (
    <div className="profile-container">
    <div className="profile-card">
      <img
        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36"
        alt="Motivational"
        className="profile-image"
      />
      <div className="profile-details">
        <h2 className="profile-name">Talha Shafiq</h2>
        <p className="profile-description">
          "Success is not final, failure is not fatal: It is the courage to continue that counts."
        </p>
        <div className="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </div>
  </div>
    );
};

export default SuccessBanner;


