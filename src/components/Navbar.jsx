import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mentorsLogo from "../img/mentors-logo.png";

const Navbar = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)

  const navRef = useRef(null)
  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNavbarCollapsed(true)
      }
    }
    document.addEventListener("click",handleClick)
    return ()=>{
      document.removeEventListener("click",handleClick)
    }
  },[])


  const location = useLocation();
  if (
    location.pathname === "/" ||
    location.pathname === "/adminpanel" ||
    location.pathname === "/adminpanel/dashboard" ||
    location.pathname === "/adminpanel/course" ||
    location.pathname === "/adminpanel/teacher" ||
    location.pathname === "/adminpanel/school" ||
    location.pathname === "/adminpanel/courseenroll" ||
    location.pathname === "/adminpanel/category" ||
    location.pathname === "/adminpanel/acceptedRequest" ||
    location.pathname === "/adminpanel/rejectedRequest" ||
    location.pathname === "/adminpanel/rejectedTeacher" ||
    location.pathname === "/adminpanel/teacherRequest" ||
    location.pathname === "/adminpanel/schoolRequest" ||
    location.pathname === "/adminpanel/rejectedSchool" ||
    location.pathname === "/enrollCourses" ||
    location.pathname === "/studentcourse" ||
    location.pathname === "/schoolUser/registerdSchools" ||
    location.pathname === "/schoolUser/registerSchool" ||
    location.pathname === "/instructorUser/instructorRequest" ||
    location.pathname === "/instructorUser/instructorDetail" ||
    location.pathname === "/adminpanel/users" ||
    location.pathname === "/adminpane/users"

  ) {
    return;
  }
  const checkActive = (link) => {
    return location.pathname === link ? "active" : ""
  }
  const handleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed)
  }
  const navbarCollapse = () => {
    if (window.innerWidth <= 768) {
      setIsNavbarCollapsed(true)
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg px-4" ref={navRef}>
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
            aria-expanded={!isNavbarCollapsed}
            onClick={handleNavbar}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarCollapsed ? "" : "show"}`} id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/" onClick={navbarCollapse}>
                  Home
                </Link>
              </li>
              <li className="nav-item" >
                <Link className={`nav-link ${checkActive("/about")}`} to="/about" onClick={navbarCollapse}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${checkActive("/course")}`} to="/course" onClick={navbarCollapse}>
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${checkActive("/teacher")}`} to="/teacher" onClick={navbarCollapse}>
                  Teacher
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${checkActive("/school")}`} to="/school" onClick={navbarCollapse}>
                  School
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${checkActive("/signin")}`} to="/signin" onClick={navbarCollapse}>
                  Signup/Login
                </Link>
              </li>
            </ul>
            <div className="d-flex text-light align-items-center">

              <a href="https://www.facebook.com/MentorsAcademia" target="blank"> <i className="me-2 fab fa-facebook"></i></a>
              <a href="https://twitter.com/Mentorsacademia" target="blank"> <i className="me-2 fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/mentorsacademia/" target="blank"> <i className="me-2 fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/Mentorsacademia/" target="blank"> <i className="me-2 fab fa-linkedin"></i></a>
              <a href="https://www.youtube.com/@Mentorsacademia/" target="blank"> <i className="me-2 fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
