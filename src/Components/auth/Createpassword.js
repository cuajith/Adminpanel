import React, { useState } from "react";
import showPassword from "./show-password.svg";
import hidePassword from "./hide-password.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Createpassword = () => {
  // const [pwd, setPwd] = useState("");
  // const [cpwd, setCpwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      pwd: "",
      cpwd: "",
    },
    validationSchema: yup.object({
      pwd: yup.string().strict().trim().required("This field is required"),
      cpwd: yup
        .string()
        .oneOf(
          [yup.ref("pwd"), null],
          "Password does not match"
        )
        .required("This field is required"),
    }),
    onSubmit: (data) => {
      console.log(data);
      formik.resetForm()
      navigate('/login')
    },
  });

  return (
    <div>
      <div className="container pt-5">
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
                  marginTop: "-50px",
                }}
              >
                <h3 className="Log-in">Create New Password</h3>

                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <div className="pwd-container">
                      <input
                        name="pwd"
                        placeholder="Enter Password"
                        className="form-control"
                        type={isRevealPwd ? "text" : "password"}
                        value={formik.values.pwd}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onChange={(e) => setPwd(e.target.value)}
                      />
                      <img
                        title={isRevealPwd ? "Hide password" : "Show password"}
                        src={isRevealPwd ? hidePassword : showPassword}
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      />
                      {formik.touched.pwd && formik.errors.pwd ? (
                        <div className="text-danger">{formik.errors.pwd}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="pwd-container">
                      <input
                        name="cpwd"
                        placeholder="Re-enter Password"
                        className="form-control"
                        type={isRevealPwd ? "text" : "password"}
                        value={formik.values.cpwd}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <img
                        title={isRevealPwd ? "Hide password" : "Show password"}
                        src={isRevealPwd ? hidePassword : showPassword}
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      />
                      {formik.touched.cpwd && formik.errors.cpwd ? (
                        <div className="text-danger">{formik.errors.cpwd}</div>
                      ) : null}
                    </div>
                  </div>

                  <input
                    style={{ marginTop: "20px" }}
                    type="submit"
                    value="Submit"
                    className="btn btn-primary my-3 w-100 h-25"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Createpassword;
