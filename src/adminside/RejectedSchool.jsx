import React, { useContext } from "react";
import MyContext from "../contexts/Mycontexts";
import Waiting from "../img/approval-wait.avif"

export default function RejectedSchool() {
    const { allSchool } = useContext(MyContext)


    const checkRequest = allSchool.filter(school => school.status === "Rejected")

    if (checkRequest.length > 0) {
        return (
            <div className="mt-3">
                <div className="table-container" style={{ overflowX: "auto" }}>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allSchool && allSchool.filter(school => school.status === "Rejected").map((school, index) => (
                                <tr key={index}>
                                    <td>{school.name}</td>
                                    <td>{school.city}</td>
                                    <td>{school.address}</td>
                                    <td>{school.status}</td>
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
                                <h2>Wow! No School Rejected!!</h2>
                            </div>
                            <p>You will be able to see the rejected schools requests when you turn down a registration request.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }


}