import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Divider } from '@mui/material';

const Testimonial = ()=>{
    const testimonialData = [
        {
          name: 'Client Name',
          profession: 'Profession',
          text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.',
          image: 'img/testimonial-3.jpg',
        },
        {
          name: 'Client Name',
          profession: 'Profession',
          text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.',
          image: 'img/testimonial-4.jpg',
        },
        {
          name: 'Client Name',
          profession: 'Profession',
          text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.',
          image: 'img/testimonial-1.jpg',
        },
        {
          name: 'Client Name',
          profession: 'Profession',
          text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.',
          image: 'img/testimonial-2.jpg',
        },
        {
          name: 'Client Name',
          profession: 'Profession',
          text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.',
          image: 'img/testimonial-4.jpg',
        },
        {
          name: 'Client Name',
          profession: 'Profession',
          text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.',
          image: 'img/testimonial-4.jpg',
        },
        // Add more testimonial data objects as needed
      ];
    
      const settings = {
        autoplay: true,
        autoplaySpeed: 1000,
        centerMode: true,
        centerPadding: '24px',
        dots:true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      };
    
    return (
        <div className="testimonial-container">
      <Box textAlign="center">
        <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
        <h1 className="mb-5">Tails from the academic alcove</h1>
      </Box>
      <Slider {...settings} className="testimonial-carousel">
        {testimonialData.map((testimonial, index) => (
          <div key={index} className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src={testimonial.image}
              style={{ width: '80px', height: '80px' }}
              alt={`Client ${index + 1}`}
            />
            <h5 className="mb-0">{testimonial.name}</h5>
            <p >{testimonial.profession}</p>
            <Divider />
            <div className="testimonial-text center-back text-center p-4">
              <p className="mb-0">{testimonial.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    )
}

export default Testimonial;