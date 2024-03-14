import React, { useContext } from "react";
import MyContext from "../contexts/Mycontexts";
import Waiting from "../img/approval-wait.avif"

export default function SchoolRequest() {
    const { allSchool, allSchools } = useContext(MyContext)

    const AcceptRequest = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/acceptSchool/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        allSchools()
    }

    const RejectRequest = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/rejectSchool/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        allSchools()

    }


    const checkRequest = allSchool.filter(school => school.status === "Not Approved")

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
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allSchool && allSchool.filter(school => school.status === "Not Approved").map((school, index) => (
                                <tr key={index}>
                                    <td>{school.name}</td>
                                    <td>{school.city}</td>
                                    <td>{school.address}</td>
                                    <td>{school.status}</td>
                                    <td>
                                        <i className="fa fa-check mx-3" onClick={() => AcceptRequest(school._id)}></i>
                                        <i className="fas fa-times" onClick={() => RejectRequest(school._id)}></i>
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
                                <h2>No School Registration Request Found </h2>
                            </div>
                            <p>You will be able to see data here once a user tries to register their school with Mentors Academia. </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    }

}