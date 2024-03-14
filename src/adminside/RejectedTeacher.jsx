import React, { useContext } from "react";
import MyContext from "../contexts/Mycontexts";
import Waiting from "../img/approval-wait.avif"

export default function ReajectedTeacher() {
    const { allTeacher } = useContext(MyContext)


    const checkRequest = allTeacher.filter(teacher => teacher.status === "Rejected")

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
                            </tr>
                        </thead>
                        <tbody>
                            {allTeacher && allTeacher.filter(teacher => teacher.status === "Rejected").map((teacher, index) => (
                                <tr key={index}>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.number}</td>
                                    <td>{teacher.status}</td>
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
                                <h2>Great, No Instructor Rejected Yet!</h2>
                            </div>
                            <p>This module will show the rejected requests soon after you reject an instructor registration request.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }


}