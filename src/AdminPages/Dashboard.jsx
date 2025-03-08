import React, { useEffect } from 'react'
import IndexUrl from '../Hooks/IndexUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';

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
      <IndexUrl.ScrollToTop />
      <div className="container-fluid banner">
        <div className="banner-content">
          <p className="logo-text">
            Coding &nbsp;
            <FontAwesomeIcon icon={faCube} size="2x" color="white" className="animated-icon" />
          </p>
          <div>
            <p className="banner_para">With the world's largest web developer site.</p>
          </div>
        </div>

        <form className="d-flex" role="search">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-12">
                <input
                  className="form-control input_style"
                  type="search"
                  placeholder="🔍 Search here..."
                  aria-label="Search"
                />
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
      < IndexUrl.SuccessBanner />
      <IndexUrl.Footer />
    </div>
  )
}
