import React, { useContext } from "react";
import MyContext from "../contexts/Mycontexts";
import Waiting from "../img/approval-wait.avif"

export default function TeacherRequest() {
    const { allTeacher, allTeachers } = useContext(MyContext)

    const AcceptRequest = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/acceptTeacher/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        allTeachers()
    }

    const RejectRequest = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/rejectTeacher/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        allTeachers()
    }


    const checkRequest = allTeacher.filter(teacher => teacher.status === "Not Approved")

    if (checkRequest.length > 0) {
        return (
            <div className="mt-3">
                <div className="table-container" style={{ overflowX: "auto" }}>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Number</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTeacher && allTeacher.filter(teacher => teacher.status === "Not Approved").map((teacher, index) => (
                                <tr key={index}>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.number}</td>
                                    <td>{"Pending"}</td>
                                    <td>
                                        <i className="fa fa-check mx-3" onClick={() => AcceptRequest(teacher._id)}></i>
                                        <i className="fas fa-times" onClick={() => RejectRequest(teacher._id)}></i>
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
                                <h2>No Instructor Request Is Found </h2>
                            </div>
                            <p>You will start seeing the data here when an instructor sends a registration request.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }

}