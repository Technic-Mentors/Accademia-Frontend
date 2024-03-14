import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupImg from '../img/signup-img.avif'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Signup() {
  const navigate = useNavigate();

  const [passwordView, setPasswordView] = useState(false)
  const [CpasswordView, setCPasswordView] = useState(false)

  const togglePasswordView = () => {
    setPasswordView(!passwordView)
  }
  const toggleCPasswordView = () => {
    setCPasswordView(!CpasswordView)
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    number: "",
    institute: ""
  });

  const userSignup = async (e) => {
    e.preventDefault();
    const nameValue = user.name.trim();
    const emailValue = user.email.trim();
    const numberValue = user.number.trim();
    const passwordValue = user.password.trim();
    const CPasswordValue = user.confirmPassword.trim();
    const nameError = document.getElementById("nameError");
    const emalError = document.getElementById("emailError");
    const numberError = document.getElementById("numberError");
    const pasError = document.getElementById("passwordError");
    const CPasError = document.getElementById("CPasswordError");
    let emptyFieldError = false;
    if (!nameValue) {
      nameError.innerText = "please enter name";
      emptyFieldError = true;
    } else {
      nameError.innerText = "";
    }
    if (!emailValue) {
      emalError.innerText = "please enter email";
      emptyFieldError = true;
    } else if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emalError.innerText = "Please enter a valid email address";
      emptyFieldError = true;
    } else {
      emalError.innerText = "";
    }
    if (!numberValue) {
      numberError.innerText = "please enter number";
      emptyFieldError = true;
    } else if (!numberValue.match(/^\d+$/)) {
      numberError.innerText = "Please enter only digits";
      emptyFieldError = true;
    }
    else {
      numberError.innerText = "";
    }
    if (!passwordValue) {
      pasError.innerText = "please enter password";
      emptyFieldError = true;
    } else {
      pasError.innerText = "";
    }
    if (!CPasswordValue) {
      CPasError.innerText = "please enter confirm password";
      emptyFieldError = true;
    } else {
      CPasError.innerText = "";
    }
    if (emptyFieldError) {
      return;
    }
    const { name, email, password, confirmPassword, role, number } = user;

    const res = await fetch(
      "https://accademia-backend.vercel.app/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          role,
          number,
        }),
      }
    );
    const data = await res.json();
    if (data.message === "user with this email already exists") {
      emalError.innerText = "user with this email already exists";
    } else if (data.message === "Password does not match") {
      CPasError.innerText = "Password does not match";
    } else if (data.message === "This number already used") {
      numberError.innerText = "This number already used"
    }
    if (res.status === 200) {
      navigate("/signin");
    }
  };

  const onchange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'number') {
      if (!/^\d*$/.test(value)) {
        setUser((prevUser) => ({ ...prevUser, [name]: value.replace(/\D/g, '') }));
        return;
      }
    }
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div>
      {/* header start */}
      <section>
        <div className="head-bg">
          <div className="head-overlay">
            <h1 className="text-center text-white py-7">Sign Up</h1>
          </div>
        </div>
      </section>
      {/* header end */}
      <div className="container py-3">
        <div className="row signup-form d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <img src={SignupImg} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="section-header text-center mb-5 mt-4">
              <h6>Don't Have An Account?</h6>
              <h2>Register On Our Platform</h2>
            </div>
            <form>
              <div id="error" className="text-danger text-center"></div>
              <div className="d-flex justify-content-center">
                <div className="form-check mx-2">
                  <input
                    className="form-check-input checkbtn"
                    type="radio"
                    name="role"
                    id="studentRadio"
                    value="student"
                    checked={user.role === "student"}
                    onChange={onchange}
                  />
                  <label className="form-check-label" htmlFor="studentRadio">
                    Student
                  </label>
                </div>
                <div className="form-check mx-2">
                  <input
                    className="form-check-input checkbtn"
                    type="radio"
                    name="role"
                    id="instructorRadio"
                    value="instructor"
                    checked={user.role === "instructor"}
                    onChange={onchange}
                  />
                  <label className="form-check-label" htmlFor="instructorRadio">
                    Instructor
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input checkbtn"
                    type="radio"
                    name="role"
                    id="schoolRadio"
                    value="school"
                    checked={user.role === "school"}
                    onChange={onchange}
                  />
                  <label className="form-check-label" htmlFor="schoolRadio">
                    School User
                  </label>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-md-6">
                  <input
                    className="form-control mt-3 register"
                    name="name"
                    value={user.name}
                    onChange={onchange}
                    type="name"
                    placeholder="Name"
                  />
                  <div id="nameError" className="text-danger"></div>
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control mt-3 register"
                    name="email"
                    value={user.email}
                    onChange={onchange}
                    placeholder="Email"
                  />
                  <div id="emailError" className="text-danger"></div>
                </div>
              </div>
              <PhoneInput
                className="mt-3 phoneInput py-2"
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

              <div className="row">
                <div className="col-md-6">
                  <div className="input-group d-flex bshadow mt-3 align-items-center" style={{ border: '1px solid var(--secondary-color)', borderRadius: '25px' }}>
                    <input
                      className="form-control register" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: '0 0 0 0' }}
                      name="password"
                      value={user.password}
                      onChange={onchange}
                      type={CpasswordView ? "text" : "password"}
                      placeholder="Password"
                    />
                    <div className="input-group-append">
                      <i className="fas fa-eye mx-2" onClick={toggleCPasswordView} style={{ cursor: 'pointer' }}></i>
                    </div>
                  </div>
                  <div id="passwordError" className="text-danger"></div>
                </div>
                <div className="col-md-6">
                  <div className="input-group bshadow d-flex mt-3 align-items-center" style={{ border: '1px solid var(--secondary-color)', borderRadius: '25px' }}>
                    <input
                      className="form-control  register"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={onchange}
                      type={passwordView ? "text" : "password"}
                      placeholder="Confirm Password"
                      style={{ border: 'none', backgroundColor: 'transparent', boxShadow: '0 0 0 0' }}
                    />
                    <div className="input-group-append">
                      <i className="fas fa-eye  mx-2" onClick={togglePasswordView} style={{ cursor: 'pointer' }}></i>
                    </div>
                  </div>
                  <div id="CPasswordError" className="text-danger"></div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="register-button"
                  onClick={userSignup}
                >
                  Sign Up
                </button><br />
              </div>
            </form>
            <div className="text-center">
              <h6 className="mt-3 text-cener">Already Have An Account?&nbsp;
                <Link to="/signin" style={{ textDecoration: "underline" }}>
                  Sign In
                </Link>
              </h6>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
