import React from 'react';
import { Carousel } from 'react-bootstrap';
// import css file
import '../style_folder/CarouselComponent.css'

const CarouselComponent = () => {
 
  return (
    <Carousel>
      {/* First Slide */}
      <Carousel.Item>
        <img
          className="d-block w-100 custom-height"
          src="https://images.unsplash.com/photo-1531030874896-fdef6826f2f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGh0bWwlMjBjb2RlJTIwZXhhbXBsZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Laptop and Tech Setup"
        />
        <Carousel.Caption>
          <h3 className='CarouselHeading'>Tech & Innovation</h3>
          <p className='carousel-para' >Explore the latest trends in technology and innovation.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Second Slide */}
      <Carousel.Item>
        <img
          className="d-block w-100 custom-height"
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGVudHJlcHJlbmV1cnxlbnwwfHx8fDE2ODE0OTg0NTI&ixlib=rb-4.0.3&q=80&w=800"
          alt="Team Collaboration"
        />
        <Carousel.Caption>
          <h3 className='CarouselHeading'>Collaborate & Grow</h3>
          <p  className='carousel-para'>Join a team that values creativity and collaboration.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Third Slide */}
      <Carousel.Item>
        <img
          className="d-block w-100 custom-height"
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNjZW5lcnl8ZW58MHx8fHwxNjgxNDk4NDUy&ixlib=rb-4.0.3&q=80&w=800"
          alt="Scenic Landscape"
        />
        <Carousel.Caption>
          <h3 className='CarouselHeading'>Scenic Views</h3>
          <p className='carousel-para'>Relax with breathtaking landscapes and natural beauty.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
