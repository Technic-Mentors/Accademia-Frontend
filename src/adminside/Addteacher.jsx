import React, { useContext, useState } from "react"
import Swal from "sweetalert2"
import MyContext from "../contexts/Mycontexts"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Addteacher() {
    const { signUser, allTeacher, allTeachers, setTeacherId, getTeacher } = useContext(MyContext)

    const [EditTeacher, setEditTeacher] = useState([])
    const [pageNmber, setPageNumber] = useState(1)
    const [searchOption, setSearchOption] = useState("")
    const [Teacher, setTeacher] = useState({
        name: "",
        email: "",
        number: "",
        qualification: "",
        experience: "",
        description: "",
        image: "",
        website: "",
        youtube: "",
        instaUrl: "",
        fbUrl: "",
        twitterUrl: "",
        experties: ""
    })
    // add Teacher
    const addTeacher = async (e) => {
        e.preventDefault()
        const { name, email, number, qualification, experience, description, image, website, youtube, instaUrl, fbUrl, twitterUrl, experties } = Teacher

        const nameError = document.getElementById("nameError")
        const emailError = document.getElementById("emailError")
        const numberError = document.getElementById("numberError")
        const expertiesError = document.getElementById("expertiesError")
        const qualiError = document.getElementById("qualiError")
        const expeError = document.getElementById("expeError")
        const descriptionError = document.getElementById("descriptionError")
        let emptyFieldError = false
        if (!name) {
            nameError.innerText = "please enter name"
            emptyFieldError = true
        } else {
            nameError.innerText = ""
        }
        if (!email) {
            emailError.innerText = "please enter email"
            emptyFieldError = true
        } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.innerText = "Please enter a valid email address";
            emptyFieldError = true;
        } else {
            emailError.innerText = ""
        }
        if (!number) {
            numberError.innerText = "please enter number"
            emptyFieldError = true
        } else {
            numberError.innerText = ""
        }
        if (!qualification) {
            qualiError.innerText = "please add qualification"
            emptyFieldError = true
        } else {
            qualiError.innerText = ""
        }
        if (!experience) {
            expeError.innerText = "please add experience"
            emptyFieldError = true
        } else {
            expeError.innerText = ""
        }
        if (!experties) {
            expertiesError.innerText = "please add experties"
            emptyFieldError = true
        } else {
            expertiesError.innerText = ""
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
        formData.append("name", name);
        formData.append("email", email);
        formData.append("qualification", qualification);
        formData.append("image", image);
        formData.append("number", number);
        formData.append("experience", experience);
        formData.append("experties", experties);
        formData.append("description", description);
        formData.append("website", website);
        formData.append("youtube", youtube);
        formData.append("userId", signUser._id);
        formData.append("fbUrl", fbUrl);
        formData.append("instaUrl", instaUrl);
        formData.append("twitterUrl", twitterUrl);

        const res = await fetch("https://accademia-backend.vercel.app/api/auth/addTeacher", {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        if (data.message === "Instructor with this email already exists") {
            emailError.innerText = "Instructor with this email already exists"
        } else {
            setTeacher({
                name: "",
                email: "",
                number: "",
                qualification: "",
                experience: "",
                description: "",
                image: "",
                website: "",
                youtube: "",
                instaUrl: "",
                fbUrl: "",
                twitterUrl: "",
                experties: ""
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Teacher has been created",
                showConfirmButton: false,
                timer: 1500
            });
            allTeachers()
        }

    }

    const onchange = (e) => {
        if (e.target.files) {
            setTeacher({ ...Teacher, image: e.target.files[0] })
        } else {
            setTeacher({ ...Teacher, [e.target.name]: e.target.value })
        }
    }

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
            allTeachers()
        }
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

    // pagination implement
    const teacherPerPage = 16
    const lastTeacherIndex = teacherPerPage * pageNmber
    const firstTeacherIndex = lastTeacherIndex - teacherPerPage
    const teachersData = allTeacher && allTeacher.filter(teacher => teacher.status === "Approved").filter(teacher => teacher.name.toLowerCase().includes(searchOption.toLowerCase()) || teacher.email.toLowerCase().includes(searchOption.toLowerCase()) || teacher.number.includes(searchOption)).slice(firstTeacherIndex, lastTeacherIndex)

    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4 col-8">
                    <input type="text" className="form-control" value={searchOption} onChange={(e) => setSearchOption(e.target.value)} placeholder="Search By name/email/number" />
                </div>
                <div className="d-flex justify-content-end col-md-7 col-4">
                    <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus"></i> Add Teacher</button>
                </div>
                <div className="col-md-11">
                    <div className="table-container" style={{ overflowX: "auto" }}>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachersData && teachersData.map((teacher) => {
                                    return <tr>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.number}</td>
                                        <td>{teacher.status}</td>
                                        <td><i className="fa fa-eye me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => setTeacherId(teacher._id)}></i>
                                            <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => editTeacher(teacher._id)}></i>
                                            <i className="fa fa-trash" onClick={() => deleteTeacher(teacher._id)}></i>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end my-3">
                        {[...Array(Math.ceil(allTeacher.length / teacherPerPage)).keys()].map((number) => {
                            return <button key={number + 1} className="btn btn-primary mx-1" onClick={() => setPageNumber(number + 1)}>{number + 1}</button>
                        })}
                    </div>
                </div>
            </div>

            {/* Teacher modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Teacher</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addTeacher}>
                                <div className="container mb-2">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input className="form-control mt-3" type="text" placeholder="Name" name="name" value={Teacher.name} onChange={onchange} />
                                            <div id="nameError" className="text-danger"></div>
                                            <input className="form-control mt-3" type="text" placeholder="Experties" name="experties" value={Teacher.experties} onChange={onchange} />
                                            <div id="expertiesError" className="text-danger"></div>
                                            <PhoneInput
                                                className="mt-3 phonInput"
                                                inputStyle={{
                                                    border: "none",
                                                    boxShadow: "none"
                                                }}
                                                country={'pk'}
                                                name="number"
                                                value={Teacher.number}
                                                onChange={(value, country, event, formattedValue) => {
                                                    onchange({
                                                        target: {
                                                            name: 'number',
                                                            value: formattedValue
                                                        }
                                                    });
                                                }}
                                            />
                                            <div id="numberError" className="text-danger"></div>
                                            <input className="form-control mt-3" type="link" placeholder="Youtube Link" name="youtube" value={Teacher.youtube} onChange={onchange} />
                                            <input className="form-control mt-3" type="link" placeholder="Fb Profile Link" name="fbUrl" value={Teacher.fbUrl} onChange={onchange} />

                                        </div>

                                        <div className="col-md-6">
                                            <input className="form-control mt-3" type="email" placeholder="Email" name="email" value={Teacher.email} onChange={onchange} />
                                            <div id="emailError" className="text-danger"></div>
                                            <input className="form-control mt-3" type="text" placeholder="Website Url" name="website" value={Teacher.website} onChange={onchange} />
                                            <input className="form-control mt-3" type="file" placeholder="Website Url" name="image" onChange={onchange} />
                                            <input className="form-control mt-3" type="link" placeholder="twitter Profile Link" name="twitterUrl" value={Teacher.twitterUrl} onChange={onchange} />
                                            <input className="form-control mt-3" type="link" placeholder="Insta Profile Link" name="instaUrl" value={Teacher.instaUrl} onChange={onchange} />
                                        </div>

                                        <div className="col-md-6">
                                            <textarea rows={10} className="form-control mt-3" type="text" placeholder="Qualifications" name="qualification" value={Teacher.qualification} onChange={onchange} />
                                            <div id="qualiError" className="text-danger"></div>
                                        </div>
                                        <div className="col-md-6">
                                            <textarea rows={10} className="form-control mt-3" type="text" placeholder="Experience" name="experience" value={Teacher.experience} onChange={onchange} />
                                            <div id="expeError" className="text-danger"></div>
                                        </div>

                                        <div className="col-md-12">
                                            <textarea className="form-control mt-3" name="description" id="" cols="30" rows="10" placeholder="Description" value={Teacher.description} onChange={onchange}></textarea>
                                            <div id="descriptionError" className="text-danger"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary mt-3 px-3">Add teacher</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* view modal */}
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">View Teacher</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">Name</label>
                                            <input className="form-control" type="text" placeholder="Name" name="name" value={getTeacher.name} />
                                            <div id="nameError" className="text-danger"></div>
                                            <label htmlFor="experties" className="mt-3">Experties</label>
                                            <input className="form-control" type="text" placeholder="Experties" value={getTeacher.experties} />
                                            <label htmlFor="number" className="mt-3">Number</label>
                                            <input className="form-control" type="tel" placeholder="Number" name="number" value={getTeacher.number} />
                                            <div id="numberError" className="text-danger"></div>
                                            <label htmlFor="youtube" className="mt-3">YouTube Link</label>
                                            <input className="form-control" type="link" placeholder="Youtube Link" name="youtube" value={getTeacher.youtube} />
                                            <label htmlFor="fbUrl" className="mt-3">Facebook Url</label>
                                            <input className="form-control" type="link" placeholder="Fb Profile Link" name="fbUrl" value={getTeacher.fbUrl} />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="email">email</label>
                                            <input className="form-control" type="email" placeholder="Email" name="email" value={getTeacher.email} />
                                            <div id="emailError" className="text-danger"></div>
                                            <label htmlFor="website" className="mt-3">Website Url</label>
                                            <input className="form-control" type="text" placeholder="Website Url" name="website" value={getTeacher.website} />
                                            <label htmlFor="image" className="mt-3">Image</label>
                                            <input className="form-control" placeholder="Website Url" name="image" value={getTeacher.image} />
                                            <label htmlFor="twitterUrl" className="mt-3">Twitter Url</label>
                                            <input className="form-control" type="link" placeholder="twitter Profile Link" name="twitterUrl" value={getTeacher.twitterUrl} />
                                            <label htmlFor="instaUrl" className="mt-3">Insta Url</label>
                                            <input className="form-control" type="link" placeholder="Insta Profile Link" name="instaUrl" value={getTeacher.instaUrl} />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="qualification" className="mt-3">Qualification</label>
                                            <textarea rows={10} className="form-control" type="text" placeholder="Qualifications" name="qualification" value={getTeacher.qualification} />
                                            <div id="qualiError" className="text-danger"></div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="experience" className="mt-3">Experience</label>
                                            <textarea rows={10} className="form-control" type="text" placeholder="Experience" name="experience" value={getTeacher.experience} />
                                            <div id="expeError" className="text-danger"></div>
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="description" className="mt-3">Description</label>
                                            <textarea className="form-control" name="description" id="" cols="30" rows="10" placeholder="Description" value={getTeacher.description} ></textarea>
                                            <div id="descriptionError" className="text-danger"></div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
        </div>
    )
}