import React, { useContext, useEffect, useState } from "react";
import MyContext from "../contexts/Mycontexts";
import { Link, Outlet } from "react-router-dom";
import whiteLogo from "../img/logo.png";
import Hadeed from "../img/Hadeed img.avif";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';


export default function Instructor() {
    const { signUser } = useContext(MyContext)

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

        <div className="profile-position" >
            <div className="container-fluid">
            <div className="bg-success row py-2 d-flex admin-nav align-items-center justify-content-between">
                <div className="col-md-9 col-7">
                    <img src={whiteLogo} alt="" style={{ width: "150px" }} />{" "}
                </div>
                <div className="col-md-2 col-3 d-flex justify-content-end ">
                    <div className="profile d-flex align-items-center">
                        <div className="ad-img">

                            <img
                                src={Hadeed}
                                alt=""
                                className="img-fluid mx-3"
                                data-bs-toggle="collapse"
                                href="#collapseExample"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                                style={{ borderRadius: "100px", height: "50px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* detail start*/}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 py-4 bg-admin" style={{minHeight:"100vh"}}>
                        <Link to="instructorRequest">
                            <div className="dashboard-nav-items text-light mb-4">
                                <HowToRegIcon style={{ fontSize: '24px' }} />&nbsp;Register As Instructor
                            </div>
                        </Link>
                        <Link to="instructorDetail">

                            <div className="dashboard-nav-items text-light" style={{ fontWeight: '500' }}>
                                <DisplaySettingsIcon style={{ fontSize: '24px' }} />&nbsp;View Your Details
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-10 py-3">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* detail End*/}

            {/*  */}
            <div className="container-fluid">
                <div className="row d-flex justify-content-end">
                    <div className="col-md-2">
                        <div className="collapse profile-set"
                            id="collapseExample"
                        >
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
    )
}