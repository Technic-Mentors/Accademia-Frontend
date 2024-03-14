import React, { useContext, useEffect, useState } from 'react'
import School from '../img/register-your-school.avif'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import courseEnroll from '../img/course-enrollment.avif'
import frontendDeveloper from '../img/front-end-developer-course.avif'
import schoolRegister from '../img/school-register.avif'
import { useParams, Link } from 'react-router-dom';
import MyContext from '../contexts/Mycontexts';

function Schooldetail() {
    const { allSchool } = useContext(MyContext)
    const [getSchool, setGetSchool] = useState([])
    const [schoolName, setSchoolName] = useState("")
    const { name } = useParams()
    let formattedName = name.replace(/-/g, ' ')

    // get course name
    const CourseDetail = async () => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getschol/${formattedName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setGetSchool(data)
            })
    }
    // get course name
    const CourseDetal = async () => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getschol/${schoolName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setGetSchool(data)
            })
    }
    useEffect(() => {
        CourseDetail()
        CourseDetal()
    }, [schoolName, formattedName])

    const relatedCourse = allSchool && allSchool.filter(school => school.name !== getSchool.name).filter(school => school.city === getSchool.city)
    return (
        <div>
            <section className='courses-bg'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="course-head py-5 text-dark">
                                <h1 className="">{getSchool.name}</h1>
                                <p>{getSchool.detail && getSchool.detail.slice(0, 200)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="school-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mt-5 mb-4">
                                <img src={getSchool.image ? getSchool.image : School} alt="school-img" className="img-fluidn schol-img" style={{ width: '100%' }} />
                            </div>
                            <div className="row mb-4 d-flex justify-content-center align-items-center">
                                <div className="col-md-6 mt-3">
                                    <div className="card school-detail-card" style={{ height: "100%" }}>
                                        <div className="contact-card">
                                            <div className="contact-meta">
                                                <p><AlternateEmailIcon className='school-icon' />&nbsp;{getSchool.email}</p>
                                                <p><LocationCityIcon className='school-icon' />&nbsp;{getSchool.city}</p>
                                                <p><CategoryIcon className='school-icon' />&nbsp;{getSchool.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="card school-detail-card" style={{ height: "100%" }}>
                                        <div className="contact-card">
                                            <div className="contact-meta">
                                                <p><PhoneIphoneIcon className='school-icon' />&nbsp;Focal Person/ Principal Contact: {getSchool.fpNumber}</p>
                                                <p><LocalPhoneIcon className='school-icon' />&nbsp;School Contact: {getSchool.number}</p>
                                                <p><LocationOnIcon className='school-icon' />&nbsp;{getSchool.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="school-description bg-white p-3">
                                <p>{getSchool.detail}</p>
                            </div>
                        </div>

                        <div className="col-md-3 course-cards c1 mt-5">
                            <div className="card enroll-card">
                                <Link to='/signin'>
                                    <div className="enroll-content">
                                        <img src={courseEnroll} alt="enroll-in-course" className="img-fluid" />
                                        <h3>Want To Enroll In The Course?</h3>
                                        <p>Waste no time and be part of the best online learning platform!</p>
                                        <button>Enroll Now</button>
                                    </div>
                                </Link>
                            </div>


                            <div className="card enroll-card c3">
                                <Link to='/signin'>
                                    <div className="enroll-content">
                                        <img src={schoolRegister} alt="" className="img-fluid" />
                                        <h3>Your School Needs Recognition!</h3>
                                        <p>Register your school on Mentors Academia and get found!</p>
                                        <button>Register Your School</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {relatedCourse.length > 0 ? <div className="container mt-3">
                <div className="row">
                    <h1>Other Schools From {getSchool.city}</h1>
                    {allSchool && allSchool.filter(school => school.name !== getSchool.name).filter(school => school.city === getSchool.city).map((school) => {
                        return <div className="col-md-3 mt-4" key={School._id}>
                            <Link to={`/school-details/${school.name.replace(/ /g, '-')}`} onClick={() => setSchoolName(school.name)}>  <div className="card school-card">
                                <div className="school-img">
                                    <img src={school.image ? school.image : frontendDeveloper} alt="" className="img-fluid" style={{ width: "100%", height: "150px" }} />
                                </div>
                                <div className="school-content">
                                    <h3>{school.name && school.name.length > 20 ? school.name.slice(0, 20) + "..." : school.name}</h3>
                                    <p><b>Address:</b>&nbsp;{School.address && School.address.length > 30 ? School.address.slice(0, 30) + "..." : school.address}</p>
                                    <p><b>Contact:</b>&nbsp;{school.number}</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    })}

                </div>
            </div> :""}
            
        </div>
    )
}

export default Schooldetail
