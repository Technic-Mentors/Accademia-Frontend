import React, { useContext, useState } from "react"
import Swal from "sweetalert2"
import MyContext from "../contexts/Mycontexts"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function InstructorRequest() {
    const { signUser } = useContext(MyContext)

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
        const { name, number, qualification, experience, description, image, website, youtube, instaUrl, fbUrl, twitterUrl, experties } = Teacher

        const nameError = document.getElementById("nameError")
        const emailError = document.getElementById("emailError")
        const numberError = document.getElementById("numberError")
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
        if (!number) {
            numberError.innerText = "please enter number"
            emptyFieldError = true
        }
        else {
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
        formData.append("email", signUser.email);
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
                title: "Registration request has been sent successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const onchange = (e) => {
        if (e.target.name === 'number') {
            if (!/^\d*$/.test(e.target.value)) {
                setTeacher((Teacher) => ({ ...Teacher, [e.target.name]: e.target.value.replace(/\D/g, '') }));
                return;
            }
        }
        if (e.target.files) {
            setTeacher({ ...Teacher, image: e.target.files[0] })
        } else {
            setTeacher({ ...Teacher, [e.target.name]: e.target.value })
        }
    }


    return (
        <div className="container">
            <form onSubmit={addTeacher}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <input className="form-control mt-3" type="text" placeholder="Name" name="name" value={Teacher.name} onChange={onchange} />
                            <div id="nameError" className="text-danger"></div>
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
                            <input className="form-control mt-3" type="text" placeholder="Experties" name="experties" value={Teacher.experties} onChange={onchange} />
                            <div id="expertiesError" className="text-danger"></div>
                            <input className="form-control mt-3" type="link" placeholder="Youtube Link" name="youtube" value={Teacher.youtube} onChange={onchange} />
                            <input className="form-control mt-3" type="link" placeholder="Fb Profile Link" name="fbUrl" value={Teacher.fbUrl} onChange={onchange} />
                        </div>

                        <div className="col-md-6">
                            <input className="form-control mt-3" type="email" placeholder="Email" name="email" value={signUser.email} onChange={onchange} />
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
    )
}