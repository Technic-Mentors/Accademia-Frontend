import React, { useContext, useEffect } from "react";
import MyContext from "../contexts/Mycontexts";
import { Link, Outlet } from "react-router-dom";
import Hadeed from "../img/Hadeed img.avif";
import whiteLogo from "../img/logo.png"
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function SchoolUser() {
  const { signUser } = useContext(MyContext);

  useEffect(() => {
    const onHandleClick = (e) => {
      const collapseElement = document.getElementById("collapseExample")
      if (collapseElement && !collapseElement.contains(e.target)) {
        collapseElement.classList.remove("show")
      }
    }
    document.body.addEventListener("click", onHandleClick)

    return (() => {
      document.body.removeEventListener("click", onHandleClick)
    })
  }, [])
  return (
    <div className="profile-position">
      {/* dashboard look */}
      <div className="container-fluid">
        <div className="bg-success row py-2 d-flex admin-nav align-items-center justify-content-between">
          <div className="col-md-9 col-7">
            <img src={whiteLogo} alt="" style={{ width: "150px" }} />{" "}
          </div>
          <div className="col-md-2 col-3 d-flex justify-content-end">
            <div className="profile d-flex align-items-center">
              <div className="ad-img">
                <img
                  src={Hadeed}
                  alt=""
                  className="img-fluid mx-3"
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
      </div>
      {/* dashboard look */}
      {/* User details */}

      {/* User details */}
      {/* All Users Start*/}
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-2 list-class bg-admin"
            style={{ lineHeight: "3rem",minHeight:"100vh" }}
          >
            <Link to="registerSchool">
              <div className="dashboard-nav-items text-light"> <DomainAddIcon style={{ fontSize: '24px' }} />&nbsp;Add Your School</div>
            </Link>
            <Link to="registerdSchools">
              <div className="dashboard-nav-items text-light"><RemoveRedEyeIcon style={{ fontSize: '24px' }} />&nbsp;
                View Your Schools
              </div>
            </Link>
          </div>
          <div className="col-md-10 py-3">
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
