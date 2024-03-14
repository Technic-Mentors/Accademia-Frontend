import React from "react";
import { Link, useLocation } from "react-router-dom";


const Footer = () => {
    const location = useLocation();
    if (

        location.pathname === "/adminpanel" ||
        location.pathname === "/adminpanel/dashboard" ||
        location.pathname === "/adminpanel/users" ||
        location.pathname === "/adminpanel/course" ||
        location.pathname === "/adminpanel/teacher" ||
        location.pathname === "/adminpanel/school" ||
        location.pathname === "/adminpanel/courseenroll" ||
        location.pathname === "/adminpanel/category" ||
        location.pathname === "/adminpanel/acceptedRequest" ||
        location.pathname === "/adminpanel/rejectedRequest" ||
        location.pathname === "/adminpanel/teacherRequest" ||
        location.pathname === "/adminpanel/schoolRequest" ||
        location.pathname === "/adminpanel/rejectedTeacher" ||
        location.pathname === "/adminpanel/rejectedSchool" ||
        location.pathname === "/studentpage/enrollCourses" ||
        location.pathname === "/studentpage/studentcourse" ||
    location.pathname === "/schoolUser/registerdSchools" ||
    location.pathname === "/schoolUser/registerSchool" ||
        location.pathname === "/instructorUser/instructorRequest" ||
        location.pathname === "/instructorUser/instructorDetail" ||
        location.pathname === "/adminpane/users"

    ) {
        return;
    }
    return (
        <div className="">
            <div className="site-footer">
                <hr style={{ color: '#fff', transform: 'translateX(130px)', width: '80%' }} />
                <div className="container py-3">
                    <div className="row d-flex justify-content-between footer-text">
                        <div className="col-md-4">
                            <h1 className="text-white">Mentors Academia</h1>
                            <p className="text-white">The Mentor Academy is a world-class and freely available online mentor training course. It was spearheaded by the team with guidance from a global Academic Council. To empower every learner with the skills and training they need to become impactful mentors and leaders.</p>
                        </div>
                        <div className="col-md-2 footer-link">
                            <h1 className="text-white">Links</h1>
                            <div >
                                <i className="fa fa-chevron-right me-2"></i>
                                <Link to="/">Home</Link>
                            </div>
                            <div >
                                <i className="fa fa-chevron-right me-2"></i>
                                <Link to="/about">About</Link>
                            </div>
                            <div >
                                <i className="fa fa-chevron-right me-2"></i>
                                <Link to="/course">Course</Link>
                            </div>
                            <div >
                                <i className="fa fa-chevron-right me-2"></i>
                                <Link to="/teacher">Teacher</Link>
                            </div>
                            <div >
                                <i className="fa fa-chevron-right me-2"></i>
                                <Link to="/school">School</Link>
                            </div>
                            <div >
                                <i className="fa fa-chevron-right me-2"></i>
                                <Link to="/signup">Signup/Login</Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h1 className="text-white">Contact</h1>
                            <div className="d-flex">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                <h2 style={{ fontFamily: "'poppins', sans-serif", fontSize: "13px", fontWeight: "normal" }}>148 Mumtaz Market Opposite to ChaseUp,<br /> GT Road Gujranwala</h2>
                            </div>
                            <div className="d-flex mt-2">
                                <i className="fa fa-envelope me-2"></i>
                                <h2 style={{ fontFamily: "'poppins', sans-serif", fontSize: "13px", fontWeight: "normal" }}>info@technicmentors.com</h2>
                            </div>
                            <div className="d-flex mt-2">
                                <i className="fa fa-phone me-2"></i>
                                <h2 style={{ fontFamily: "'poppins', sans-serif", fontSize: "13px", fontWeight: "normal" }}>+923 111 122 144</h2>
                            </div>
                            <h1 className="text-white mt-1">Follow Us</h1>
                            <div className="social">
                                <div>
                                    <a
                                        href="https://www.facebook.com/MentorsAcademia"
                                        target="blank"
                                        style={{marginLeft:"0"}}
                                    >
                                        <i className="fab fa-facebook-f text-white"></i>
                                    </a>
                                    <a
                                        href="https://twitter.com/Mentorsacademia"
                                        target="blank"
                                    >
                                        <i className="fab fa-twitter text-white"></i>
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@MentorsAcademia"
                                        target="blank"
                                    >
                                        <i className="fab fa-youtube text-white"></i>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/Mentorsacademia/"
                                        target="blank"
                                    >
                                        <i className="fab fa-linkedin-in text-white"></i>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/mentorsacademia/"
                                        target="blank"
                                    >
                                        <i className="fab fa-instagram text-white"></i>
                                    </a>
                                    <a
                                        href="https://wa.me/923111122144"
                                        target="blank"
                                    >
                                        <i className="fab fa-whatsapp text-white"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="
                    footer-border"></div>
                    <div className="footer-develop">
                        <h2 style={{ fontFamily: "'poppins', sans-serif", fontSize: "13px", fontWeight: "normal" }}>© 2023 All Rights Reserved. Designed With Love By <a href="https://technicmentors.com" target="blank"> Technic Mentors</a></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer; 