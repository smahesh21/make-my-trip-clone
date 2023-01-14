import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage_styles.css';

function LoginPage(){
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  const [logJsonData, setLogJsonData] = useState({});
  const [loginValue, setLoginValue] = useState(false);

  function handleLoginSubmitBtn(e) {
    e.preventDefault();
    setLoginValue(true);
    console.log(loginEmail.current.value);
    console.log(loginPassword.current.value);

    const loginJsonData = {
        Email:loginEmail.current.value,
        Password:loginPassword.current.value
    }
    
    setLogJsonData(loginJsonData);
    loginEmail.current.value="";
    loginPassword.current.value="";
  }
  
  const navigate = useNavigate();
  const redirectToOtp = ()=>{
         console.log("function called");
         navigate("/Otp");
  }

  useEffect(()=>{
    if(loginValue) {
     async function fetchApi(){
     let options = {
         method:"POST",
         mode:"cors",
         headers:{
             "Content-Type":"application/json",
             "Accept":"application/json"
         },
         body:JSON.stringify(logJsonData),
     }
     const response =  await fetch("http://localhost:5000/api/login", options);
     const data = await response.json();
     const inFifteenMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
     Cookies.set("jwt_token", data.jwtToken, {expires:inFifteenMinutes});
     if(response.ok){
       redirectToOtp();
     }
 }
 fetchApi(); 
 }
 return ()=>{
  setLoginValue(false);
 }
},[loginValue])


  return (
    <Fragment>

          <form onSubmit={handleLoginSubmitBtn} className="login-page-form-element">
          <div>
          <p className="reg-form-tags">Email</p>
            <input type="text" className="inp-box" placeholder="Email" ref={loginEmail} required/>
          </div>

          <div>
            <p className="reg-form-tags">Password</p>
            <input type="password" className="inp-box" placeholder="Password" ref={loginPassword} required/>
          </div>

          <div className="submit-btn-container">
            {/* <input type="button" value='continue' className="submit-btn"/> */}
            <button className="LoginBtn" type="submit"> Continue </button>
          </div>
          </form>

    </Fragment>
  )
}


export default LoginPage;