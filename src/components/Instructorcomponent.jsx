import React, { useContext } from "react";
import MyContext from "../contexts/Mycontexts";
import { Link } from "react-router-dom";
import teacherDefault from '../img/teacher-default.avif'

function Instructorcomponent() {
  const { allTeacher } = useContext(MyContext)
  return (
    <div>
      <div className="container-xxl py-4 bg-white">
        <div className="container">
          <div className="section-header text-center">
            <h6 className=" text-center px-3">
              Meet Our
            </h6>
            <h2 className="mb-4">Expert Instructors</h2>
          </div>
          <div className="row g-4">
            {allTeacher && allTeacher.filter(teacher => teacher.status === "Approved").slice(-4).map((teacher) => {
              return <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
                key={teacher._id}
              >
              <Link to={`/teacher-details/${teacher._id}`}>  <div className="team-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid expert-img" src={teacher.image ? teacher.image : teacherDefault} alt="team-members" style={{width: '100%'}}/>
                  </div>
                  <div
                    className="position-relative d-flex justify-content-center"
                    style={{ marginTop: "-23px" }}
                  >
                    <div className="d-flex justify-content-center pt-2 px-1 teacher-social">
                      <a className="btn btn-sm-square mx-1" href={teacher.fbUrl}>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="btn btn-sm-square mx-1" href={teacher.twitterUrl}>
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="btn btn-sm-square mx-1" href={teacher.instaUrl}>
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                  <div className="text-center p-4 teacehr-data">
                    <h5 className="mb-0">{teacher.name}</h5>
                    <small>{teacher.email}</small>
                  </div>
                </div>
                </Link>
              </div>
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructorcomponent;
