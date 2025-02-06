import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import IndexUrl from '../Hooks/IndexUrl'


import '../style_folder/Dashboard.css'

export default function Dashboard() {
  useEffect(() => {
    // Trigger the animation on component mount
    const portLight = document.getElementById('port-light');
    if (portLight) {
      portLight.classList.add('animate');
    }
  }, []);
  return (
    <div>
      < IndexUrl.Navbar />
      <div className="container-fluid banner">
      <div className="banner-content">
  <p className="logo-text">
    Coding &nbsp;
    <FontAwesomeIcon icon={faCube} size="2x" color="white" className="animated-icon" />
  </p>
  {/* <p className="logo-icon">&lt;/&gt;</p> */}
  <div>
    {/* <h2 className='banner_heading'>Learn to Code</h2> */}
    <p className="banner_para">With the world's largest web developer site.</p>
  </div>
</div>

        <form className="d-flex" role="search">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-12">
                <input className="form-control me-2 mb-1" style={{ borderRadius: "10px", border: "none", outline: "none", color: "#2c3e50", fontWeight: "bold" }} type="search" placeholder="Search" aria-label="Search" />
              </div>
            </div>
          </div>
        </form>
        <IndexUrl.AnimationText />
        <div id="port-light" className="port-light"></div>
      </div>
      <IndexUrl.AutoText />
      <IndexUrl.About />
      < IndexUrl.Update />
      < IndexUrl.Template />
      <IndexUrl.Footer />
    </div>
  )
}
