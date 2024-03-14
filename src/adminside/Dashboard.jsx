import React, { useEffect, useState } from "react"
import PersonIcon from '@mui/icons-material/Person';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';

export default function Dashboard() {
    const [user, setUser] = useState([])
    const [course, setCourse] = useState([])
    const [teacher, setTeacher] = useState([])
    const [school, setSchool] = useState([])
// user
    const countUser = async ()=>{
        await fetch("https://accademia-backend.vercel.app/api/auth/countuser",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then(data => setUser(data))
    }
    // course
    const countCourse = async ()=>{
        await fetch("https://accademia-backend.vercel.app/api/auth/countcourse",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then(data => setCourse(data))
    }
    // teacher
    const countTeacher = async ()=>{
        await fetch("https://accademia-backend.vercel.app/api/auth/countteacher",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then(data => setTeacher(data))
    }
    // school
    const countSchool = async ()=>{
        await fetch("https://accademia-backend.vercel.app/api/auth/countschool",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then(data => setSchool(data))
    }
    useEffect(()=>{
        countCourse()
        countUser()
        countTeacher()
        countSchool()
    },[])
    return (
        <div>
            <div className="container-fluid mb-3">
                
                <div className="row d-flex justify-content-around">
                    <div className="col-md-2  mt-3 bg-light dash-card" > 
                    <PersonIcon className="dash-icons ic1" />
                    <p>{user.count}</p>
                    <h4> Registered Users</h4> 
                    </div>
                    <div className="col-md-2  mt-3 bg-light dash-card" >
                    <HowToRegIcon className="dash-icons ic2" /> 
                    <p>{teacher.count}</p>
                    <h4> Registered Teachers </h4> 
                    </div>
                    <div className="col-md-2  mt-3 bg-light dash-card" >
                        <ApartmentIcon className="dash-icons ic3" /> 
                    <p>{school.count}</p>
                    <h4> Registered Schools</h4> 
                    </div>
                    <div className="col-md-2 mt-3 bg-light dash-card" >
                        < PlayLessonIcon className="dash-icons ic4" />
                    <p>{course.count}</p>
                    <h4> Added Courses</h4> 
                    
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}