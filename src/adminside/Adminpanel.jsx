import React from "react";
import { Link, Outlet } from "react-router-dom";
import whiteLogo from "../img/logo.png"
import PersonIcon from '@mui/icons-material/Person';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';


export default function Adminpanel() {
  return (
    <div>
      <div className="container-fluid bg-success">
        <div className=" row py-2 d-flex admin-nav align-items-center justify-content-between">
          <div className="col-md-9 col-7">
            <img src={whiteLogo} alt="" style={{ width: "150px" }} />{" "}
          </div>
          <div className="col-md-2 col-4 d-flex justify-content-end" >
            <Link to="/signin">
              <button className="btn btn-outline-light text-white">Log Out</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row d-flex justify-content-between">

          <div className="col-md-2 list-class bg-admin" style={{ lineHeight: "3rem" }}>
            <Link to="dashboard">
              {" "}
              <div className="text-light dashboard-nav-items mt-5 "><SpaceDashboardIcon style={{ fontSize: '24px' }} />&nbsp;Dashboard</div>
            </Link>



            <Link to="users">
              {" "}
              <div className="text-light dashboard-nav-items"><PersonIcon style={{ fontSize: '24px' }} />&nbsp;Users</div>{" "}
            </Link>


            <p><PlayLessonIcon className="text-light" style={{ fontSize: '24px' }} />
              <a
                className="text-light dashboard-nav-items"
                data-bs-toggle="collapse"
                href="#courses"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Courses
              </a>

            </p>
            <div className="collapse show" id="courses">
              <ul>
                <li><Link to="category">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    Courses Category
                  </div>{" "}
                </Link></li>

                <li><Link to="course">
                  {" "}
                  <div className="text-light dashboard-nav-items">Add Courses</div>{" "}
                </Link></li>

                <li> <Link to="courseenroll">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    Course Enrollment
                  </div>{" "}
                </Link></li>

                <li><Link to="acceptedRequest">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    Accepted Requests
                  </div>{" "}
                </Link></li>


                <li><Link to="rejectedRequest">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    Rejected Requests
                  </div>{" "}
                </Link></li>
              </ul>
            </div>

            <p><HowToRegIcon className="text-light" style={{ fontSize: '24px' }} />
              <a
                className="text-light dashboard-nav-items"
                data-bs-toggle="collapse"
                href="#teachers"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample1"
              >
                Teachers
              </a>

            </p>
            <div className="collapse show" id="teachers">
              <ul>


                <li><Link to="teacher">
                  {" "}
                  <div className="text-light dashboard-nav-items">Add Teachers</div>{" "}
                </Link></li>



                <li><Link to="teacherRequest">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    Instructor Request
                  </div>{" "}
                </Link></li>
                <li><Link to="rejectedTeacher">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    Rejected Instructor
                  </div>{" "}
                </Link></li>



              </ul>
            </div>



            <p><ApartmentIcon className="text-light" style={{ fontSize: '24px' }} />
              <a
                className="text-light dashboard-nav-items"
                data-bs-toggle="collapse"
                href="#schools"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample2"
              >
                Schools
              </a>

            </p>

            <div className="collapse show" id="schools">
              <ul>


                <li><Link to="school">
                  {" "}
                  <div className="text-light dashboard-nav-items">Add Schools</div>{" "}
                </Link></li>



                <li><Link to="schoolRequest">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    School Request
                  </div>{" "}
                </Link></li>
                <li><Link to="rejectedSchool">
                  {" "}
                  <div className="text-light dashboard-nav-items">
                    Rejected Schools
                  </div>{" "}
                </Link></li>



              </ul>
            </div>







          </div>
          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
