import React, { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
import MyContext from "../contexts/Mycontexts";

export default function Addcourse() {
    const { allCourse, courseCategory, allCourses, getCourseCat, getCourse, setCourseId, AllCategory } = useContext(MyContext)
    const [EditCourse, setEditCourse] = useState([])
    const [category, setCategory] = useState([])
    const [searchOption, setSearchOption] = useState("")
    const [searchCategory, setSearchCategory] = useState("")
    const [pageNumber, setPageNumber] = useState(1)
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
    // add course
    const addCourse = async (e) => {
        e.preventDefault()
        const { title, duration, level, description, image, categoryId, content, learning } = course
        console.log(categoryId)
        const titleError = document.getElementById("titleError")
        const categoryError = document.getElementById("categoryError")
        const durationError = document.getElementById("durationError")
        const levelError = document.getElementById("levelError")
        const descriptionError = document.getElementById("descriptionError")
        const learningError = document.getElementById("learningError")
        const contentError = document.getElementById("contentError")
        let emptyFieldError = false
        if (!categoryId) {
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

        const res = await fetch("https://accademia-backend.vercel.app/api/auth/addcourse", {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        console.log(data)
        if (!res.ok) {
            console.log(`Error: ${res.status} - ${res.statusText}`);
        }
        allCourses()
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

    const removeError = () => {
        const titleError = document.getElementById("titleError")
        const categoryError = document.getElementById("categoryError")
        const durationError = document.getElementById("durationError")
        const levelError = document.getElementById("levelError")
        const descriptionError = document.getElementById("descriptionError")
        const learningError = document.getElementById("learningError")
        const contentError = document.getElementById("contentError")

        titleError.innerText = ""
        durationError.innerText = ""
        levelError.innerText = ""
        categoryError.innerText = ""
        descriptionError.innerText = ""
        learningError.innerText = ""
        contentError.innerText = ""
    }
    // delete course
    const deleteCourse = async (id) => {
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
                    text: "Your course has been deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });

        if (isConfirmed) {
            await fetch(`https://accademia-backend.vercel.app/api/auth/deletecourse/${id}`, {
                method: "delete"
            })
            allCourses()
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

    const onchnge = (e) => {
        if (e.target.files) {
            setEditCourse({ ...EditCourse, image: e.target.files[0] });
        } else {
            setEditCourse({ ...EditCourse, [e.target.name]: e.target.value });
        }
    };

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
    useEffect(() => {
        getOnlyCategory()
    }, [])

    // pagination implement 
    const coursePerPage = 16
    const lastCourseIndex = pageNumber * coursePerPage
    const firstCourseIndex = lastCourseIndex - coursePerPage
    const allCorse = allCourse && allCourse.filter(course => course.title.toLowerCase().includes(searchOption.toLowerCase())).filter(course => course.categoryId.includes(searchCategory)).slice(firstCourseIndex, lastCourseIndex)

    const paginate = (pageNmber) => {
        setPageNumber(pageNmber)
    }
    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="col-md-3 col-6 mt-2">
                    <input type="text" className="form-control" value={searchOption} onChange={(e) => setSearchOption(e.target.value)} placeholder="Search By Title" />
                </div>
                <div className="col-md-3 col-6 mt-2">
                    <select className="form-control" id="course level" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                        <option value="">Search By Category</option>
                        {AllCategory && AllCategory.map((course) => {
                            return <option value={course._id}>{course.category}</option>
                        })}
                    </select>
                </div>
                <div className="d-flex justify-content-end col-md-5 col-6 mt-2">
                    <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus"></i> Add Course</button>
                </div>
                <div className="col-md-11">
                    <div className="table-container" style={{ overflowX: "auto" }}>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCorse && allCorse.map((course, index) => {
                                    return <tr>
                                        <td>{course.title}</td>
                                        {courseCategory[index] && <td>{courseCategory[index].category}</td>}
                                        <td>{course.duration}</td>
                                        <td><i className="fa fa-eye me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => setCourseId(course._id)}></i>
                                            <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => editCourse(course._id)}></i>
                                            <i className="fa fa-trash" onClick={() => deleteCourse(course._id)}></i>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end my-3">
                        {[...Array(Math.ceil(allCourse.length / coursePerPage)).keys()].map((number) => {
                            return <button key={number + 1} className="btn btn-primary mx-1" onClick={() => paginate(number + 1)}>{number + 1}</button>
                        })}
                    </div>
                </div>
            </div>

            {/* {/ course modal /} */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={removeError}></button>
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
                                            <textarea className="form-control mt-3" cols="30" rows="10" placeholder="Learning Outcomes (Write one outcome per line)" name="learning" value={course.learning} onChange={onchange}></textarea>
                                            <div id="learningError" className="text-danger"></div>
                                        </div>
                                        <div className="col-md-6">
                                            <textarea className="form-control mt-3" cols="30" rows="10" placeholder="Course Contents (Write one content per line)" name="content" value={course.content} onChange={onchange}></textarea>
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
            {/* {/ view modal /} */}
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">View Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="title" className="mt-3">Title</label>
                                        <input className="form-control" value={getCourse.title} id="title" type="text" placeholder="Title" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="Duration" className="mt-3">Duration</label>
                                        <input className="form-control" value={getCourse.duration} id="Duration" type="text" placeholder="Duration" />
                                        <label htmlFor="level" className="mt-3">Course Level</label>
                                        <input className="form-control" value={getCourse.level} type="text" id="level" placeholder="Level" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="category" className="mt-3">Category</label>
                                        {getCourseCat && <input className="form-control" value={getCourseCat.category} id="title" type="text" placeholder="Category" />}
                                        <label htmlFor="category" className="mt-3">Image</label>
                                        <input className="form-control" value={getCourse.image} id="title" type="text" placeholder="Image" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="role" className="mt-3">Learning Outcomes</label>
                                        <textarea name="course description" id="desc" cols="30" rows="10" className="form-control" value={getCourse.learning} type="text" placeholder="role"></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="role" className="mt-3">Course Contents</label>
                                        <textarea name="course description" id="desc" cols="30" rows="10" className="form-control" value={getCourse.content} type="text" placeholder="role"></textarea>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="role" className="mt-3">Course Description</label>
                                        <textarea name="course description" id="desc" cols="30" rows="10" className="form-control" value={getCourse.description} type="text" placeholder="role"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* {/ Edit modal /} */}
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">View Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="title" className="mt-3">Title</label>
                                        <input className="form-control" name="title" value={EditCourse.title} id="title" type="text" placeholder="Title" onChange={onchnge} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="Duration" className="mt-3">Duration</label>
                                        <input className="form-control" name="duration" value={EditCourse.duration} id="Duration" type="text" placeholder="Duration" onChange={onchnge} />
                                        <label htmlFor="level" className="mt-3">Course Level</label>
                                        <select className="form-control" name="level" value={EditCourse.level} type="text" id="level" placeholder="Level" onChange={onchnge}>
                                            <option value="">Select Course Level</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="category" className="mt-3">Category</label>
                                        <select className="form-control" id="course level" name="categoryId" value={EditCourse.categoryId} onChange={onchnge}>
                                            {category && category.map((data) => {
                                                return <option value={data._id}>{data.category}</option>
                                            })}
                                        </select>
                                        <label htmlFor="image" className="mt-3">Featured Image</label>
                                        <input className="form-control" type="file" placeholder="Image" name="image" onChange={onchnge} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="role" className="mt-3">Learning Outcomes</label>
                                        <textarea name="learning" id="desc" cols="30" rows="10" className="form-control" value={EditCourse.learning} type="text" placeholder="role" onChange={onchnge}></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="role" className="mt-3">Course Content</label>
                                        <textarea name="content" id="desc" cols="30" rows="10" className="form-control" value={EditCourse.content} type="text" placeholder="role" onChange={onchnge}></textarea>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="role" className="mt-3">Course Description</label>
                                        <textarea name="description" id="desc" cols="30" rows="10" className="form-control" value={EditCourse.description} type="text" placeholder="role" onChange={onchnge}></textarea>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-primary mt-3 text-center" onClick={updateCourse}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}