import React from "react";
import "../style_folder/AutoScrollText.css";

const AutoScrollText = () => {
  const languages = [
    "Java", "HTML", "CSS", "Python", "JavaScript", "C++", "Ruby", "PHP",
    "C#", "Swift", "Kotlin", "Go", "Rust", "SQL", "TypeScript", "Perl",
    "R", "Dart", "Scala", "MATLAB", "Shell", "Lua", "Assembly", "Fortran"
  ];

  return (
    <div className="scroll-container-alt">
      <div className="scroll-text-alt">
        {languages.map((language, index) => (
          <span key={index} className={`language-alt color-${index % 5}`}>
            {language}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollText;
