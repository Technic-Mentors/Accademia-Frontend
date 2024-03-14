import React, { useContext, useEffect } from "react";
import MyContext from "../contexts/Mycontexts";
import { Link } from "react-router-dom";
import mentorsLogo from "../img/mentors-logo.png";
import Hadeed from "../img/Hadeed img.avif";

const Usernav = () => {
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
    <div>
      <nav className="navbar navbar-expand-lg px-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={mentorsLogo} alt="" style={{ width: "170px" }} />{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/course">
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teacher">
                  Teacher
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/school">
                  School
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link" to="/studentcourse">
                  Kuch bhi
                </Link>
              </li> */}

              <li className="nav-item">
                <Link className="nav-link" to="/enrollCourses">
                  Enrolled Courses
                </Link>
              </li>
              
             
            </ul>
            <div className="d-flex text-light align-items-center">
            <li className="nav-item">
                
                <img
                src={Hadeed}
                alt=""
                className="img-fluid"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                style={{ borderRadius: "100px", height: "30px", marginTop: '10%' }}
              />
                
              </li>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile collapse menu */}

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
};

export default Usernav;
