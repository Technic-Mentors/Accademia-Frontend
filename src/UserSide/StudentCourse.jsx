import React, { useContext, useEffect, useState } from "react";
import MyContext from "../contexts/Mycontexts";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import courseEnroll from "../img/course-enrollment.avif";
import registerInstructor from "../img/instructor-register.avif";
import schoolRegister from "../img/school-register.avif";
import Usernav from "../components/Usernav";
import approvalWait from "../img/approval-wait.avif"
import FrontendDeveloper from "../img/front-end-developer-course.avif";

export default function StudentCourse() {
  const {
    setCourseId,
    getCourse,
    signUser,
    courseCategory,
    getCourseData,
    getCourseDataCat,
  } = useContext(MyContext);
  const [signName, setSignName] = useState([]);
  const [courseTitle, setCourseTitle] = useState([]);
  const [enroll, setEnroll] = useState({
    studentId: "",
    courseId: "",
    description: "",
  });
  const Enrollment = async (e) => {
    e.preventDefault();
    const userNameError = document.getElementById("userNameError")
    const userTitleError = document.getElementById("userTitleError")
    const userDescError = document.getElementById("userDescError")

    let errorHandle = false;

    const { courseId, studentId, description } = enroll;

    if(!studentId){
      userNameError.innerText = "Select course name please"
      errorHandle = true
    }else {
      userNameError.innerText = ""
    }
    if(!courseId){
      userTitleError.innerText = "Select Course title please"
      errorHandle = true
    } else {
      userTitleError.innerText = ""
    }
    if(errorHandle){
      return;
    }
    await fetch("https://accademia-backend.vercel.app/api/auth/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId, studentId, description }),
    });
    setEnroll({
      studentId: "",
      courseId: "",
      description: "",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Enrollment request send successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const onchange = (e) => {
    setEnroll({ ...enroll, [e.target.name]: e.target.value });
  };

  const nameTitle = async () => {
    const res = await fetch(
      `https://accademia-backend.vercel.app/api/auth/nametitle/${signUser._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setSignName(data.signUpName);
    setCourseTitle(data.titleCourse);
  };

  useEffect(() => {
    nameTitle();
  });

  if(getCourseData.length===0){
    return <div>
      <Usernav />
      <section className="courses-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="course-head py-5 text-dark">
                <h1 className="text-center">Selected Course</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container request-approval">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-4">
                    <img src={approvalWait} alt="wait-for-approval" className="img-fluid wiat-img" />
                </div>
                <div className="col-md-8">
                    <div className="section-header">
                        <h2>Hmm..!! You Can Not Select Any Course From Course Page In WHich You Want To Enroll</h2>
                    </div>
                    <p>You will be able to see Course if you click on enroll button from course page click on enroll button in which course you want to enroll</p>
                </div>
            </div>

        </div>
    </div>
  }
  return (
    <div>
      <Usernav />
      <section className="courses-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="course-head py-5 text-dark">
                <h1 className="">{getCourseData.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container pb-3">
        {/* COURSE DETAIL CODE HERE */}

        <div>
          <section
            className="course-data py-5"
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <div className="container">
              <div className="row g-5">
                <div className="col-md-9">
                  <div className="overview bg-white p-3 mb-4">
                    <h2>Course Overview</h2>
                    <p>{getCourseData.description}</p>
                  </div>

                  <div
                    className="course-img"
                    style={{
                      backgroundImage: getCourseData.image
                        ? `url(${getCourseData.image})`
                        : `url(${FrontendDeveloper})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      className="course-overlay"
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                      <div className="duration px-4 py-7">
                        <h6
                          className="mb-3"
                          style={{
                            backgroundColor: "#fff",
                            display: "inline-block",
                            padding: "3px",
                          }}
                        >
                          {getCourseData.duration}
                        </h6>
                        <h2
                          style={{
                            width: "10%",
                            color: "var(--secondary-color)",
                            fontSize: "300%",
                          }}
                        >
                          {getCourseDataCat.category}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="row d-flex justify-content-center g-5 mt-3">
                    <div className="col-md-5 listing">
                      <div className="learning-outcomes">
                        <h3>Learning Outcomes:</h3>
                        <ul
                          style={{
                            lineHeight: "2.5rem",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {getCourseData.learning &&
                            getCourseData.learning
                              .split("\n")
                              .map((line, lineindex) => {
                                return (
                                  <li key={lineindex}>
                                    <CheckCircleIcon className="list-icon" />
                                    &nbsp;{line}
                                  </li>
                                );
                              })}
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-5 listing">
                      <div className="learning-outcomes">
                        <h3>Course Contents:</h3>
                        <ul
                          style={{
                            lineHeight: "2.5rem",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {getCourseData.content &&
                            getCourseData.content
                              .split("\n")
                              .map((line, lineindex) => {
                                return (
                                  <li key={lineindex}>
                                    <CheckCircleIcon className="list-icon" />
                                    &nbsp;{line}
                                  </li>
                                );
                              })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <section
                    className="mb-5 mt-5"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    <div className="container call-to-action">
                      <div className="cta-overlay">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="col-md-10 p-5 text-center">
                            <div className="section-header">
                              <h2 style={{ color: '#fff' }}>Want To Enroll In The Course?</h2>
                            </div>
                            <p className="mb-3 ">
                              Waste no time and be part of the best online learning platform!
                            </p>

                            <button
                              className="second-button text-light"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => setCourseId(getCourseData._id)}
                            >
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="col-md-3 course-cards c1">
                  <div className="card enroll-card">
                    <Link to="/signin">
                      <div className="enroll-content">
                        <img
                          src={courseEnroll}
                          alt="enroll-in-course"
                          className="img-fluid"
                        />
                        <h3>Want To Enroll In The Course?</h3>
                        <p>
                          Waste no time and be part of the best online learning
                          platform!
                        </p>
                        <button>Enroll Now</button>
                      </div>
                    </Link>
                  </div>

                  <div className="card enroll-card c2">
                    <Link to="/signin">
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
                    </Link>
                  </div>
                  <div className="card enroll-card c3">
                    <Link to="/signin">
                      <div className="enroll-content">
                        <img
                          src={schoolRegister}
                          alt=""
                          className="img-fluid"
                        />
                        <h3>Your School Needs Recognition!</h3>
                        <p>
                          Register your school on Mentors Academia and get
                          found!
                        </p>
                        <button>Register Your School</button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* view course */}
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Course Detail
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          Course Name : <h3>{getCourse.title}</h3>
          Course Duration : <h3>{getCourse.duration}</h3>
          Course Level : <h3>{getCourse.level}</h3>
          Course Detail : <p>{getCourse.description}</p>
        </div>
      </div>
      {/* course modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Enroll Course
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={Enrollment}>
                <select
                  className="form-control mt-3"
                  id="Name"
                  name="studentId"
                  value={enroll.studentId}
                  onChange={onchange}
                >
                  <option value="">Select Name</option>
                  <option value={signName._id}>{signName.name}</option>
                </select>
                <div id="userNameError" className="text-danger"></div>
                <select
                  className="form-control mt-3"
                  id="course Name"
                  name="courseId"
                  value={enroll.courseId}
                  onChange={onchange}
                >
                  <option value="">Select Course</option>
                  <option value={getCourse._id}>{getCourse.title}</option>
                </select>
                <div id="userTitleError" className="text-danger"></div>
                <textarea
                  className="form-control mt-3"
                  name="description"
                  value={enroll.description}
                  onChange={onchange}
                  type="text"
                  placeholder="Description"
                  rows={6}
                />
                <div id="userDescError" className="text-danger"></div>
                <button type="submit" className="btn btn-primary mt-3">
                  Enroll Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* course detail modal */}
      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static1"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Course Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container py-3">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="col-md-8">
                    <div
                      style={{
                        backgroundImage: getCourse.image
                          ? `url(${getCourse.image})`
                          : `url("/img/course-1.jpg")`,
                      }}
                    >
                      <div className="color-overlay">
                        <div className="py-7 px-5">
                          <h3
                            style={{
                              backgroundColor: "white",
                              display: "inline-block",
                            }}
                          >
                            {getCourse.duration}
                          </h3>
                          {courseCategory && (
                            <h1
                              style={{
                                width: "10%",
                                color: "rgba(246, 145, 51, 1)",
                              }}
                            >
                              {courseCategory.category}
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h2>Seats Are availables</h2>
                    <div className="card" style={{ height: "5rem" }}>
                      <div className="card-body">
                        <h5 className="card-title">{getCourse.duration}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row d-flex justify-content-center py-3"
                  style={{ backgroundColor: "#f7e7e9" }}
                >
                  <div className="col-md-8">
                    <h1>About Us</h1>
                    <p>{getCourse.description}</p>
                  </div>
                </div>
                <div className="row py-3">
                  <div className="col-md-6">
                    <h1>Course Content</h1>
                    <ul>
                      {getCourse.content &&
                        getCourse.content.split("\n").map((line, lineIndex) => (
                          <li
                            key={lineIndex}
                            style={{
                              listStyle: "initial",
                              fontSize: "20px",
                              lineHeight: "2rem",
                            }}
                          >
                            {line}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h1>What you'll learn</h1>
                    <ul>
                      {getCourse.content &&
                        getCourse.content.split("\n").map((line, lineIndex) => (
                          <li
                            key={lineIndex}
                            style={{
                              listStyle: "initial",
                              fontSize: "20px",
                              lineHeight: "2rem",
                            }}
                          >
                            {line}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
