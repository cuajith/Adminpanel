import React from "react";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import GoogleLogout from "react-google-login";
import "./auth.css";

const Loginwithgoogle = () => {
  const [showLoginButton, setshowLoginButton] = useState(true);
  const [showLogoutButton, setshowLogoutButton] = useState(false);

  const clientId = process.env.REACT_APP_CLIENT_ID;

  const onLoginSuccess = (res) => {
    console.log("Login Success", res);
    setshowLoginButton(false);
    setshowLogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed", res);
  };

  const onLogoutSuccess = (res) => {
    alert("Logout Successfully");
    setshowLoginButton(true);
    setshowLogoutButton(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 w-100">
          <div className="row">
           
              {showLoginButton ? (
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Log in with Google"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  className="g-signin"
                />
              ) : null}
              {showLogoutButton ? (
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={onLogoutSuccess}
                />
              ) : null}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginwithgoogle;
