import React, { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Adduser() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [searchOption, setSearchOption] = useState("")

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1)
    }
    const formRef = useRef()
    const [allUsers, setAllUsers] = useState([])
    const [getUser, setGetUser] = useState([])
    const [edtUser, setEditUser] = useState([])
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        number: ""
    })

    const addUser = async (e) => {
        e.preventDefault()
        const { email, password, confirmPassword, role, name, number } = user
        const nameError = document.getElementById("nameError")
        const emalError = document.getElementById("emailError")
        const pasError = document.getElementById("passwordError")
        const CPasError = document.getElementById("CPasswordError")
        const roleError = document.getElementById("roleError")
        const numberError = document.getElementById("numberError")
        let emptyFieldError = false
        if (!name) {
            nameError.innerText = "please enter email"
            emptyFieldError = true
        } else {
            nameError.innerText = ""
        }
        if (!email) {
            emalError.innerText = "please enter email"
            emptyFieldError = true
        } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emalError.innerText = "Please enter a valid email address";
            emptyFieldError = true;
        } else {
            emalError.innerText = ""
        }
        if (!password) {
            pasError.innerText = "please enter password"
            emptyFieldError = true
        } else {
            pasError.innerText = ""
        }
        if (!confirmPassword) {
            CPasError.innerText = "please enter confirm password"
            emptyFieldError = true
        } else {
            CPasError.innerText = ""
        }
        if (!number) {
            numberError.innerText = "please enter Number"
            emptyFieldError = true
        } else {
            numberError.innerText = ""
        }
        if (!role) {
            roleError.innerText = "please select role"
            emptyFieldError = true
        } else {
            roleError.innerText = ""
        }
        if (emptyFieldError) {
            return;
        }
        const res = await fetch("https://accademia-backend.vercel.app/api/auth/adduser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, confirmPassword, role, name, number })
        })
        const data = await res.json()
        const Error = document.getElementById("error")
        if (data.message === "user with this email already exists") {
            emalError.innerText = "user with this email already exists"
        } else if (data.message === "This number already exists") {
            numberError.innerText = "This number already exists"
        } else if (data.message === "Password does not match") {
            CPasError.innerText = "Password does not match"
        } else {
            Error.innerText = ""
            setUser({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "",
                number: ""
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User has been created",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const onchange = (e) => {
        setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
    };

    // get all users
    const getAllUsers = async () => {
        await fetch("https://accademia-backend.vercel.app/api/auth/allusers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setAllUsers(data))
    }
    useEffect(() => {
        getAllUsers()
    })
    // get user id
    const getUserId = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setGetUser(data))
    }
    // get user id
    const deleteUserId = async (id) => {
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
            await fetch(`https://accademia-backend.vercel.app/api/auth/deleteuser/${id}`, {
                method: "delete"
            })
            getAllUsers()
        }
    }

    // edit course data
    const editUser = async (id) => {
        await fetch(`https://accademia-backend.vercel.app/api/auth/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setEditUser(data)
            })
    }

    const updateUser = async (e) => {
        e.preventDefault()
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });

        if (isConfirmed) {
            const { name, number, password, role } = edtUser
            const res = await fetch(`https://accademia-backend.vercel.app/api/auth/updateuser/${edtUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, number, password, role })
            })
            const data = await res.json()
            console.log(data)
            Swal.fire("Saved!", "", "success");
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
        getAllUsers()
    }

    const onchnge = (e) => {
        if (e.target.name === 'number') {
            const formattedValue = e.target.value.replace(/\D/g, '');

            // Restrict to 11 numbers
            const truncatedValue = formattedValue.slice(0, 11);

            // Format as "0000-000000000"
            const formattedNumber = truncatedValue.replace(/(\d{4})(\d{0,7})(\d{0,4})/, (_, p1, p2, p3) => {
                return p2 ? `${p1}-${p2}${p3 ? `-${p3}` : ''}` : p1;
            });

            setEditUser((edtUser) => ({ ...edtUser, [e.target.name]: formattedNumber }));
        } else {
            setEditUser({ ...edtUser, [e.target.name]: e.target.value });
        }
    };

    // pagination process
    const [pageNumber, setPageNumber] = useState(1)
    const userPerPage = 16;
    const lastUserIndex = pageNumber * userPerPage
    const firstUserIndex = lastUserIndex - userPerPage
    const allUser = allUsers && allUsers.filter(user => user.name.toLowerCase().includes(searchOption.toLowerCase()) || user.role.toLowerCase().includes(searchOption.toLowerCase()) || user.email.toLowerCase().includes(searchOption.toLowerCase())).slice(firstUserIndex, lastUserIndex)

    const paginate = (pagNumber) => {
        setPageNumber(pagNumber)
    }

    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4 col-8">
                    <input type="text" className="form-control" value={searchOption} onChange={(e) => setSearchOption(e.target.value)} placeholder="Search By name/email/role" />
                </div>
                <div className="d-flex justify-content-end col-md-7 col-4">
                    <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus"></i> Add User</button>
                </div>
                <div className="col-md-11">
                    <div className="table-container" style={{ overflowX: "auto" }}>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUser && allUser.map((user) => {
                                    return <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td><i className="fa fa-eye me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => getUserId(user._id)}></i>
                                            <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => editUser(user._id)}></i>
                                            <i className="fa fa-trash" onClick={() => deleteUserId(user._id)}></i>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex justify-content-end my-3">
                    {[...Array(Math.ceil(allUsers.length / userPerPage)).keys()].map((number) => {
                        return <button key={number + 1} className="btn btn-primary mx-2" onClick={() => paginate(number + 1)}>{number + 1}</button>
                    })}
                </div>
            </div>

            {/* {/ user modal /} */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addUser}>
                                <div id="error" className="text-danger text-center"></div>
                                <input className="form-control mt-3" name="name" value={user.name} onChange={onchange} type="name" placeholder="Name" />
                                <div id="nameError" className="text-danger"></div>
                                <input className="form-control mt-3" name="email" value={user.email} onChange={onchange} type="email" placeholder="Email" />
                                <div id="emailError" className="text-danger"></div>
                                <div className="d-flex align-items-center mt-3" style={{ border: "1px solid #d7d7d7", borderRadius: "6px" }}>
                                    <input className="form-control border-0" name="password" value={user.password} onChange={onchange} type={showPassword ? "text" : "password"} placeholder="Password" />
                                    <i className="fas fa-eye mx-2" onClick={toggleShowPassword}></i>
                                </div>
                                <div id="passwordError" className="text-danger"></div>
                                <div className="d-flex align-items-center mt-3" style={{ border: "1px solid #d7d7d7", borderRadius: "6px" }}>
                                    <input className="form-control border-0" name="confirmPassword" value={user.confirmPassword} onChange={onchange} type={showPassword1 ? "text" : "password"} placeholder="Confirm Password" />
                                    <i className="fas fa-eye mx-2" onClick={toggleShowPassword1}></i>
                                </div>
                                <div id="CPasswordError" className="text-danger"></div>

                                <PhoneInput
                                    className="mt-3 phonInput"
                                    inputStyle={{
                                        border: "none",
                                        boxShadow: "none"
                                    }}
                                    country={'pk'}
                                    name="number"
                                    value={user.number}
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
                                <select className="form-control mt-3" name="role" value={user.role} id="role" onChange={onchange}>
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                    <option value="school">School User</option>
                                </select>
                                <div id="roleError" className="text-danger"></div>
                                <button type="submit" className="btn btn-primary mt-3">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* {/ view modal /} */}
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">View User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div id="error" className="text-danger text-center"></div>
                                <label htmlFor="name" className="mt-3">Name</label>
                                <input className="form-control" value={getUser.name} id="name" type="name" placeholder="Name" />
                                <label htmlFor="email" className="mt-3">Email</label>
                                <input className="form-control" value={getUser.email} id="email" type="email" placeholder="Email" />
                                <label htmlFor="number" className="mt-3">Contact Number</label>
                                <input className="form-control" value={getUser.number} id="number" type="tel" placeholder="Number" />
                                <div id="emailError" className="text-danger"></div>
                                <label htmlFor="password" className="mt-3">User Password</label>
                                <input className="form-control" value={getUser.password} type="password" placeholder="Password" />
                                <div id="passwordError" className="text-danger"></div>
                                <label htmlFor="role" className="mt-3">Role</label>
                                <input className="form-control" value={getUser.role} type="text" placeholder="role" />
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
                            <h5 className="modal-title" id="staticBackdropLabel">Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div id="error" className="text-danger text-center"></div>
                                <label htmlFor="name" className="mt-3">Name</label>

                                <input className="form-control" name="name" value={edtUser.name} onChange={onchnge} id="name" type="name" placeholder="Name" />
                                <label htmlFor="email" className="mt-3">Email</label>
                                <input className="form-control" value={edtUser.email} id="email" type="email" placeholder="Email" />
                                <div id="emailError" className="text-danger"></div>
                                <label htmlFor="number" className="mt-3">Contact Number</label>
                                <input className="form-control" name="number" value={edtUser.number} onChange={onchnge} id="number" type="tel" placeholder="Number" />
                                <div id="emailError" className="text-danger"></div>
                                <label htmlFor="password" className="mt-3">User Password</label>
                                <input className="form-control" name="password" value={edtUser.password} onChange={onchnge} type="password" placeholder="Password" />
                                <div id="passwordError" className="text-danger"></div>
                                <label htmlFor="role" className="mt-3">Role</label>
                                <select className="form-control" name="role" value={edtUser.role} id="role" onChange={onchnge}>
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                    <option value="school">School User</option>
                                </select>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary mt-3" onClick={updateUser}> Update User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}