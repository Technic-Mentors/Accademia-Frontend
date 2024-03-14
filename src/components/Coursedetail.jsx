import React, { useContext, useEffect, useState } from 'react'
import FrontendDeveloper from '../img/front-end-developer-course.avif'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import courseEnroll from '../img/course-enrollment.avif'
import registerInstructor from '../img/instructor-register.avif'
import schoolRegister from '../img/school-register.avif'
import { useParams, Link } from 'react-router-dom';
import MyContext from '../contexts/Mycontexts';
import frontendDeveloper from "../img/front-end-developer-course.avif";

function Coursedetail() {
    const { allCourse } = useContext(MyContext)
    const [Title, setTitle] = useState("")
    const [course, setCourse] = useState("")
    const [category, setCategory] = useState("")
    const { title } = useParams()
    const pureTitle = title.replace(/-/g, ' ')

    const getCourse = async () => {
        const res = await fetch(`https://accademia-backend.vercel.app/api/auth/getcorse/${Title}`, {
            method: "GET"
        })
        const data = await res.json()
        setCategory(data.categoryy)
        setCourse(data.courseTitle)
    }
    const getCorse = async () => {
        const res = await fetch(`https://accademia-backend.vercel.app/api/auth/getcorse/${pureTitle}`, {
            method: "GET"
        })
        const data = await res.json()
        setCategory(data.categoryy)
        setCourse(data.courseTitle)
    }
    useEffect(() => {
        getCourse()
        getCorse()
    }, [pureTitle, Title])
    return (
        <div style={{ backgroundColor: '#F9F9F9' }}>
            <section className='courses-bg'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="course-head py-5 text-dark">
                                <h1 className="">{course.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="course-data py-4">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-md-9">
                            <div className="overview bg-white p-3 mb-4">
                                <h2>Course Overview</h2>
                                <p style={{ fontWeight: "initial" }}>
                                    {course.description}
                                </p>
                            </div>

                            <div className="course-img" style={{ backgroundImage: course.image ? `url(${course.image})` : `url(${FrontendDeveloper})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <div className="course-overlay" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                    <div className="duration px-4 py-7">
                                        <h6 className='mb-3' style={{ backgroundColor: '#fff', display: 'inline-block', padding: '3px' }}>{course.duration}</h6>
                                        <h2 style={{ width: '10%', color: 'var(--secondary-color)', fontSize: '300%' }}>{category.category}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center">
                                <div className="col-md-5 listing mt-4">
                                    <div className="learning-outcomes py-2">
                                        <h3>Learning Outcomes:</h3>
                                        <ul style={{ lineHeight: '2.5rem', padding: 0, margin: 0 }}>
                                            {course.learning && course.learning.split('\n').map((line, lineindex) => {
                                                return <li key={lineindex}><CheckCircleIcon className='list-icon' />&nbsp;{line}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>


                                <div className="col-md-5 listing mt-4">
                                    <div className="learning-outcomes py-2">
                                        <h3>Course Contents:</h3>
                                        <ul style={{ lineHeight: '2.5rem', padding: 0, margin: 0 }}>
                                            {course.content && course.content.split('\n').map((line, lineindex) => {
                                                return <li key={lineindex}><CheckCircleIcon className='list-icon' />&nbsp;{line}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="col-md-3 course-cards c1">
                            <div className="card enroll-card">
                                <Link to="/signin">
                                    <div className="enroll-content">
                                        <img src={courseEnroll} alt="enroll-in-course" className="img-fluid" />
                                        <h3>Want To Enroll In The Course?</h3>
                                        <p>Waste no time and be part of the best online learning platform!</p>
                                        <button>Enroll Now</button>
                                    </div>
                                </Link>
                            </div>

                            <div className="card enroll-card c2">
                                <Link to='/signin'>
                                    <div className="enroll-content">
                                        <img src={registerInstructor} alt="register-as-instructor" className="img-fluid" />
                                        <h3>Join Today And Teach Globally!</h3>
                                        <p>Express your teaching skills in front of students at a bigger stage.</p>
                                        <button>Register Now</button>
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

            <div className="container">
                <div className="row">
                    <h1>People Also Search For</h1>
                    {allCourse && allCourse.filter(course => course.categoryId === category._id).map((course) => {
                        return <div className="col-md-3 py-3">
                            <Link to={`/course-details/${course.title.replace(/ /g, '-')}`} onClick={() => setTitle(course.title)}>  <div className="card courses">
                                <div className="course-content">
                                    <img src={course.image ? course.image : frontendDeveloper} alt="" className="img-fluid" style={{ height: "170px", width: "100%" }} />
                                </div>
                                <div className="course-title p-2 mt-2">
                                    <h3>{course.title.slice(0, 35) + "..."}</h3>
                                    <hr />
                                    <p>
                                        Duration: <b>{course.duration}</b>
                                    </p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Coursedetail
