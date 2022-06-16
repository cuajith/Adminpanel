import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./auth.css";

const Registration = () => {
  
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is mandatory')
      .min(3, 'Password must be at 3 char long'),
    confirmPwd: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm(formOptions);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/register", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    reset();
  };

  return (
    <div className="container pt-5">
      <div
        className="row justify-content-sm-center pt-5"
        style={{
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          marginTop: "20px"
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
                    className={`form-control ${
                      errors.name && "invalid"
                    } h-25`}
                    {...register("name", {
                      required: "name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                  />
                  {errors.name && (
                    <small className="text-danger">
                      {errors.name.message}
                    </small>
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
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password && "invalid"
                    } h-25`}
                    {...register("password", {
                      required: "Password is Required",
                      pattern: {
                        value: "",
                        message: "Enter valid password",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("password");
                    }}
                  />
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="col-form-label"
                    style={{ fontSize: "12px" }}
                  >
                    Confirm Password:
                  </label>
                  <input
                    name="confirmPwd"
                    type="password"
                    className={`form-control ${
                      errors.confirmPwd && "invalid"
                    }`}
                  />
                  {errors.confirmPwd && (
                    <small className="text-danger">
                      {errors.confirmPwd.message}
                    </small>
                  )}
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
