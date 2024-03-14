import React, { useContext, useState } from "react";
import MyContext from "../contexts/Mycontexts";
import Swal from "sweetalert2";

export default function RegisterdSchools() {
    const { allSchool, signUser, allSchools } = useContext(MyContext)
    const [EditSchool, setEditSchool] = useState([])

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
        if (e.target.files) {
            setEditSchool({ ...EditSchool, image: e.target.files[0] })
        } else {
            setEditSchool({ ...EditSchool, [e.target.name]: e.target.value })
        }

    }
    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="section-header text-center mb-3 mt-3" style={{ textDecoration: 'underline', color: '#f3f6fb' }}>
                    <h2>Your Added Schools</h2>
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
                                {allSchool && allSchool.filter(school => school.userId === signUser._id).map((school) => {
                                    return <tr>
                                        <td>{school.name}</td>
                                        <td>{school.city}</td>
                                        <td>{school.address}</td>
                                        <td>{school.status}</td>
                                        <td>
                                            <i className="fa fa-pen me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => editSchool(school._id)}></i>
                                            <i className="fa fa-trash" onClick={() => deleteSchool(school._id)}></i>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* {/ {/ Edit modal /} /} */}
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
                                        <div className="d-flex justify-content-center mt-3 mb-2">
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