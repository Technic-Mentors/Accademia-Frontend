import React, { useEffect, useState } from "react";
import MyContext from "./Mycontexts";

const MyProvider = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem("signUser") || "{}");
    const [signUser, setSignUser] = useState(storedUser);
    const [allCourse, setAllCourse] = useState([])
    const [courseCategory, setCourseCategory] = useState([])
    const [allTeacher, setAllTeacher] = useState([])
    const [allSchool, setAllSchool] = useState([])
    const [AllCategory, setAllCategory] = useState([])
    const [SchoolId, setSchoolId] = useState("")
    const [courseId, setCourseId] = useState("")
    const [courseDataId, setCourseDataId] = useState("")
    const [teacherId, setTeacherId] = useState("")
    const [getCourse, setGetCourse] = useState([])
    const [getCourseData, setGetCourseData] = useState([])
    const [getSchool, setGetSchool] = useState([])
    const [video, setVideo] = useState([])
    const [getCourseCat, setGetCourseCat] = useState([])
    const [getCourseDataCat, setGetCourseDataCat] = useState([])
    const [getTeacher, setGetTeacher] = useState([])

    useEffect(() => {
        localStorage.setItem("signUser", JSON.stringify(signUser))
    }, [signUser])

    // get all courses
    const allCourses = async () => {
        await fetch("https://accademia-backend.vercel.app/api/auth/getAllCourses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setAllCourse(data.allCourses)
                setCourseCategory(data.onlyCategory)
            })
    }
    // get course id
    const CourseId = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getcourse/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setGetCourseCat(data.categoryy)
                setGetCourse(data.courseId)
            })
    }
    // get course id
    const CourseData = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getcourse/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setGetCourseDataCat(data.categoryy)
                setGetCourseData(data.courseId)
            })
    }
    // get all Teachers
    const allTeachers = async () => {
        await fetch("https://accademia-backend.vercel.app/api/auth/getAllTeachers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setAllTeacher(data))
    }
    // get Teacher id
    const TeachrId = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getTeacher/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setGetTeacher(data))
    }

    // get all Schools
    const allSchools = async () => {
        await fetch("https://accademia-backend.vercel.app/api/auth/getAllSchools", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setAllSchool(data))
    }
    // get School id
    const schoolId = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getSchool/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setGetSchool(data))
    }
    //  get videos
    const getLectures = async () => {
        const res = await fetch("https://accademia-backend.vercel.app/api/auth/getVideo", {
            method: "GET"
        })
        const data = await res.json()
        setVideo(data)
    }
    // get all courses
    const allCategory = async () => {
        await fetch("https://accademia-backend.vercel.app/api/auth/getcategory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setAllCategory(data))
    }
    useEffect(() => {
        allCourses()
        allTeachers()
        allSchools()
        getLectures()
        allCategory()
        CourseId(courseId)
        TeachrId(teacherId)
        schoolId(SchoolId)
        CourseData(courseDataId)
    }, [courseId, teacherId, SchoolId, courseDataId])

    return (
        <MyContext.Provider value={{ signUser, setSignUser, allCourse, courseCategory, allTeacher, getCourse, getCourseData, getCourseCat, getCourseDataCat, setCourseId, setTeacherId, getTeacher, allCourses, allSchool, allSchools, setSchoolId, getSchool, allTeachers, video, getLectures, setCourseDataId,AllCategory,allCategory }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider;