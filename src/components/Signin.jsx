import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../contexts/Mycontexts";
import Signimg from '../img/sign-in-img.avif'
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function Signin() {
  const { setSignUser } = useContext(MyContext);
  const [googleEmail, setGoogleEmail] = useState("")
  const navigate = useNavigate();

  const [viewPassword, setViewPassword] = useState(false)

  const togglePassView = () => {
    setViewPassword(!viewPassword)
  }

  const [updatePass, setUpdatePass] = useState(false)
  const toggleUpdatePass = () => {
    setUpdatePass(!updatePass)
  }

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [changepass, setChangePass] = useState({
    email: "",
    password: ""
  })

  const googleSignIn = async (e) => {

    const res = await fetch(
      `https://accademia-backend.vercel.app/api/auth/signin/${googleEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setSignUser(data);
    if(data.message==="user with this email not found"){
      const mailError = document.getElementById("mailError");
      mailError.innerText="user with this email not found"
    }
    if (data.role === "student") {
      navigate("/studentcourse");
    }
    if (data.role === "instructor") {
      navigate("/instructorUser");
    }
    if (data.role === "admin") {
      navigate("/adminpanel");
    }
    if (data.role === "school") {
      navigate("/schoolUser");
    }
  };
  useEffect(() => {
    googleSignIn()
  }, [googleEmail])
  const userSignin = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    const res = await fetch(
      "https://accademia-backend.vercel.app/api/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    setSignUser(data);
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    if (data.message === "user with this email not found") {
      emailError.innerText = "user with this email not found";
    } else {
      emailError.innerText = "";

    }
    if (data.message === "user with this password not found") {
      passwordError.innerText = "The Password is incorrect";
    } else {
      passwordError.innerText = "";
    }
    if (data.role === "student") {
      navigate("/studentcourse");
    }
    if (data.role === "instructor") {
      navigate("/instructorUser");
    }
    if (data.role === "admin") {
      navigate("/adminpanel");
    }
    if (data.role === "school") {
      navigate("/schoolUser");
    }
  };

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const changePassword = async (e) => {
    e.preventDefault()
    const { email, password } = changepass

    const mailError = document.getElementById("mailError")
    const passError = document.getElementById("passError")
    let forgotError = false;
    if (!email) {
      mailError.innerText = "Please enter your email"
      forgotError = true
    } else {
      mailError.innerText = ""
    }
    if (!password) {
      passError.innerText = "Please enter password"
      forgotError = true
    } else {
      passError.innerText = ""
    }
    if (forgotError) {
      return;
    }

    const res = await fetch("https://accademia-backend.vercel.app/api/auth/forgotPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.message === "Not found any user with this email") {
      mailError.innerText = "Not found any user with this email"
    } else {
      setChangePass({
        email: "",
        password: ""
      })
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password change successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const onchnge = (e) => {
    setChangePass({ ...changepass, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {/* header start  */}
      <section>
        <div className="head-bg">
          <div className="head-overlay">
            <h1 className="text-center text-white py-7">Sign In</h1>
          </div>
        </div>
      </section>
      {/* header end  */}
      <div className="container py-3">
        <div className="row d-flex signinform  justify-content-center align-items-center">
          <div className="col-md-6">
            <img src={Signimg} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="section-header text-center mb-3">
              <h6>Connect With Us</h6>
              <h2>Sign In To Your Account</h2>
            </div>
            <div className="d-flex justify-content-center">
              <GoogleLogin
                className="mb-3"
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  setGoogleEmail(decoded.email);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
              <div id="mailError" className="text-danger text-center"></div>
            <form>
              <input
                className="form-control mt-3"
                name="email"
                value={user.email}
                onChange={onchange}
                type="email"
                placeholder="Email"
              />
              <div id="emailError" className="text-danger"></div>
              <div className="input-group d-flex bshadow mt-3 align-items-center" style={{ border: '1px solid var(--secondary-color)', borderRadius: '25px', height: '50px' }}>
                <input
                  className="form-control register" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: '0 0 0 0' }}
                  name="password"
                  value={user.password}
                  onChange={onchange}
                  type={viewPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <i class="fas fa-eye mx-2 " onClick={togglePassView} style={{ cursor: 'pointer' }}></i>
                </div>
              </div>
              <div id="passwordError" className="text-danger"></div>
              <div className="text-center mt-4"><button className="signin-submit" onClick={userSignin}>
                Sign In
              </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <div className="float-center">
                <h6 className="mt-3">Not Registered Yet?&nbsp;
                  <Link to="/signup" style={{ textDecoration: "underline" }}>
                    Sign Up
                  </Link>
                </h6>
              </div>
              <div className="float-start forgot-password">
                <button className="btn btn-primary forget-pass" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Reset Password</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* forgot password moda  */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Update Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="update-pass">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" placeholder="Email" name="email" value={changepass.email} onChange={onchnge} />
                <div id="mailError" className="text-danger"></div>
                <label htmlFor="password" className="mt-3">New Password</label>
                <div className="input-group d-flex align-items-center bshadow" style={{ border: '1px solid var(--secondary-color)', borderRadius: '25px', height: '50px' }}>
                  <input type={updatePass ? "text" : "password"} className="form-control" placeholder="New Password" name="password" value={changepass.password} onChange={onchnge} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: '0 0 0 0' }} />
                  <div className="input-group-append" >
                    <i class="fas fa-eye mx-2 " onClick={toggleUpdatePass} style={{ cursor: 'pointer' }}></i>
                  </div>
                </div>
                <div id="passError" className="text-danger"></div>
                <div className="text-center">
                  <button className="btn btn-primary mt-3 register-button" onClick={changePassword}>Update Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
