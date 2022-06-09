import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import OtpInput from "react-otp-input";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import "./auth.css";

const Otpverification = () => {
  //   const [state, setState] = useState("");
  //   const handleChange = (otp) => {
  //     setState({ otp });
  //   };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/register/verify", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    reset();
  };

  return (
    <>
      <div className="container pt-5">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-11">
            <div className="row">
              <div
                className="col-sm-5 round pb-3 rounded mb-0 mx-auto"
                style={{
                  background: "#fff",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                  padding: "25px",
                }}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-75 mx-auto"
                >
                  <div className="">
                    <TextField
                      sx={{ height: "2c", marginBottom: "1ch" }}
                      id="outlined-basic"
                      label="Email address"
                      variant="outlined"
                      autoComplete="off"
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
                    <TextField
                      sx={{ height: "2c", marginBottom: "1ch" }}
                      id="outlined-basic"
                      label="Mobile"
                      variant="outlined"
                      autoComplete="off"
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

                  <div className="">
                    {/* <OtpInput
                      value={state}
                      onChange={handleChange}
                      numInputs={4}
                      separator={<span>-</span>}
                    /> */}
                   <TextField
                      sx={{ height: "2c", marginBottom: "1ch" }}
                      id="outlined-basic"
                      label="Enter otp"
                      variant="outlined"
                      autoComplete="off"
                      className={`form-control ${errors.otp && "invalid"}`}
                      {...register("otp", {
                        required: "otp is required"
                      })}
                      onKeyUp={() => {
                        trigger("otp");
                      }}
                    />
                </div>

                  <input
                    type="submit"
                    className="btn btn-primary my-3 w-100"
                    value="Verify"
                    style={{ fontSize: "12px" }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otpverification;
