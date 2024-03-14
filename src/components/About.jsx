import React, { useState } from "react";
import StudentSay from "./StudentsSay";
import SchoolIcon from "@mui/icons-material/School";
import CountUp from "react-countup";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FAQs from '../img/faq-img.avif'
import { Link } from "react-router-dom";
import Angle1 from '../img/angle-1.avif'
import Angle2 from '../img/angle-4.avif'
import Diversity2Icon from '@mui/icons-material/Diversity2';


export default function About() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (accordionId) => {
    setOpenAccordion(accordionId === openAccordion ? null : accordionId);
  };

  return (
    <div>
      {/* header start */}
      <section>
        <div className="head-bg">
          <div className="head-overlay">
            <h1 className="text-center py-6 text-white"> About Us</h1>
          </div>
        </div>
      </section>
      {/* header end */}
      <section className="mt-5 py-4 mb-4 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 mb-4">
              <div className="section-header mb-4">
                <h6>About Us</h6>
                <h2>Discover The Essence Of Mentors Academia</h2>
              </div>
              <p style={{ fontWeight: "initial" }}>
                Welcome to a transformative realm where learning goes beyond
                boundaries. At Mentors Academia, we invite you to elevate your
                educational journey with an unrivaled blend of innovation and
                experience. Our commitment goes beyond traditional learning,
                offering you a dynamic platform where excellence is not just a
                goal but a constant companion. Explore a curated space where
                knowledge meets innovation, and embark on a learning experience
                designed to reshape your academic horizons.{" "}
              </p>
              <p style={{ fontWeight: "initial" }}>Explore the essence of Mentors Academia, where education takes on new dimensions. Rooted in the vision of uniting schools, instructors, and students globally, we offer a vibrant platform for learning and collaboration. Here, educators shine, students thrive, and knowledge blossoms in an environment fueled by innovation and a passion for continuous learning. Join us on this educational journey, and let's shape the future of learning together.</p>
            </div>

            <div className="col-md-6 stats-col text-center">
              <div className="row g-4">
                <div className="col-md-6 about-1">
                  <div className="card border-0 about-card card-1">
                    <div className="card-body">
                      <div className="about-content">
                        <SchoolIcon className="stat-icon mb-4" /><br />
                        <CountUp
                          start={0}
                          end={150}
                          duration={3}
                          className="counter"
                        />
                        <h4 className="fw-bold">Registered Students</h4>
                        <p>Join our growing community of learners and be part of our educational journey!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 about-card card-2">
                    <div className="card-body">
                      <div className="about-content">
                        <CastForEducationIcon className="stat-icon mb-4" /> <br />
                        <CountUp
                          start={0}
                          end={150}
                          duration={3}
                          className="counter stat-1"
                        />
                        <h4 className="fw-bold">Courses Available</h4>
                        <p>Explore a diverse array of subjects with our extensive course catalog!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 about-card card-3">
                    <div className="card-body">
                      <div className="about-content">
                        <OndemandVideoIcon className="stat-icon mb-4" /> <br />
                        <CountUp
                          start={0}
                          end={150}
                          duration={3}
                          className="counter stat-1"
                        />
                        <h4 className="fw-bold">Hours Of Video Lectures Uploaded</h4>
                        <p>Dive into a wealth of knowledge with our extensive video library!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 about-card card-4">
                    <div className="card-body">
                      <div className="about-content">
                        <EmojiPeopleIcon className="stat-icon mb-4" /> <br />
                        <CountUp
                          start={0}
                          end={150}
                          duration={3}
                          className="counter stat-1"
                        />
                        <h4 className="fw-bold">Active Instructor</h4>
                        <p>Learn from a dedicated team of expert educators shaping your educational experience!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* advantage start */}

      <section className="about bg-white accord-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 about-col">
              <div className="overlay">
                <div className="p-5">
                  <div className="section-header mb-4">
                    <h6>Insight Corner</h6>
                    <h2 className="text-white">Discover The Essential Information</h2>
                  </div>
                  <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className={`accordion-item ${openAccordion === "One" ? "show" : ""}`}>
                      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          onClick={() => handleAccordionClick("One")}
                          aria-expanded={openAccordion === "One" ? "true" : "false"}
                        >
                          Flexible Learning Schedule
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className={`accordion-collapse collapse ${openAccordion === "One" ? "show" : ""}`}
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className="accordion-body">
                          Adapt your learning to your schedule with flexible access to
                          course materials, allowing you to learn at your own pace.
                        </div>
                      </div>
                    </div>
                    <div className={`accordion-item ${openAccordion === "Two" ? "show" : ""}`}>
                      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          onClick={() => handleAccordionClick("Two")}
                          aria-expanded={openAccordion === "Two" ? "true" : "false"}
                        >
                          Interactive Assignments
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className={`accordion-collapse collapse ${openAccordion === "Two" ? "show" : ""}`}
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className="accordion-body">
                          Participate in interactive assignments that go beyond
                          traditional assessments, promoting hands-on learning
                          experiences.
                        </div>
                      </div>
                    </div>

                    <div className={`accordion-item ${openAccordion === "Four" ? "show" : ""}`}>
                      <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          onClick={() => handleAccordionClick("Four")}
                          aria-expanded={openAccordion === "Four" ? "true" : "false"}
                        >
                          Comprehensive Course Catalog
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseFour"
                        className={`accordion-collapse collapse ${openAccordion === "Four" ? "show" : ""}`}
                        aria-labelledby="panelsStayOpen-headingFour"
                      >
                        <div className="accordion-body">
                          Choose from a comprehensive catalog of courses, spanning various
                          disciplines and catering to diverse interests and skill levels
                        </div>
                      </div>
                    </div>
                    <div className={`accordion-item ${openAccordion === "Five" ? "show" : ""}`}>
                      <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          onClick={() => handleAccordionClick("Five")}
                          aria-expanded={openAccordion === "Five" ? "true" : "false"}
                        >
                          Career Development Resources
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseFive"
                        className={`accordion-collapse collapse ${openAccordion === "Five" ? "show" : ""}`}
                        aria-labelledby="panelsStayOpen-headingFive"
                      >
                        <div className="accordion-body">
                          Access resources designed to enhance your career development,
                          including resume-building workshops and networking
                          opportunities.
                        </div>
                      </div>
                    </div>
                    <div className={`accordion-item ${openAccordion === "Six" ? "show" : ""}`}>
                      <h2 className="accordion-header" id="panelsStayOpen-headingSix">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          onClick={() => handleAccordionClick("Six")}
                          aria-expanded={openAccordion === "Six" ? "true" : "false"}
                        >
                          Supportive Learning Community
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseSix"
                        className={`accordion-collapse collapse ${openAccordion === "Six" ? "show" : ""}`}
                        aria-labelledby="panelsStayOpen-headingSix"
                      >
                        <div className="accordion-body">
                          Become part of a supportive learning community where
                          collaboration, mentorship, and shared insights contribute to
                          your academic success.
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/signin">
                    <button className="first-button mt-4 mb-4">Register Now</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 empty-col">

            </div>
          </div>
        </div>
      </section>
      {/* advantage end */}

      <section className="values py-5">
        <div className="value-overlay">
          <div className="container">
            <div className="row g-5">
              <div className="col-md-4 pseudo">
                <img src={Angle1} alt="angle-img" className="img-fluid img1" />
                <img src={Angle2} alt="angle-2" className="img-fluid img2" />
                <div className="card company-card">
                  <div className="mission-content">
                    <div className="icon-box">
                      <i className="fas fa-bullseye"></i>
                      <h2>Our Mission</h2>
                      <p>Empower through innovative and collaborative learning experiences, connecting educators and learners globally.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 pseudo">
                <img src={Angle1} alt="angle-img" className="img-fluid img1" />
                <img src={Angle2} alt="angle-2" className="img-fluid img2" />
                <div className="card company-card">
                  <div className="mission-content">
                    <div className="icon-box">
                      <RemoveRedEyeIcon className="vision-icon" />
                      <h2>Our Vision</h2>
                      <p>Revolutionize online education, transcending boundaries and making learning accessible, engaging, and transformative worldwide.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 pseudo">
                <img src={Angle1} alt="angle-img" className="img-fluid img1" />
                <img src={Angle2} alt="angle-2" className="img-fluid img2" />
                <div className="card company-card">
                  <div className="mission-content">
                    <div className="icon-box">
                      <Diversity2Icon className="values-icon" />
                      <h3>Core Values</h3>
                      <p>Celebrating unique perspectives and fostering an inclusive and supportive learning environment. On a mission to make learning accessible!</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>




      {/* about cards start */}

      {/* about cards end */}
      <StudentSay />
    </div>
  );
}
