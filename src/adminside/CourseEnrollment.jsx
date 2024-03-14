import React, { useEffect, useState } from "react";
import Waiting from "../img/approval-wait.avif"
export default function CourseEnrollment() {
    const [request, setRequest] = useState([])
    const EnrolRequests = async () => {
        const res = await fetch("https://accademia-backend.vercel.app/api/auth/enrlRequests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setRequest(data)
    }
    useEffect(() => {
        EnrolRequests()
    }, [])

    const AcceptRequest = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/acceptStatus/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        EnrolRequests()
    }
    const RejectRequest = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/rejectStatus/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        EnrolRequests()
    }

    const checkRequest = request.filter(course => course.status === "A")

    if (checkRequest.length > 0) {
        return (
            <div className="mt-3">
                <div className="table-container" style={{ overflowX: "auto" }}>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Title</th>
                                <th scope="col">Request</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {request.filter(request => request.status === "A").map((request, index) => (
                                <tr key={index}>
                                    <td>{request.studentId.name}</td>
                                    <td>{request.courseId.title}</td>
                                    <td>{request.description}</td>
                                    <td>
                                        <i className="fa fa-check me-2" onClick={() => AcceptRequest(request._id)}></i>
                                        <i className="fas fa-times" onClick={() => RejectRequest(request._id)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else {
        return <section className='wait'>
            <div className="wait-overlay">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4">
                            <img src={Waiting} alt="wait-for-approval" className="img-fluid" />
                        </div>
                        <div className="col-md-8">
                            <div className="section-header">
                                <h2>No Course Enrollment Requests Found</h2>
                            </div>
                            <p>You will be able to see the requests when a user tries to enroll in a specific course.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
}