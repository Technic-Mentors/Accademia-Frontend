import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import MyContext from "../contexts/Mycontexts";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function RegisterSchool() {
    const { signUser } = useContext(MyContext)
    const [School, setSchool] = useState({
        name: "",
        email: "",
        number: "",
        city: "",
        address: "",
        detail: "",
        fpNumber: "",
        category: "",
        image: "",
        userId: ""
    })
    // add School
    const addSchool = async (e) => {
        e.preventDefault()
        const { name, email, number, city, address, detail, fpNumber, category, image, userId } = School

        const nameError = document.getElementById("nameError")
        const emailError = document.getElementById("emailError")
        const numberError = document.getElementById("numberError")
        const cityError = document.getElementById("cityError")
        const addressError = document.getElementById("addressError")
        const detailError = document.getElementById("detailError")
        const categoryError = document.getElementById("categoryError")
        const focalError = document.getElementById("focalError")
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
        if (!city) {
            cityError.innerText = "please confirm city"
            emptyFieldError = true
        } else {
            cityError.innerText = ""
        }
        if (!address) {
            addressError.innerText = "please confirm address"
            emptyFieldError = true
        } else {
            addressError.innerText = ""
        }
        if (!detail) {
            detailError.innerText = "please add detail"
            emptyFieldError = true
        } else {
            detailError.innerText = ""
        }
        if (!category) {
            categoryError.innerText = "please select category"
            emptyFieldError = true
        } else {
            categoryError.innerText = ""
        }
        if (!fpNumber) {
            focalError.innerText = "please add focal person number"
            emptyFieldError = true
        } else {
            focalError.innerText = ""
        }
        if (emptyFieldError) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("category", category);
        formData.append("address", address);
        formData.append("image", image);
        formData.append("number", number);
        formData.append("fpNumber", fpNumber);
        formData.append("detail", detail);
        formData.append("city", city);
        formData.append("userId", signUser._id);

        const res = await fetch("https://accademia-backend.vercel.app/api/auth/addSchool", {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        if (data.message === "Scholl already regitered with this name") {
            nameError.innerText = "Scholl already registered with this name"
        } else if (data.message === "School with this email already exists") {
            emailError.innerText = "School with this email already exists"
        } else if (data.message === "This number already exist") {
            numberError.innerText = "This number already exist"
        } else if (data.message === "Focal Person number already exist") {
            focalError.innerText = "Focal Person number already exist"
        } else {
            setSchool({
                name: "",
                email: "",
                number: "",
                city: "",
                address: "",
                detail: "",
                fpNumber: "",
                category: "",
                image: ""
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your School Registration Request has been sent successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const onchange = (e) => {
        if (e.target.files) {
            setSchool({ ...School, image: e.target.files[0] })
        } else {
            setSchool({ ...School, [e.target.name]: e.target.value })
        }
    };

    return (
        <div>
            <form onSubmit={addSchool}>
                <div className="row">
                    <div className="col-md-6">
                        <input className="form-control mt-3" type="text" placeholder="Name" name="name" value={School.name} onChange={onchange} />
                        <div id="nameError" className="text-danger"></div>
                        <label htmlFor="number" className="mt-3">Contact Number</label>
                        <PhoneInput
                            className="phonInput"
                            inputStyle={{
                                border: "none",
                                boxShadow: "none"
                            }}
                            country={'pk'}
                            name="number"
                            value={School.number}
                            onChange={(value, country, event, formattedValue) => {
                                onchange({
                                    target: {
                                        name: 'number',
                                        value: formattedValue
                                    }
                                });
                            }}
                            inputProps={{
                                placeholder: "ffffffffffff"
                            }}
                        />
                        <div id="numberError" className="text-danger"></div>

                        <input className="form-control mt-3" type="text" placeholder="Address" name="address" value={School.address} onChange={onchange} />
                        <div id="addressError" className="text-danger"></div>

                        <input className="form-control mt-3" type="text" placeholder="City" name="city" value={School.city} onChange={onchange} />
                        <div id="cityError" className="text-danger"></div>
                    </div>

                    <div className="col-md-6">
                        <input className="form-control mt-3" type="email" placeholder="Email" name="email" value={School.email} onChange={onchange} />
                        <div id="emailError" className="text-danger"></div>
                        <label htmlFor="number" className="mt-3">Focal Person Number</label>
                        <PhoneInput
                            className="phonInput"
                            inputStyle={{
                                border: "none",
                                boxShadow: "none"
                            }}
                            country={'pk'}
                            name="fpNumber"
                            value={School.fpNumber}
                            onChange={(value, country, event, formattedValue) => {
                                onchange({
                                    target: {
                                        name: 'fpNumber',
                                        value: formattedValue
                                    }
                                });
                            }}
                        />
                        <div id="focalError" className="text-danger"></div>

                        <select name="category" className="form-control mt-3" value={School.category} onChange={onchange} style={{ backgroundColor: "white" }}>
                            <option value="">Select Category</option>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                        <div id="categoryError" className="text-danger"></div>

                        <input className="form-control mt-3" type="file" placeholder="Image" name="image" onChange={onchange} />
                    </div>

                    <div className="col-md-12">
                        <textarea className="form-control mt-3" name="detail" id="" cols="30" rows="10" placeholder="School Detail" value={School.detail} onChange={onchange}></textarea>
                        <div id="detailError" className="text-danger"></div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary mt-3 px-4 py-2">Add School</button>
                        </div>
                    </div>
                </div>
            </form>
            {/* course modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add School</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}