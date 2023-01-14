import React, { Fragment, useState } from "react";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage.jsx/SignupPage";
import "./RegistrationPage_Styles.css";

function RegistrationPage(){

  const[signingUp,setSigningUP]=useState(true);
  const [loginORsignup,setLoginORsignup]=useState("Login");


  function changeRegType(){
    if(signingUp){
    setSigningUP(false);
    setLoginORsignup("Signup");
    }
    else{
      setSigningUP(true);
      setLoginORsignup("Login");
    }
  }

  return (<Fragment>
    <div className="regcontainer">
      <div className="regCard">
      <div className="account-type-and-ad-box">
        <div className="type-of-acc">
          <button className="btnActive"><h4 className="business-type-text">PERSONAL ACCOUNT</h4></button>
        </div>
          <div className="animateTitle">
          <div className="titleList"></div>
      </div>
          </div>
            <div className="form-container">

              {signingUp?<SignupPage/>:<LoginPage/>}


              <p className="googleLoginBar">
              <span>Login/Signup</span>
              </p>
                  <div>
                    <button onClick={changeRegType} className="submit-btn"><h3 className="redirect-btn">{loginORsignup}</h3></button>
                  </div>
            </div>
      </div>
    </div>
  </Fragment>)
  
}

export default RegistrationPage;