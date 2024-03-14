import React, { useState } from "react"
import Swal from "sweetalert2";

export default function Adddddcourse() {
    const [course, setCourse] = useState({
        title: "",
        duration: "",
        level: "",
        description: "",
        image: ""
    })
    // add course
    const addCourse = async (e) => {
        e.preventDefault()
        const { title, duration, level, description, image } = course
        console.log(title,duration,description)
        const titleError = document.getElementById("titleError")
        const durationError = document.getElementById("durationError")
        const levelError = document.getElementById("levelError")
        const descriptionError = document.getElementById("descriptionError")
        let emptyFieldError = false
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
        if (emptyFieldError) {
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("duration", duration);
        formData.append("level", level);
        formData.append("description", description);
        formData.append("image", image);

        const res = await fetch("https://accademia-backend.vercel.app/api/auth/addcourse", {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        console.log(data)
        if (!res.ok) {
            console.log(`Error: ${res.status} - ${res.statusText}`);
        }

        setCourse({
            title: "",
            duration: "",
            level: "",
            description: "",
            image:""
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


    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus"></i> Add Course</button>
                </div>

            </div>

            {/* course modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addCourse}>
                                <div id="error" className="text-danger text-center"></div>
                                <input className="form-control" type="text" placeholder="Course Title" name="title" value={course.title} onChange={onchange} />
                                <div id="titleError" className="text-danger"></div>
                                <input className="form-control mt-3" type="text" placeholder="Course Duration" name="duration" value={course.duration} onChange={onchange} />
                                <div id="durationError" className="text-danger"></div>
                                <input className="form-control mt-3" type="file" placeholder="Image" name="image" onChange={onchange} />
                                <select className="form-control mt-3" id="course level" name="level" value={course.level} onChange={onchange}>
                                    <option value="">Select Course Level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                                <div id="levelError" className="text-danger"></div>
                                <textarea className="form-control mt-3" cols="30" rows="10" placeholder="Course Description" name="description" value={course.description} onChange={onchange}></textarea>
                                <div id="descriptionError" className="text-danger"></div>
                                <button type="submit" className="btn btn-primary mt-3 text-center">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}