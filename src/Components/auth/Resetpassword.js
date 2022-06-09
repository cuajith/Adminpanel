import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as Nv,
} from "@material-ui/core";
import axios from "axios";
import "./auth.css";

const Resetpassword = () => {
  const btnstyle = { marginTop: "28px ", backgroundColor: "#6d7f9f" };
  const [otp, setOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  //counter, timer
  const [counter, setCounter] = React.useState(10);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    if (data.otp) {
      axios
        .post("http://localhost:3001/verify-email", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      axios
        .post("http://localhost:3001/send-otp", data)
        .then((res) => console.log(res));
    }
    setEmail(data.email);
    setOtp(true);
    if (data.otp) {
      navigate("/createpassword");
    }
  };

  const handleClick = () => {
    setOtp(!otp)
    reset();
  };

  return (
    <div className="container pt-5">
      <div className="col-6 mx-auto">
        <div className="row">
          <div
            className="row justify-content-sm-center pt-5"
            style={{
              background: "#fff",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
              padding: "25px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div>
                  {otp && (
                    <p
                      style={{
                        marginBottom: "40px",
                        fontSize: "13px",
                        float: "right",
                      }}
                    >
                      OTP has been sent to{" "}
                      <span style={{ color: "blue" }}>{email}</span>
                    </p>
                  )}
                </div>
                <h4 className="reset-password-head">Reset your password</h4>

                <div>
                  <input
                    type="text"
                    placeholder="Email or mobile"
                    className={`form-control ${errors.email && "invalid"} ${
                      errors.mobile && "invalid"
                    } h-25`}
                    
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
                {!otp ? (
                  <Button
                    type="submit"
                    className="btn btn-secondary my-3 w-100 h-25"
                    value="Get OTP"
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                  >
                    {" "}
                    Get OTP{" "}
                  </Button>
                ) : (
                  <div>
                    <input
                      placeholder="Enter 4 Digit OTP"
                      name="otp"
                      type="text"
                      className={`form-control ${errors.otp && "invalid"} h-25`}
                      {...register("otp", {
                        required: "OTP is Required",
                      })}
                      onKeyUp={() => {
                        trigger("otp");
                      }}
                      style={{ marginTop: "20px" }}
                    />
                    {errors.otp && (
                      <small className="text-danger">
                        {errors.otp.message}
                      </small>
                    )}

                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      style={btnstyle}
                      fullWidth
                    >
                      VERIFY
                    </Button>

                    {!show && counter != 0 ? (
                      <Box mt={3}>
                        <Typography
                          fontWeight={500}
                          align="center"
                          color="textSecondary"
                        >
                          {" "}
                          Enter OTP in{" "}
                          <span style={{ color: "green", fontWeight: "bold" }}>
                            {" "}
                            00:{counter}
                          </span>{" "}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography align="center">
                        <NavLink to="" style={{ fontSize: "12px", textDecoration:"none" }}>
                          <span
                            onClick={handleClick}
                          >
                            {" "}
                            Resend OTP{" "}
                          </span>
                        </NavLink>
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
