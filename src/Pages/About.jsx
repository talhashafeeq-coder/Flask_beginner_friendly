import React from 'react';
import AboutImage from '../Images/About.png';

export default function About() {
  return (
    <div
      style={{
        backgroundColor: "#f0f4f8", // Inspired by soft tones in the image
        padding: "50px 0",
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* Image Section */}
      <div>
        <img
          src={AboutImage}
          alt="About Us"
          style={{
            maxWidth: "500px",
            borderBottom: "5px solid #ddd",
            margin: "-200px auto 20px",
            position: "relative",
          }}
        />
      </div>

      {/* Content Section */}
      <div className="container">
        <div
          className="row justify-content-center"
          style={{ paddingTop: "50px" }}
        >
          {/* Text Section */}
          <div className="col-sm-12 col-md-8">
          <h1
          style={{
            fontWeight: 'bold',
            fontSize: '3rem',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #007bff, #ff6f61)', // Gradient colors
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', // Makes the gradient visible inside text
          }}
        >
          About Us
        </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.8",
                color: "#555",
                textAlign: "center",
                padding: "0 15px",
              }}
            >
             "We <b>offer</b> many courses with examples, completely free, featuring the latest <b>examples</b> and content from <b>developers</b> with diverse experience. Learn the necessary code and <b>advance</b> your skills."
            </p>
            <button
              style={{
                marginTop: "20px",
                padding: "10px 25px",
                fontSize: "1rem",
                color: "#fff",
                background: "#007bff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "#007bff")
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
