import React, { useContext } from "react";
import MyContext from "../contexts/Mycontexts";
import { Link, Outlet } from "react-router-dom";
import whiteLogo from "../img/mentors-logo-white.png";
import Hadeed from "../img/Hadeed img.avif";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';


export default function StudentPage() {
  const { signUser } = useContext(MyContext);
  return (
    <div className="profile-position">
      {/* dashboard look */}

      <div className="bg-success row py-1 d-flex admin-nav align-items-center justify-content-between">
        <div className="col-md-9 mx-2">
          <img src={whiteLogo} alt="" style={{ width: "150px" }} />{" "}
        </div>
        <div className="col-md-2 d-flex justify-content-end mx-2">
          <div className="profile d-flex align-items-center">
            <div className="ad-img">
              <img
                src={Hadeed}
                alt=""
                className="img-fluid"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                style={{ borderRadius: "100px", height: "50px" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* dashboard look */}
      {/* User details */}

      {/* User details */}
      {/* All Users Start*/}
      <div className="container-fluid py-3">
        <div className="row">
          <div
            className="col-md-2  list-class bg-admin"
            style={{ lineHeight: "3rem", }}
          >
            <Link to="enrollCourses">
              {" "}
              <div className="text-light dashboard-nav-items"><LockOpenIcon style={{fontSize: '24px'}}/>&nbsp;Enrolled Courses</div>
                
              
            </Link>
            <Link to="studentcourse">
              {" "}
              <div className="text-light dashboard-nav-items"><PlayLessonIcon style={{fontSize: '24px'}}/>&nbsp;
                Course
                </div>
              
            </Link>
          </div>
          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
      {/* All Users End*/}

      {/*  */}
      <div className="container-fluid">
        <div className="row d-flex justify-content-end">
          <div className="col-md-2">
            <div className="collapse profile-set" id="collapseExample">
              <div className="card card-body">
                <h6 className="text-center">{signUser.name}</h6>
                <div className="d-flex justify-content-center">
                  <h3 className="text-center">{signUser.name.charAt(0)}</h3>
                </div>
                <p className="text-center">{signUser.number}</p>
                <h5 className="text-cenetr">{signUser.email}</h5>
                <Link to="/signin">Log Out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
