import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import StudentSay from "./StudentsSay";
import Navhome from "./Navhome";
import darEArqam from '../img/Partners/dar-e-arqam.avif'
import Bips from '../img/Partners/bips-logo.avif'
import shiningStar from '../img/Partners/shining-star.avif'
import saintDavid from '../img/Partners/saint-david.avif'
import Coursecategory from "./Coursecategory";
import Corusecomponent from "./Corusecomponent";
import Instructorcomponent from "./Instructorcomponent";
import registerSchool from '../img/register-your-school.avif'

export default function Home() {
  const [hoverCol, setHoverCol] = useState(null);

  const settings1 = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      {/* Home header Start*/}
      <section className="home-head">
        <div className="home-head-overlay">
          <Navhome />
          <div className="container-fluid">
            <div className="row py-7">
              {/* <div className="col-md-12" style={{ backgroundColor: "rgba(4, 38, 56, 0.2)", width: "100%" }}> */}
              <div className="col-md-12">
                <div className="text-white header-text text-center">
                  <h1>
                    Architects Of Insight, Building <br /> Bridges In The <br />{" "}
                    <span> Landscape Of Learning</span>
                  </h1>
                  <p>
                    {" "}
                    Crafting Knowledge, Connecting Dreams – Your Canvas of
                    Infinite Learning.
                  </p>
                </div>
              </div>
            </div>
            <div className="row pb-5 px-5">
              <div className="col-md-4 three-cards">
                <div className="card card1">
                  <div className="card-content d-flex">
                    <i className="bi bi-play-btn"></i>
                    <div>
                      <h5>Multiple Online Courses</h5>
                      <p>variety of fresh topics</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 three-cards">
                <div className="card card1">
                  <div className="card-content d-flex">
                    <i className="bi bi-play-btn"></i>
                    <div>
                      <h5>Expert Instruction</h5>
                      <p>Find the right instructors</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 three-cards">
                <div className="card card1">
                  <div className="card-content d-flex">
                    <i className="bi bi-play-btn"></i>
                    <div>
                      <h5>Lifetime Access</h5>
                      <p>Learn on your schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Home header end */}

      <section className="partners p-4 bg-white">
        <div className="container">
          <div className="row g-5 d-flex justify-content-between align-items-center">
            <div className="col-md-2">
              <h3>100+ <br /> Valued Partners</h3>
            </div>
            <div className="col-md-10 col-12">
              <Slider {...settings1}>

                <div>
                  <img src={shiningStar} alt="shining-star" className="img-fluid" />
                </div>

                <div>
                  <img src={Bips} alt="bips-school" className="img-fluid" />
                </div>

                <div>
                  <img src={darEArqam} alt="dar-e-arqam" className="img-fluid" />
                </div>

                <div>
                  <img src={saintDavid} alt="saint-david" className="img-fluid" />
                </div>

                <div>
                  <img src={darEArqam} alt="dar-e-arqam" className="img-fluid" />
                </div>

                <div>
                  <img src={saintDavid} alt="saint-david" className="img-fluid" />
                </div>

              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* <Coursecategory /> */}


      <section className="about bg-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 empty-col">

            </div>

            <div className="col-md-6 about-col">
              <div className="overlay">
                <div className="content">
                  <div className="section-header">
                    <h6>About Us</h6>
                    <h2 className="text-light">Discover The Essence Of Mentors Academia</h2>
                  </div>
                  <p className="text-light">Welcome to Mentors Academia, where knowledge meets innovation. Our platform is more than just an online learning hub; it's a dynamic community dedicated to fostering educational connections and empowering individuals on their learning journey. At Mentors Academia, we believe in the transformative power of education and the profound impact it can have on one's life. Our mission is to provide a versatile space for students, instructors, and school owners to come together, share their expertise, and cultivate an environment of continuous learning.</p>
                  <Link to='/about'>
                    <button className="second-button" style={{ color: 'white' }}>Learn More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Corusecomponent />

      {/* Home card Start */}
      <div className="container">
        <h1 className="text-center mb-3">What We Do</h1>
        <div className="row d-flex justify-content-between">
          <div
            className={`hover-col mb-3 col-md-${hoverCol === 2 || hoverCol === 3 ? "3" : "6"
              }`}
          >
            <div className="card">
              <div className="card-body">
                <i className="fas fa-globe fa-2x mb-3"></i>
                <h4>Global Connectivity</h4>
                <p>
                  Connecting educators, students, and schools worldwide for a
                  seamless exchange of knowledge.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`hover-col mb-3 col-md-${hoverCol === 2 ? "6" : "3"}`}
            onMouseEnter={() => setHoverCol(2)}
            onMouseLeave={() => setHoverCol(null)}
          >
            <div className="card">
              <div className="card-body">
                <i className="fas fa-book fa-2x mb-3"></i>
                <h4>Diverse Courses</h4>
                <p>
                  Offering a wide array of courses catering to various interests
                  and skill levels.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`hover-col mb-3 col-md-${hoverCol === 3 ? "6" : "3"}`}
            onMouseEnter={() => setHoverCol(3)}
            onMouseLeave={() => setHoverCol(null)}
          >
            <div className="card">
              <div className="card-body">
                <i className="fas fa-users fa-2x mb-3"></i>
                <h4>Collaborative</h4>
                <p>
                  Fostering an interactive and collaborative learning
                  environment for students and instructors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-between">
          <div
            className={`hover-col mb-3 col-md-${hoverCol === 4 ? "6" : "3"}`}
            onMouseEnter={() => setHoverCol(4)}
            onMouseLeave={() => setHoverCol(null)}
          >
            <div className="card">
              <div className="card-body">
                <i className="fas fa-chalkboard-teacher fa-2x mb-3"></i>
                <h4>Expert Educators</h4>
                <p>
                  Bringing top-notch educators to impart knowledge and share
                  their expertise with our community.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`hover-col mb-3 col-md-${hoverCol === 4 || hoverCol === 6 ? "3" : "6"
              }`}
          >
            <div className="card">
              <div className="card-body">
                <i className="fas fa-road fa-2x mb-3"></i>
                <h4>Personalized Learning Paths</h4>
                <p>
                  Empowering students to create personalized learning paths
                  based on their unique educational goals.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`hover-col mb-3 col-md-${hoverCol === 6 ? "6" : "3"}`}
            onMouseEnter={() => setHoverCol(6)}
            onMouseLeave={() => setHoverCol(null)}
          >
            <div className="card">
              <div className="card-body">
                <i className="fas fa-lightbulb fa-2x mb-3"></i>
                <h4>Innovative Learning</h4>
                <p>
                  Constantly evolving and introducing innovative solutions to
                  enhance the overall learning experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Home card End */}

      <Instructorcomponent />


      <section className="add-schools py-4" style={{ backgroundColor: '#fafafa' }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-7">
              <div className="section-header">
                <h6>Add Your School</h6>
                <h2>Want Your School To Be Known Globally?</h2>
              </div>
              <p style={{ fontWeight: "initial" }}>Register Your School on Mentors Academia to Expand Your Reach Globally. Showcase your institution's expertise, connect with a diverse audience of students and educators worldwide, and join a thriving educational community. Unlock new opportunities for growth and recognition by becoming part of our global network of schools committed to excellence in education.</p>
              <div className="mb-4 d-flex">
                <Link to='/signin'>
                  <button className="first-button" style={{ marginRight: '15px' }}>Register School</button>
                </Link>
                <Link to="/school">
                  <button className="second-button">View Schools</button>
                </Link>
              </div>
            </div>
            <div className="col-md-5">
              <img src={registerSchool} alt="register-your-school" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-3">
        <StudentSay />
      </section>
    </div>
  );
}
