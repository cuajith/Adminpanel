import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import showPassword from "./show-password.svg";
import hidePassword from "./hide-password.svg";
import "./auth.css";
import EmailVerification from "./EmailVerification";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [error, setError] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  function validate() {
    let error = {};
    if (pwd.length === 0) {
      error["pwd"] = "Please enter your password";
    }

    if (pwd.length < 8) {
      error["pwd"] = "Password must contain at least 8 character";
    }

    if (cpwd.length === 0) {
      error["cpwd"] = "Please enter your confirm password";
    }

    if (pwd !== null && cpwd !== null) {
      if (pwd !== cpwd) {
        error["cpwd"] = "Password don't match";
      }
    }
    setError(error);
  }

  const onSubmit = (data) => {
    if (validate) {
      axios
        .post("http://localhost:3001/register", data)
        .then((res) => {
         navigate('/emailVerification');
         console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      reset();
    }
  };

  return (
    <div className="container pt-5">
      <div
        className="row justify-content-sm-center pt-5"
        style={{
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          marginTop: "20px",
        }}
      >
        <div className="col-12">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <img
                src="./images/frontimage.webp"
                className="signup-page-image"
              />
            </div>
            <div className="col-sm-6 round pb-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <h4 className="">DigiKaagaz</h4>
                  <label
                    className="col-form-label"
                    style={{ fontSize: "12px" }}
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name && "invalid"} h-25`}
                    {...register("name", {
                      required: "name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>

                <div className="form-group">
                  <label
                    className="col-form-label"
                    style={{ fontSize: "12px" }}
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.email && "invalid"} h-25`}
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="col-form-label"
                    style={{ fontSize: "12px" }}
                  >
                    Password:
                  </label>
                  <div className="pwd-container">
                    <input
                      name="pwd"
                      className="form-control"
                      type={isRevealPwd ? "text" : "password"}
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                    />
                    <img
                      title={isRevealPwd ? "Hide password" : "Show password"}
                      src={isRevealPwd ? hidePassword : showPassword}
                      onClick={() => setIsRevealPwd((prevState) => !prevState)}
                    />
                    <div className="text-danger">{error.pwd}</div>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    className="col-form-label"
                    style={{ fontSize: "12px" }}
                  >
                    Confirm Password:
                  </label>
                  <div className="pwd-container">
                    <input
                      name="cpwd"
                      className="form-control"
                      type={isRevealPwd ? "text" : "password"}
                      value={cpwd}
                      onChange={(e) => setCpwd(e.target.value)}
                    />
                    <img
                      title={isRevealPwd ? "Hide password" : "Show password"}
                      src={isRevealPwd ? hidePassword : showPassword}
                      onClick={() => setIsRevealPwd((prevState) => !prevState)}
                    />
                    <div className="text-danger">{error.cpwd}</div>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    className="col-form-label"
                    style={{ fontSize: "12px" }}
                  >
                    Mobile:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.mobile && "invalid"
                    } h-25`}
                    {...register("mobile", {
                      required: "mobile number is Required",
                      pattern: {
                        value:
                          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                        message: "Invalid mobile number",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("mobile");
                    }}
                  />
                  {errors.mobile && (
                    <small className="text-danger">
                      {errors.mobile.message}
                    </small>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary my-3 w-100 h-25"
                  value="Submit"
                />
                <p style={{ fontSize: "12px", textAlign: "center" }}>
                  Already have an account? &nbsp;{" "}
                  <a href="/" className="sign-up">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
