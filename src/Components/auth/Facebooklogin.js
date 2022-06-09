import React from "react";
import FacebookLogin from "react-facebook-login";

const Facebooklogin = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  const componentClicked = (data) => {
    console.warn(data);
  };

  return (
    <div className="facebook-login">
      <FacebookLogin
        appId= {process.env.FACEBOOK_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  );
};

export default Facebooklogin;
