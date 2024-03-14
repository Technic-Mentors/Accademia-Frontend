import React, { useEffect, useState } from "react";
import Waiting from "../img/approval-wait.avif"

export default function RejectedRequest() {
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



    const checkRequest = request.filter(course => course.status === "N")

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
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {request && request.filter(request => request.status === "N").map((request, index) => (
                                <tr key={index}>
                                    <td>{request.studentId.name}</td>
                                    <td>{request.courseId.title}</td>
                                    <td>{request.description}</td>
                                    <td>{"Rejected"}</td>
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
                                <h2>You Are Yet To Reject A Course Enrollment Request </h2>
                            </div>
                            <p>You will be able to see the rejected requests when you approve course enrollment request.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }


}