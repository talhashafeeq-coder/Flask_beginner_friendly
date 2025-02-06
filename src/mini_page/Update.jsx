import React, { useEffect, useRef } from 'react';
import '../style_folder/Update.css';

export default function Update() {
    const sectionsRef = useRef([]);

    const descriptions = [
        "A web server programming language",
        "A JavaScript library for developing web pages",
        "A versatile and widely-used programming language",
        "A powerful language for system-level programming",
        "The language for styling beautiful websites",
        "A popular CSS framework for responsive design"
    ];

    useEffect(() => {
        const handleScroll = () => {
            sectionsRef.current.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    section.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <div className="container waiting" id='update'>
                <h3 className="heading_3 " >Update coming....</h3>
            </div>

            <div className="container-fluid set_bg" >
                <div className="row">
                    {['PHP', 'jQuery', 'Java', 'C++', 'CSS', 'Bootstrap'].map((item, index) => (
                        <div
                            key={index}
                            className="col-sm-6 text-3d"
                            ref={(el) => sectionsRef.current[index] = el}
                            style={{
                                padding: "80px",
                                background: index % 2 === 0
                                    ? "linear-gradient(to right, #fbc2eb, #a6c1ee)"
                                    : "linear-gradient(to right, #ffd89b, #19547b)",
                                textAlign: "center",
                                border: "9px solid #ddd",
                            }}
                        >
                            <h4 className="heading_4" >{item}</h4>
                            <p className='para' >{descriptions[index]}</p>
                            <button type="btn" className="btn" style={{ backgroundColor: "#ee5253" }}>Learn {item}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


