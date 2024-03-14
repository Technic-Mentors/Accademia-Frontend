import React, { useContext, useEffect, useState } from "react";
import MyContext from "../contexts/Mycontexts";
import Swal from "sweetalert2";
import approvalWait from '../img/approval-wait.avif'

export default function InstructorAproved() {
    const { signUser, allCourses, video, getLectures, allTeachers } = useContext(MyContext)
    const [techerApprove, setTeacherApprove] = useState([])
    const [EditTeacher, setEditTeacher] = useState([])
    const [category, setCategory] = useState([])
    const [checCourse, setChecCourse] = useState()
    const [checCategory, setChecCategory] = useState()
    const [EditCourse, setEditCourse] = useState([])
    const [editVideo, setEditVideo] = useState([])
    const [pdfB, setPdfb] = useState({
        title: "",
        name: "",
        video: "",
    });
    const [course, setCourse] = useState({
        title: "",
        duration: "",
        level: "",
        description: "",
        image: "",
        categoryId: "",
        content: "",
        learning: ""
    })

    // Instructor Course Data Start
    // add course
    const addCourse = async (e) => {
        e.preventDefault()
        const { title, duration, level, description, image, categoryId, content, learning } = course

        const titleError = document.getElementById("titleError")
        const categoryError = document.getElementById("categoryError")
        const durationError = document.getElementById("durationError")
        const levelError = document.getElementById("levelError")
        const descriptionError = document.getElementById("descriptionError")
        const learningError = document.getElementById("learningError")
        const contentError = document.getElementById("contentError")
        let emptyFieldError = false
        if (!category) {
            categoryError.innerText = "please enter category"
            emptyFieldError = true
        } else {
            categoryError.innerText = ""
        }
        if (!title) {
            titleError.innerText = "please enter title"
            emptyFieldError = true
        } else {
            titleError.innerText = ""
        }
        if (!duration) {
            durationError.innerText = "please enter duration"
            emptyFieldError = true
        } else {
            durationError.innerText = ""
        }
        if (!level) {
            levelError.innerText = "please confirm level"
            emptyFieldError = true
        } else {
            levelError.innerText = ""
        }
        if (!description) {
            descriptionError.innerText = "please add description"
            emptyFieldError = true
        } else {
            descriptionError.innerText = ""
        }
        if (!learning) {
            learningError.innerText = "please add learning outcome"
            emptyFieldError = true
        } else {
            learningError.innerText = ""
        }
        if (!content) {
            contentError.innerText = "please add course content"
            emptyFieldError = true
        } else {
            contentError.innerText = ""
        }
        if (emptyFieldError) {
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("duration", duration);
        formData.append("level", level);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("categoryId", categoryId);
        formData.append("learning", learning);
        formData.append("content", content);
        formData.append("userId", signUser._id);

        await fetch("https://accademia-backend.vercel.app/api/auth/addcourse", {
            method: "POST",
            body: formData
        })
        setCourse({
            title: "",
            duration: "",
            level: "",
            description: "",
            image: "",
            categoryId: "",
            learning: "",
            content: ""
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Course has been created",
            showConfirmButton: false,
            timer: 1500
        });

    }

    const onchange = (e) => {
        if (e.target.files) {
            setCourse({ ...course, image: e.target.files[0] }); // Update only the 'image' property
        } else {
            setCourse({ ...course, [e.target.name]: e.target.value });
        }
    };

    // delete Teacher
    const deleteTeacher = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your request has been deleted successfully",
                    icon: "success",
                });
            }
            return result;
        });

        if (isConfirmed) {
            await fetch(`https://accademia-backend.vercel.app/api/auth/deleteTeacher/${id}`, {
                method: "delete"
            })
            ApprovedTeacher()
        }
    }
    const getOnlyCategory = async () => {
        const res = await fetch("https://accademia-backend.vercel.app/api/auth/getOnlyCategory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setCategory(data)
    }

    const ApprovedTeacher = async () => {
        const res = await fetch(`https://accademia-backend.vercel.app/api/auth/checkteacher/${signUser._id}`, {
            method: "GET"
        })
        const data = await res.json()
        setTeacherApprove(data)
    }

    // edit Teacher data
    const editTeacher = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getTeacher/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setEditTeacher(data)
            })
    }

    const updateTeacher = async (e) => {
        e.preventDefault()
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });

        if (isConfirmed) {
            const { name, number, qualification, experience, image, description, website, youtube, instaUrl, fbUrl, twitterUrl, experties } = EditTeacher

            const formData = new FormData();
            formData.append("name", name);
            formData.append("qualification", qualification);
            formData.append("experience", experience);
            formData.append("image", image);
            formData.append("number", number);
            formData.append("experties", experties);
            formData.append("description", description);
            formData.append("website", website);
            formData.append("youtube", youtube);
            formData.append("fbUrl", fbUrl);
            formData.append("instaUrl", instaUrl);
            formData.append("twitterUrl", twitterUrl);


            const res = await fetch(`https://accademia-backend.vercel.app/api/auth/updateTeacher/${EditTeacher._id}`, {
                method: "PUT",
                body: formData
            })
            const data = await res.json()
            console.log(data)
            Swal.fire("Saved!", "", "success");
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
        allTeachers()
    }

    const onchnge = (e) => {
        if (e.target.name === 'number') {
            if (!/^\d*$/.test(e.target.value)) {
                setEditTeacher((School) => ({ ...School, [e.target.name]: e.target.value.replace(/\D/g, '') }));
                return;
            }
        }
        if (e.target.files) {
            setEditTeacher({ ...EditTeacher, image: e.target.files[0] })
        } else {
            setEditTeacher({ ...EditTeacher, [e.target.name]: e.target.value })
        }
    }

    // edit course data
    const editCourse = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getcourse/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setEditCourse(data.courseId)
            })
    }

    const updateCourse = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });

        if (isConfirmed) {
            const { title, duration, level, description, categoryId, learning, content, image } = EditCourse
            const formData = new FormData();
            formData.append("title", title);
            formData.append("duration", duration);
            formData.append("level", level);
            formData.append("description", description);
            formData.append("categoryId", categoryId);
            formData.append("learning", learning);
            formData.append("content", content);
            formData.append("image", image);
            await fetch(`https://accademia-backend.vercel.app/api/auth/updatecourse/${EditCourse._id}`, {
                method: "PUT",
                body: formData
            })
            Swal.fire("Saved!", "", "success");
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
        allCourses()
    }

    const onchge = (e) => {
        if (e.target.files) {
            setEditCourse({ ...EditCourse, image: e.target.files[0] });
        } else {
            setEditCourse({ ...EditCourse, [e.target.name]: e.target.value });
        }
    };
    const checkCourse = async () => {
        const res = await fetch(`https://accademia-backend.vercel.app/api/auth/checkCourse/${signUser._id}`, {
            method: "GET",
        })
        const data = await res.json()
        setChecCategory(data.categoryy)
        setChecCourse(data.courseId)
    }

    const addPdf = async (e) => {
        e.preventDefault()
        const { title, video } = pdfB
        const formData = new FormData()
        formData.append("title", title)
        formData.append("name", signUser.name)
        formData.append("video", video)
        formData.append("userId", signUser._id)

        await fetch("https://accademia-backend.vercel.app/api/auth/addVideo", {
            method: "POST",
            body: formData
        })
        setPdfb({
            title: "",
            video: "",
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Video lectures uploaded successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const bookChange = (e) => {
        if (e.target.files) {
            setPdfb({ ...pdfB, video: e.target.files[0] })
        } else {
            setPdfb({ ...pdfB, [e.target.name]: e.target.value })
        }
    }
    const edtVideo = async (id) => {
        const res = await fetch(`https://accademia-backend.vercel.app/api/auth/getVideo/${id}`, {
            method: "GET"
        })
        const data = await res.json()
        setEditVideo(data)
    }

    const updateVideo = async (e) => {
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });

        if (isConfirmed) {
            const { title, video } = editVideo
            const formData = new FormData();
            formData.append("title", title);
            formData.append("video", video);

            const res = await fetch(`https://accademia-backend.vercel.app/api/auth/updateVideo/${editVideo._id}`, {
                method: "PUT",
                body: formData
            })
            const data = await res.json()
            console.log(data)
            Swal.fire("Saved!", "", "success");
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
        getLectures()
    }

    const videoChange = (e) => {
        if (e.target.files) {
            setEditVideo({ ...editVideo, video: e.target.files[0] })
        } else {
            setEditVideo({ ...editVideo, [e.target.name]: e.target.value })
        }
    }
    useEffect(() => {
        checkCourse()
        getOnlyCategory()
        ApprovedTeacher()
    }, [])

    const noRequest = techerApprove.length === 0
    const notApproved = techerApprove.filter(teacher => teacher.userId === signUser._id && teacher.status === "Not Approved" || teacher.status === "Rejected")
    const Approved = techerApprove.filter(teacher => teacher.userId === signUser._id && teacher.status === "Approved")
    if (noRequest) {
        return <div className="container request-approval">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-4">
                    <img src={approvalWait} alt="wait-for-approval" className="img-fluid wiat-img" />
                </div>
                <div className="col-md-8">
                    <div className="section-header">
                        <h2>Hmm..!! You Can See Your Details After Sending Request</h2>
                    </div>
                    <p>You will be able to see your details as soon as you send Your request!</p>
                </div>
            </div>

        </div>
    } else if (notApproved.length > 0) {
        return <div>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {techerApprove.map((teacher) => {

                        return <tr>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.number}</td>
                            <td>{teacher.status}</td>
                            <td>
                                <i className="fa fa-trash" onClick={() => deleteTeacher(teacher._id)}></i>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    } else if (Approved.length > 0) {
        return <div>
            <div className="container">
                <div className="row d-flex">
                    <div className="col-md-6">
                        <div className="section-header pt-3">
                            <h2>Welcome To The Platform!</h2>
                        </div>
                    </div>
                    <div className="col-md-6 py-3">
                        <div className="inst-buttons d-flex justify-content-end">
                            <div className="d-flex justify-content-end" style={{ marginRight: '15px' }}>
                                <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus"></i> Add Course</button>
                            </div>

                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#staticBook"><i className="fas fa-plus"></i> Add Videos</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-container" style={{ overflowX: "auto" }}>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {techerApprove && techerApprove.filter(teacher => teacher.status === "Approved").map((teacher) => {

                            return <tr>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.number}</td>
                                <td>{teacher.status}</td>
                                <td> <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => editTeacher(teacher._id)}></i></td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            {/* Edit Teacher modal */}
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Teacher</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={updateTeacher}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">Name</label>
                                            <input className="form-control" type="text" placeholder="Name" name="name" value={EditTeacher.name} onChange={onchnge} />
                                            <div id="nameError" className="text-danger"></div>
                                            <label htmlFor="experties" className="mt-3">Experties</label>
                                            <input className="form-control" type="text" placeholder="Experties" name="experties" value={EditTeacher.experties} onChange={onchnge} />
                                            <label htmlFor="number" className="mt-3">Contact Number</label>
                                            <input className="form-control" type="tel" placeholder="Number" name="number" value={EditTeacher.number} onChange={onchnge} />
                                            <div id="numberError" className="text-danger"></div>
                                            <label htmlFor="youtube" className="mt-3">Youtube Link</label>
                                            <input className="form-control" type="link" placeholder="Youtube Link" name="youtube" value={EditTeacher.youtube} onChange={onchnge} />
                                            <label htmlFor="experience" className="mt-3">Fb Profile Link</label>
                                            <input className="form-control" type="link" placeholder="Fb Profile Link" name="fbUrl" value={EditTeacher.fbUrl} onChange={onchnge} />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input className="form-control" type="email" placeholder="Email" name="email" value={EditTeacher.email} />
                                            <div id="emailError" className="text-danger"></div>
                                            <label htmlFor="website" className="mt-3">Website URL</label>
                                            <input className="form-control" type="text" placeholder="Website Url" name="website" value={EditTeacher.website} onChange={onchnge} />
                                            <label htmlFor="image" className="mt-3">Profile Image</label>
                                            <input className="form-control" type="file" placeholder="Website Url" name="image" onChange={onchnge} />
                                            <label htmlFor="experience" className="mt-3">Twitter Profile Link</label>
                                            <input className="form-control" type="link" placeholder="twitter Profile Link" name="twitterUrl" value={EditTeacher.twitterUrl} onChange={onchnge} />
                                            <label htmlFor="experience" className="mt-3">Insta Profile Link</label>
                                            <input className="form-control" type="link" placeholder="Insta Profile Link" name="instaUrl" value={EditTeacher.instaUrl} onChange={onchnge} />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="qualification" className="mt-3">Qualification</label>
                                            <textarea rows={10} className="form-control" type="text" placeholder="Qualifications" name="qualification" value={EditTeacher.qualification} onChange={onchnge} />
                                            <div id="qualiError" className="text-danger"></div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="experience" className="mt-3">Experience</label>
                                            <textarea rows={10} className="form-control" type="text" placeholder="Experience" name="experience" value={EditTeacher.experience} onChange={onchnge} />
                                            <div id="expeError" className="text-danger"></div>
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="description" className="mt-3">Description</label>
                                            <textarea className="form-control" name="description" id="" cols="30" rows="10" placeholder="Description" value={EditTeacher.description} onChange={onchnge}></textarea>
                                            <div id="descriptionError" className="text-danger"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary mt-3 px-3" onClick={updateTeacher}>Update teacher</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            <div className="section-header mt-3 mb-4 text-start">
                <h2 className="mx-2">Your Courses</h2>
            </div>
            <div className="table-container" style={{ overflowX: "auto" }}>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Level</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checCourse && checCourse.map((course, index) => {
                            return <tr>
                                <td>{course.title}</td>
                                <td>{course.duration}</td>
                                <td>{course.level}</td>
                                <td>
                                    <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" onClick={() => editCourse(course._id)}></i>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            {/* course modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container">
                            <div className="modal-body">
                                <form onSubmit={addCourse} encType="multipart/form-data">
                                    <div className="row">
                                        <div id="error" className="text-danger text-center"></div>
                                        <div className="col-md-12">
                                            <input className="form-control" type="text" placeholder="Course Title" name="title" value={course.title} onChange={onchange} />
                                            <div id="titleError" className="text-danger"></div>
                                        </div>
                                        <div className="col-md-6">
                                            <input className="form-control mt-3" type="text" placeholder="Course Duration" name="duration" value={course.duration} onChange={onchange} />
                                            <div id="durationError" className="text-danger"></div>
                                            <select className="form-control mt-3" id="course level" name="level" value={course.level} onChange={onchange}>
                                                <option value="">Select Course Level</option>
                                                <option value="beginner">Beginner</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="advanced">Advanced</option>
                                            </select>
                                            <div id="levelError" className="text-danger"></div>
                                        </div>
                                        <div className="col-md-6">
                                            <select className="form-control mt-3" id="course level" name="categoryId" value={course.categoryId} onChange={onchange}>
                                                <option value="">Select Category</option>
                                                {category && category.map((data) => {
                                                    return <option value={data._id}>{data.category}</option>
                                                })}
                                            </select>
                                            <div id="categoryError" className="text-danger"></div>
                                            <input className="form-control mt-3" type="file" placeholder="Image" name="image" onChange={onchange} />
                                        </div>
                                        <div className="col-md-6">
                                            <textarea className="form-control mt-3" cols="30" rows="10" placeholder="Learning Outcomes" name="learning" value={course.learning} onChange={onchange}></textarea>
                                            <div id="learningError" className="text-danger"></div>
                                        </div>
                                        <div className="col-md-6">
                                            <textarea className="form-control mt-3" cols="30" rows="10" placeholder="Course Contents" name="content" value={course.content} onChange={onchange}></textarea>
                                            <div id="contentError" className="text-danger"></div>
                                        </div>
                                        <div className="col-md-12">
                                            <textarea className="form-control mt-3" cols="30" rows="10" placeholder="Course Description" name="description" value={course.description} onChange={onchange}></textarea>
                                            <div id="descriptionError" className="text-danger"></div>
                                        </div>
                                        <div className="col-md-12 d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary mt-3 text-center px-4 py-2">Add Course</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit course modal */}
            <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="title" className="mt-3">Title</label>
                                        <input className="form-control" name="title" value={EditCourse.title} id="title" type="text" placeholder="Title" onChange={onchge} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="Duration" className="mt-3">Duration</label>
                                        <input className="form-control" name="duration" value={EditCourse.duration} id="Duration" type="text" placeholder="Duration" onChange={onchge} />
                                        <label htmlFor="level" className="mt-3">Course Level</label>
                                        <select className="form-control" name="level" value={EditCourse.level} type="text" id="level" placeholder="Level" onChange={onchge}>
                                            <option value="">Select Course Level</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="category" className="mt-3">Category</label>
                                        <select className="form-control" id="course level" name="categoryId" value={EditCourse.categoryId} onChange={onchge}>
                                            {category && category.map((data) => {
                                                return <option value={data._id}>{data.category}</option>
                                            })}
                                        </select>
                                        <label htmlFor="image" className="mt-3">Featured Image</label>
                                        <input className="form-control" type="file" placeholder="Image" name="image" onChange={onchge} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="role" className="mt-3">Learning Outcomes</label>
                                        <textarea name="learning" id="desc" cols="30" rows="10" className="form-control" value={EditCourse.learning} type="text" placeholder="role" onChange={onchge}></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="role" className="mt-3">Course Content</label>
                                        <textarea name="content" id="desc" cols="30" rows="10" className="form-control" value={EditCourse.content} type="text" placeholder="role" onChange={onchge}></textarea>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="role" className="mt-3">Course Description</label>
                                        <textarea name="description" id="desc" cols="30" rows="10" className="form-control" value={EditCourse.description} type="text" placeholder="role" onChange={onchge}></textarea>
                                    </div>

                                    <button type="button" className="btn btn-primary mt-3 text-center" onClick={updateCourse}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* pdf modal */}
            <div className="modal fade" id="staticBook" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container">
                            <div className="modal-body">
                                <form onSubmit={addPdf} >
                                    <div className="row">
                                        <input className="form-control" type="text" name="title" value={pdfB.title} onChange={bookChange} placeholder="Title" />

                                        <input className="form-control mt-3" type="text" name="name" value={signUser.name} onChange={bookChange} />


                                        <input className="form-control mt-3" type="file" name="video" accept="video/*" onChange={bookChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Add Video Lectures</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-header mt-4 mb-4">
                <h2 className="mx-2">Your Lectures</h2>
            </div>
            <div className="table-container col-md-12" style={{ overflowX: "auto" }}>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Video Url</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {video && video.filter(teacher => teacher.userId === signUser._id).map((teacher) => {
                            return <tr>
                                <td>{teacher.title}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.video}</td>
                                <td>
                                    <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop4" onClick={() => edtVideo(teacher._id)}></i>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            {/* {/ Edit video modal /} */}
            <div className="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="row">
                                    <label htmlFor="title">Title</label>
                                    <input className="form-control" type="text" name="title" value={editVideo.title} onChange={videoChange} placeholder="Title" />
                                    <label htmlFor="name" className="mt-3">Name</label>
                                    <input className="form-control" type="text" name="name" value={editVideo.name} readOnly />

                                    <label htmlFor="video" className="mt-3">Video</label>
                                    <input className="form-control" type="file" name="video" accept="video/*" onChange={videoChange} />
                                </div>
                                <button type="button" className="btn btn-primary mt-3" onClick={updateVideo}>Update Lectures</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }

}