import React, { useContext, useEffect, useState } from "react";
import Instructor from "../img/teacher-default.avif";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import frontendDeveloper from "../img/front-end-developer-course.avif";
import Slider from "react-slick";
import registerInstructor from "../img/instructor-register.avif";
import schoolRegister from "../img/school-register.avif";
import { Link, useParams } from "react-router-dom";
import MyContext from "../contexts/Mycontexts";

function Teacherdetails() {
  const { video, allCourse } = useContext(MyContext);
  const [teachrDetail, setTeachrDetail] = useState([]);
  const { id } = useParams();
  const teacherDetail = async () => {
    const res = await fetch(
      `https://accademia-backend.vercel.app/api/auth/getteacher/${id}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setTeachrDetail(data);
  };
  useEffect(() => {
    teacherDetail();
  }, []);
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section className="courses-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="course-head py-5 text-dark">
                <h1 className="">Instructor Details</h1>
                <p>
                  {teachrDetail.description &&
                    teachrDetail.description.slice(0, 200)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="instructor-details py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h4
                className="inst-name mb-2"
                style={{ textDecoration: "underline" }}
              >
                {teachrDetail.name}
              </h4>
              <p
                className="inst-name mb-3"
              >
                {teachrDetail.experties}
              </p>
              {/* {/ {/ <p>Front End Web Development Lead Instructor</p> /} /} */}
              <hr />
              <div className="inst-content inst-profile">
                <img
                  src={teachrDetail.image ? teachrDetail.image : Instructor}
                  alt="istructor-img"
                  className="img-fluid teacher-img"
                />
                <div
                  className="inst-info"
                  style={{ flexDirection: "column" }}
                >
                  <div>
                    <EmailIcon className="inst-icon" />
                    &nbsp;{teachrDetail.email}
                  </div>
                  <div>
                    <YouTubeIcon className="inst-icon" />
                    &nbsp;
                    <a
                      href={teachrDetail.youtube}
                      rel="noreferrer"
                      target="_blank"
                      style={{overflow:"hidden"}}
                    >
                      https://www.youtube.com/@mentorsacademia
                    </a>
                  </div>
                  <div>
                    <LanguageIcon className="inst-icon" />
                    &nbsp;
                    <a
                      href={teachrDetail.website}
                      rel="noreferrer"
                      target="_blank"
                    >
                      https://capobrain.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="row mt-4 d-flex justify-content-center align-items-center">
                <div className="col-md-12">
                  <div>
                    <div className="contact-card">
                      <div className="contact-meta">
                        <h5>Description</h5>
                        <p style={{ fontWeight: "initial" }}>{teachrDetail.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5 d-flex justify-content-between">
                <div className="col-md-5 d-flex align-items-center mt-4">
                  <div className="card school-detail-card" style={{ height: "100%", width: "100%" }}>
                    <div className="contact-card">
                      <div className="contact-meta">
                        <h5>Experience</h5>
                        <p>{teachrDetail.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-center mt-4">
                  <div className="card school-detail-card" style={{ height: "100%", width: "100%" }}>
                    <div className="contact-card">
                      <div className="contact-meta">
                        <h5>Qualification</h5>
                        <p>{teachrDetail.qualification}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <h4 className="mb-4">Videos</h4>
                  <Slider {...settings}>
                    {video &&
                      video
                        .filter((teacher) => teacher.userId === teachrDetail.userId)
                        .map((teacher) => {
                          return (
                            <div className="col-md-3" key={teacher._id}>
                              <div className="card video-card">
                                <video width="100%" height="200" controls>
                                  <source src={teacher.video} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                                <div className="video-content text-center">
                                  <h6 className="video-title mt-3">
                                    {teacher.title}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </Slider>
                </div>
              </div>
              <div className="container pt-4">
                <div className="row">
                  <h4>Courses</h4>
                  {allCourse && allCourse.filter(course => course.userId === teachrDetail.userId).map((course) => {
                    return <div className="col-md-4">
                      <Link to={`/course-details/${course.title.replace(/ /g, '-')}`}>  <div className="card courses">
                        <div className="course-content">
                          <img src={course.image ? course.image : frontendDeveloper} alt="" className="img-fluid" style={{ height: "170px", width: "100%" }} />
                        </div>
                        <div className="course-title p-2 mt-2">
                          <h3>{course.title.slice(0, 35) + "..."}</h3>
                          <hr />
                          <p>
                            Duration: <b>{course.duration}</b>
                          </p>
                        </div>
                      </div>
                      </Link>
                    </div>
                  })}
                </div>
              </div>

            </div>

            <div className="col-md-3 course-cards c1 mt-4">
              <div className="card enroll-card c2">
                <div className="enroll-content">
                  <img
                    src={registerInstructor}
                    alt="register-as-instructor"
                    className="img-fluid"
                  />
                  <h3>Join Today And Teach Globally!</h3>
                  <p>
                    Express your teaching skills in front of students at a
                    bigger stage.
                  </p>
                  <button>Register Now</button>
                </div>
              </div>
              <div className="card enroll-card c3">
                <div className="enroll-content">
                  <img src={schoolRegister} alt="" className="img-fluid" />
                  <h3>Your School Needs Recognition!</h3>
                  <p>Register your school on Mentors Academia and get found!</p>
                  <button>Register Your School</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Teacherdetails;
