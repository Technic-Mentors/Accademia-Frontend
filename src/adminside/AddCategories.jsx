import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import MyContext from "../contexts/Mycontexts";

export default function Categories() {
    const {AllCategory,allCategory} = useContext(MyContext)
    const [category, setCategory] = useState("")
    const categoryError = document.getElementById("categoryError")
    // add course
    const addCategory = async (e) => {
        e.preventDefault()
        const categoryError = document.getElementById("categoryError")
        let error = false
        if (!category) {
            categoryError.innerText = "Pleasd add category"
            error = true
        } else {
            categoryError.innerText = ""
        }
        if (error) {
            return;
        }
        const res = await fetch("https://accademia-backend.vercel.app/api/auth/addcategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category })
        })
        const data = await res.json()
        const Error = document.getElementById("error")
        if (data.message === "This category already added") {
            categoryError.innerText = "This category already exists"
        } else if (res.ok) {
            Error.innerText = ""
            allCategory()
            setCategory("")
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Category has been created",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    // delete course
    const deleteCategory = async (id) => {
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
                    text: "This course category has been deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });

        if (isConfirmed) {
            await fetch(`https://accademia-backend.vercel.app/api/auth/delcategory/${id}`, {
                method: "delete"
            })
            allCategory()
        }
    }


    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus"></i> Add Category</button>
                </div>
                <div className="col-md-11">
                    <div className="table-container" style={{ overflowX: "auto" }}>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllCategory && AllCategory.map((course) => {
                                    return <tr>
                                        <td>{course.category}</td>
                                        <td>
                                            <i className="fa fa-trash" onClick={() => deleteCategory(course._id)}></i>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* course modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                setCategory("");
                                categoryError.innerText = ""
                            }}></button>
                        </div>
                        <div className="container">
                            <div className="modal-body">
                                <form onSubmit={addCategory} encType="multipart/form-data">
                                    <div id="error" className="text-danger text-center"></div>
                                    <input type="text" className="form-control" name="category" value={category} onChange={(e) => {
                                        setCategory(e.target.value)
                                    }} />
                                    <div id="categoryError" className="text-danger"></div>
                                    <button type="submit" className="btn btn-primary mt-3">Add Category</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}