import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/Mycontexts";
import defaultTeacher from "../img/teacher-default.avif";

export default function TeacherPage() {
  const [searchName, setSearchName] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const { allTeacher } = useContext(MyContext);
  return (
    <div>
      {/* {/ header start /} */}
      <section>
        <div className="head-bg">
          <div className="head-overlay">
            <h1 className="text-center text-white py-7">Teachers</h1>
          </div>
        </div>
      </section>
      {/* {/ header end /} */}

      <div className="container-xxl py-4 bg-white">
        <div className="container">
          <div className="section-header text-center">
            <h6 className=" text-center text-primary px-3">Meet Our</h6>
            <h2 className="mb-4">Expert Instructors</h2>
          </div>
          <div className="container mb-4">
            <div className="row find d-flex justify-content-between">
              <div className="col-md-4 mt-4">
                <input
                  type="text"
                  className="form-control schoo-search"
                  placeholder="Search By Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="col-md-4 mt-4">
                <input
                  type="text"
                  className="form-control schoo-search"
                  placeholder="Search By Email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row g-4">
            {allTeacher &&
              allTeacher
                .filter((teacher) => teacher.status === "Approved").filter(teacher => teacher.name.toLowerCase().includes(searchName.toLowerCase())).filter(teacher =>  teacher.email.toLowerCase().includes(searchEmail.toLowerCase()))
                .map((teacher) => {
                  return (
                    <div
                      className="col-lg-3 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="team-item bg-light">
                        <div className="overflow-hidden">
                          <img
                            className="img-fluid teachr-img"
                            src={teacher.image ? teacher.image : defaultTeacher}
                            alt="team-members"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div
                          className="position-relative d-flex justify-content-center"
                          style={{ marginTop: "-23px" }}
                        >
                          <div className="bg-light d-flex justify-content-center pt-2 px-1 teacher-social">
                            <a
                              className="btn btn-sm-square  mx-1"
                              href={teacher.fbUrl}
                              target="blank"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                              className="btn btn-sm-square  mx-1"
                              href={teacher.twitterUrl}
                              target="blank"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a
                              className="btn btn-sm-square  mx-1"
                              href={teacher.instaUrl}
                              target="blank"
                            >
                              <i className="fab fa-instagram"></i>
                            </a>
                          </div>
                        </div>
                        <div className="text-center py-4">
                          <h5 className="mb-0">{teacher.name}</h5>
                          <p className="mb-0">({teacher.experties})</p>
                          <small>{teacher.email}</small>
                        </div>
                        <div className="pb-3 text-center" style={{ textDecoration: '' }}>
                          <Link to={`/teacher-details/${teacher._id}`}>
                            <span style={{ fontWeight: '500', color: 'var(--secondary-color)' }}>View Details <span>&rarr;</span></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
