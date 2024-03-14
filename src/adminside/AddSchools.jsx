import React, { useContext, useState } from "react"
import Swal from "sweetalert2"
import MyContext from "../contexts/Mycontexts"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Addschool() {
    const { allSchool, allSchools, setSchoolId, getSchool, signUser } = useContext(MyContext)

    const [EditSchool, setEditSchool] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [searchOption, setSearchOption] = useState("")
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
    async function addSchool(e) {
        e.preventDefault();
        const { name, email, number, city, address, detail, fpNumber, category, image } = School;

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const numberError = document.getElementById("numberError");
        const cityError = document.getElementById("cityError");
        const addressError = document.getElementById("addressError");
        const detailError = document.getElementById("detailError");
        const categoryError = document.getElementById("categoryError");
        const focalError = document.getElementById("focalError");
        let emptyFieldError = false;
        if (!name) {
            nameError.innerText = "please enter name";
            emptyFieldError = true;
        } else {
            nameError.innerText = "";
        }
        if (!email) {
            emailError.innerText = "please enter email";
            emptyFieldError = true;
        } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.innerText = "Please enter a valid email address";
            emptyFieldError = true;
        } else {
            emailError.innerText = "";
        }
        if (!number) {
            numberError.innerText = "please enter number";
            emptyFieldError = true;
        } else {
            numberError.innerText = "";
        }
        if (!city) {
            cityError.innerText = "please confirm city";
            emptyFieldError = true;
        } else {
            cityError.innerText = "";
        }
        if (!address) {
            addressError.innerText = "please confirm address";
            emptyFieldError = true;
        } else {
            addressError.innerText = "";
        }
        if (!detail) {
            detailError.innerText = "please add detail";
            emptyFieldError = true;
        } else {
            detailError.innerText = "";
        }
        if (!category) {
            categoryError.innerText = "please select category";
            emptyFieldError = true;
        } else {
            categoryError.innerText = "";
        }
        if (!fpNumber) {
            focalError.innerText = "please add focal person number";
            emptyFieldError = true;
        } else {
            focalError.innerText = "";
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
        });
        const data = await res.json();
        if (data.message === "Scholl already regitered with this name") {
            nameError.innerText = "Scholl already registered with this name";
        } else if (data.message === "School with this email already exists") {
            emailError.innerText = "School with this email already exists";
        } else if (data.message === "This number already exist") {
            numberError.innerText = "This number already exist";
        } else if (data.message === "Focal Person number already exist") {
            focalError.innerText = "Focal Person number already exist";
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
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "School has been created",
                showConfirmButton: false,
                timer: 1500
            });
            allSchools();
        }

    }

    const onchange = (e) => {
        if (e.target.files) {
            setSchool({ ...School, image: e.target.files[0] })
        } else {
            setSchool({ ...School, [e.target.name]: e.target.value })
        }
    };

    const removeError = () => {
        const nameError = document.getElementById("nameError")
        const emailError = document.getElementById("emailError")
        const numberError = document.getElementById("numberError")
        const cityError = document.getElementById("cityError")
        const addressError = document.getElementById("addressError")
        const detailError = document.getElementById("detailError")
        const categoryError = document.getElementById("categoryError")
        const focalError = document.getElementById("focalError")

        nameError.innerText = ""
        emailError.innerText = ""
        numberError.innerText = ""
        cityError.innerText = ""
        addressError.innerText = ""
        detailError.innerText = ""
        categoryError.innerText = ""
        focalError.innerText = ""
    }

    // delete School
    const deleteSchool = async (id) => {
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
                    text: "Your news has been deleted.",
                    icon: "success",
                });
            }
            return result;
        });

        if (isConfirmed) {
            await fetch(`https://accademia-backend.vercel.app/api/auth/deleteSchool/${id}`, {
                method: "delete"
            })
            allSchools()
        }
    }

    // edit School data
    const editSchool = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getSchool/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setEditSchool(data)
            })
    }

    const updateSchool = async (e) => {
        e.preventDefault()
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });

        if (isConfirmed) {
            const { name, number, city, address, detail, fpNumber, category, image } = EditSchool

            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("address", address);
            formData.append("image", image);
            formData.append("number", number);
            formData.append("fpNumber", fpNumber);
            formData.append("detail", detail);
            formData.append("city", city);

            await fetch(`https://accademia-backend.vercel.app/api/auth/updateSchool/${EditSchool._id}`, {
                method: "PUT",
                body: formData
            })
            Swal.fire("Saved!", "", "success");
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
        allSchools()
    }

    const onchnge = (e) => {
        if (e.target.name === 'number' || e.target.name === "fpNumber") {
            if (!/^\d*$/.test(e.target.value)) {
                setEditSchool((School) => ({ ...School, [e.target.name]: e.target.value.replace(/\D/g, '') }));
                return;
            }
        }
        if (e.target.files) {
            setEditSchool({ ...EditSchool, image: e.target.files[0] })
        } else {
            setEditSchool({ ...EditSchool, [e.target.name]: e.target.value })
        }

    }
    // pagination implement 
    const schoolPerPage = 15
    const lastSchoolIndex = pageNumber * schoolPerPage
    const firstSchoolIndex = lastSchoolIndex - schoolPerPage
    const schoolsData = allSchool && allSchool.filter(school => school.status === "Approved").filter(school => school.name.toLowerCase().includes(searchOption.toLowerCase()) || school.city.toLowerCase().includes(searchOption.toLowerCase())).slice(firstSchoolIndex, lastSchoolIndex)


    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4 col-8">
                    <input type="text" className="form-control" value={searchOption} onChange={(e) => setSearchOption(e.target.value)} placeholder="Search By name/city" />
                </div>
                <div className="d-flex justify-content-end col-md-7 col-4">
                    <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus"></i> Add School</button>
                </div>
                <div className="col-md-11">
                    <div className="table-container" style={{ overflowX: "auto" }}>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schoolsData && schoolsData.map((school) => {
                                    return <tr>
                                        <td>{school.name}</td>
                                        <td>{school.city}</td>
                                        <td>{school.address}</td>
                                        <td>{school.status}</td>
                                        <td><i className="fa fa-eye me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => setSchoolId(school._id)}></i>
                                            <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => editSchool(school._id)}></i>
                                            <i className="fa fa-trash" onClick={() => deleteSchool(school._id)}></i>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end my-3">
                        {[...Array(Math.ceil(allSchool.length / schoolPerPage)).keys()].map((number) => {
                            return <button key={number + 1} className="btn btn-primary mx-1" onClick={() => setPageNumber(number + 1)}>{number + 1}</button>
                        })}
                    </div>
                </div>
            </div>

            {/* {/ course modal /} */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add School</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={removeError}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addSchool}>
                                <div className="row mb-2">
                                    <div className="col-md-6">
                                        <input className="form-control mt-3" type="text" placeholder="Name" name="name" value={School.name} onChange={onchange} />
                                        <div id="nameError" className="text-danger"></div>
                                        <PhoneInput
                                            className="mt-3 phonInput"
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
                                        />
                                        <div id="numberError" className="text-danger"></div>

                                        <input className="form-control mt-3" type="text" placeholder="Address" name="address" value={School.address} onChange={onchange} />
                                        <div id="addressError" className="text-danger"></div>
                                        <PhoneInput
                                            className="mt-3 phonInput"
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
                                    </div>

                                    <div className="col-md-6">
                                        <input className="form-control mt-3" type="email" placeholder="Email" name="email" value={School.email} onChange={onchange} />
                                        <div id="emailError" className="text-danger"></div>

                                        <input className="form-control mt-3" type="text" placeholder="City" name="city" value={School.city} onChange={onchange} />
                                        <div id="cityError" className="text-danger"></div>

                                        <select name="category" className="form-control mt-3" value={School.category} onChange={onchange}>
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
                        </div>
                    </div>
                </div>
            </div>
            {/* {/ view modal /} */}
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">View School</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="mt-3">Name</label>
                                        <input className="form-control" type="text" placeholder="Name" name="name" value={getSchool.name} />
                                        <label htmlFor="number" className="mt-3">Number</label>
                                        <input className="form-control" type="tel" placeholder="Number" name="number" value={getSchool.number} />
                                        <label htmlFor="address" className="mt-3">Address</label>
                                        <input className="form-control" type="text" placeholder="Address" name="address" value={getSchool.address} />
                                        <label htmlFor="category" className="mt-3">Category</label>
                                        <input className="form-control" type="text" placeholder="Number" name="category" value={getSchool.category} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="email" className="mt-3">Email</label>
                                        <input className="form-control" type="email" placeholder="Email" name="email" value={getSchool.email} />
                                        <label htmlFor="city" className="mt-3">City</label>
                                        <input className="form-control" type="text" placeholder="City" name="city" value={getSchool.city} />
                                        <label htmlFor="fpNumber" className="mt-3">Focal Person Number</label>
                                        <input className="form-control" type="tel" placeholder="Number" name="fpNumber" value={getSchool.fpNumber} />
                                        <label htmlFor="fpNumber" className="mt-3">Image</label>
                                        <input className="form-control" type="text" placeholder="image" value={getSchool.image} />
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="detail" className="mt-3">Detail</label>
                                        <textarea className="form-control" name="detail" id="detail" cols="30" rows="10" value={getSchool.detail}></textarea>
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
                            <h5 className="modal-title" id="staticBackdropLabel">Edit School</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="mt-3">Name</label>
                                        <input className="form-control" type="text" placeholder="Name" name="name" value={EditSchool.name} onChange={onchnge} />
                                        <label htmlFor="number" className="mt-3">Number</label>
                                        <input className="form-control" type="tel" placeholder="Number" name="number" value={EditSchool.number} onChange={onchnge} />
                                        <label htmlFor="address" className="mt-3">Address</label>
                                        <input className="form-control" type="text" placeholder="Address" name="address" value={EditSchool.address} onChange={onchnge} />
                                        <label htmlFor="fpNumber" className="mt-3">Focal Person Number</label>
                                        <input className="form-control" type="tel" placeholder="Focal Person Number" name="fpNumber" value={EditSchool.fpNumber} onChange={onchnge} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="mt-3">Email</label>
                                        <input className="form-control" type="email" placeholder="Email" name="email" value={EditSchool.email} />
                                        <label htmlFor="city" className="mt-3">City</label>
                                        <input className="form-control" type="text" placeholder="City" name="city" value={EditSchool.city} onChange={onchnge} />
                                        <label htmlFor="category" className="mt-3">Category</label>
                                        <select name="category" className="form-control" value={EditSchool.category} onChange={onchnge}>
                                            <option value="">Select Category</option>
                                            <option value="private">Private</option>
                                            <option value="public">Public</option>
                                        </select>
                                        <label htmlFor="image" className="mt-3">School Image</label>
                                        <input className="form-control" type="file" placeholder="Image" name="image" onChange={onchnge} />
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="website" className="mt-3">Course Detail</label>
                                        <textarea className="form-control" name="detail" id="website" cols="30" rows="10" value={EditSchool.detail} onChange={onchnge}></textarea>
                                        <div className="d-flex justify-content-center mt-3">
                                            <button className="btn btn-primary" onClick={updateSchool}>Update</button>
                                        </div>
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