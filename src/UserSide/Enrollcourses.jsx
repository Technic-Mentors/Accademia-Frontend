import React, { useContext, useEffect, useState } from "react";
import MyContext from "../contexts/Mycontexts";
import Usernav from "../components/Usernav";
import approvalWait from '../img/approval-wait.avif'

export default function EnrollCourses() {
    const { signUser } = useContext(MyContext)
    const [enrollCourse, setEnrollCourse] = useState([])
    const [checkNotEnrol, setCheckNotEnrol] = useState(false)
    const [checkNotApprov, setCheckNotApprov] = useState(false)
    const EnrollCourse = async () => {
        const res = await fetch(`https://accademia-backend.vercel.app/api/auth/getenrol/${signUser._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        if (data.message === "Not found any enroll course") {
            setCheckNotEnrol("Not found any enroll course")
        }
        if (Array.isArray(data) && data.length > 0 && 'message' in data[0]) {
            setCheckNotApprov(data[0].message);
        }
        setEnrollCourse(data)

    }

    useEffect(() => {
        EnrollCourse()
    }, [])

    const truncateText = (text, limit) => {
        const words = text.split(' ')
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...'
        }
        return text;
    }
    if (checkNotEnrol) {
        return <div>
            <Usernav />
            <section className="courses-bg">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="course-head py-5 text-dark text-center">
                                <h1 className="">Enrolled Courses</h1>
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
                            <h2>Hmm..!! You Can See Your Erollment Course After Sending Request For Course Enrollment</h2>
                        </div>
                        <p>You will be able to see your details as soon as you send Your request!</p>
                    </div>
                </div>

            </div>
        </div>
    }
    if (checkNotApprov) {
        return <div>
            <Usernav />
            <section className="courses-bg">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="course-head py-5 text-dark text-center">
                                <h1 className="">Enrolled Courses</h1>
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
                            <h2>Hmm..!! You Can See Your Enrolled Course Once You're Approved By Admin</h2>
                        </div>
                        <p>You will be able to see your enrolled course as soon as your request to join the platform is accepted by the admin. Please keep in touch!</p>
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
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="course-head py-5 text-dark text-center">
                                <h1 className="">Enrolled Courses</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">

                    {Array.isArray(enrollCourse) && enrollCourse.map((status, index) => (
                        <div className="col-md-4 py-3" key={index}>
                            {status.course && (
                                <div className="card courses">
                                    <div className="course-content">
                                        <img
                                            className="img-fluid user-side-course-img"
                                            src={status.image ? status.image : "/img/course-1.jpg"}
                                            alt=""
                                        />
                                        <div className="">
                                            <h3 className="card-title course-title mt-3">{status.course.title}</h3>
                                            <hr style={{ width: '80%' }} />
                                            <h6 className="card-subtitle mb-2 text-muted">({status.course.duration})</h6>
                                            {/* {/ <p className="card-text">{truncateText(status.course.description, 55)}</p> /} */}
                                        </div></div>

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}