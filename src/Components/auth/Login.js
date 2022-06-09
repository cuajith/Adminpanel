import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import axios from "axios";
import Loginwithgoogle from "./Loginwithgoogle";
import Facebooklogin from "./Facebooklogin";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Router/Dashboard";
import "./auth.css";

const Login = () => {

  // SET COOKIES
  const [cookies, setCookies] = useCookies(['name']);
 
  const navigate = useNavigate();

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/credentials-login", data)
      .then((res) => {
        navigate('/dashboard');
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    reset();
    setCookies('Email', data.email, { path: '/' })
    setCookies('role', data.role, { path: '/' })
  };

  return (
    <>
      <div className="container pt-4">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-11">
            <div className="row">
              <div
                className="col-sm-5 round rounded mx-auto"
                style={{
                  background: "#fff",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                  padding: "25px",
                  // marginTop: "-50px",
                }}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-75 mx-auto"
                >
                  <h4 className="Log-in">Log in</h4>
                  <p className="Login-para">
                    Enter your credentails to access your account.
                  </p>
                  <div>
                    <Loginwithgoogle />
                    <Facebooklogin />
                  </div>
                  <span className="or-option">
                    <hr /> <p>or</p> <hr />
                  </span>

                 
                  <div className="">
                    <TextField
                      sx={{ height: "2c", marginBottom: "1ch" }}
                      id="outlined-basic"
                      label="Email address"
                      variant="outlined"
                      // autoComplete="off"
                      className={`form-control ${errors.email && "invalid"}`}
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

                  <div className="">
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          className="password-field"
                        >
                          Password
                        </InputLabel>
                        <OutlinedInput
                          
                          id="outlined-adornment-password"
                          type={values.showPassword ? "text" : "password"}
                          value={values.password}
                          onChange={handleChange("password")}
                          {...register("password", {
                            required: "Password is Required",
                            pattern: {
                              value: "",
                              message: "Enter valid password",
                            },
                          })}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                      {errors.password && (
                        <small className="text-danger">
                          {errors.password.message}
                        </small>
                      )}
                    </Box>
                  </div>

                  <div className="">
                    <TextField
                      sx={{ height: "2c", marginTop: "1ch" }}
                      id="outlined-basic"
                      label="Enter Role"
                      variant="outlined"
                      // autoComplete="off"
                      className={`form-control ${errors.role && "invalid"}`}
                      {...register("role", {
                        required: "Role is Required",
                        pattern: {
                          value: "",
                          message: "Invalid role",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("role");
                      }}
                    />

                    {errors.role && (
                      <small className="text-danger">
                        {errors.role.message}
                      </small>
                    )}
                  </div>
                 
                  <a href="/otp" className="forget-password">
                    forget password?
                  </a>

                  <input
                    type="submit"
                    className="btn btn-primary my-3 w-100"
                    value="Login"
                    style={{ fontSize: "12px" }}
                  />

                  <p style={{ fontSize: "12px" }} className="col-sm-5 mx-auto">
                    New User? &nbsp;{" "}
                    <a href="/signup" className="sign-up">
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
