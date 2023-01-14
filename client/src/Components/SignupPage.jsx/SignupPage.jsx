import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Signupstyles.css";

function SignupPage() {
  const userName = useRef(null);
  const signUpEmail = useRef(null);
  const signingUpMoblie = useRef(null);
  const signUpDate = useRef(null);
  const signUpPassword = useRef(null);
  const [signUpJsonData, setSignUpJsonData] = useState({});
  const [signUpValue, setSignUpValue] = useState(false);
  const [signUpMsg, setSignUpMsg] = useState("");

  function handleSignUpSubmitBtn(e){
    e.preventDefault();
     setSignUpValue(true);
     let signUpGender = null;
        const radioInputEl = document.querySelectorAll('input[type="radio"]');
        for (let inputEl of radioInputEl){
            if(inputEl.checked){
                signUpGender = inputEl.value;
            }
        }
      let signUpJsonData = {
          Name:userName.current.value,
          Email:signUpEmail.current.value,
          mobile_no:signingUpMoblie.current.value,
          Date_of_Birth:signUpDate.current.value,
          Password:signUpPassword.current.value,
          Gender:signUpGender,
      }
        setSignUpJsonData(signUpJsonData)
        userName.current.value="";
        signUpEmail.current.value="";
        signingUpMoblie.current.value="";
        signUpDate.current.value="";
        signUpPassword.current.value="";
      }

      useEffect(()=>{
        if(signUpValue) {
         async function fetchApi(){
         let options = {
             method:"POST",
             mode:"cors",
             headers:{
                 "Content-Type":"application/json",
                 "Accept":"application/json"
             },
             body:JSON.stringify(signUpJsonData),
          }
         const response =  await fetch("http://localhost:5000/api/register", options);
         const data = await response.json();
         console.log(data);
         setSignUpMsg(data.msg);
        
     }
     fetchApi(); 
     }
     return ()=>{
        setSignUpValue(false);
     }
 },[signUpValue])

  return (
    <Fragment>
      <form onSubmit={handleSignUpSubmitBtn}>
      <div className="name-container">
        <div className="name-text-container">
          <p className="reg-form-tags">Username</p>
        </div>
        <input type="text" className="inp-box" placeholder="Username" ref={userName} required/>
      </div>
      <div>
        <p className="reg-form-tags">Email</p>
        <input type="text" className="inp-box" placeholder="Email" ref={signUpEmail} required/>
      </div>
      <div>
        <p className="reg-form-tags">Phone Number</p>
        <input type="text" className="inp-box" placeholder="Phone Number" ref={signingUpMoblie} required/>
      </div>
      <div>
        <p className="reg-form-tags" >
          Date Of Birth
        </p>
        <input type="date" className="inp-box" ref={signUpDate} required/>
      </div>

      <div>
        <p className="reg-form-tags">
          Gender
        </p>
        <div className="gender-container">
          <div className="gender-container-radio" >        
            <label htmlFor="male">Male</label>
            <input type="radio" value="Male" className="gender-radio-btn" id="male" name="gender" onChange={e=>{}} checked/>
          </div>
          <div className="gender-container-radio" >
            <label htmlFor="female">Female</label>
            <input type="radio" value="Female" className="gender-radio-btn" id="female" name="gender" />
          </div>
          <div className="gender-container-radio" >
            <label htmlFor="other">Other</label>
            <input type="radio" value="Other" className="gender-radio-btn" id="other" name="gender" />
          </div>
        </div>
      </div>

      <div>
        <p  className="reg-form-tags">Password</p>
        <input type="password" className="inp-box" placeholder="Password" ref={signUpPassword} required/>
      </div>
      
      <div className="submit-btn-container">
        {/* <input type="button" placeholder="continue" /> */}
        <button className="signUpBtn" type="submit"> Continue </button>
        <p className="regErrorMsg">{signUpMsg}</p>
      </div>
      </form>

    </Fragment>
  );
}

export default SignupPage;
