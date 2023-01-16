import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header';
import './otp.css'


const Otp =()=>{
    const jwt_token = Cookies.get("jwt_token");
    const navigate = useNavigate();
    

    const otp = useRef(null);
    const [otpData, setOtpData] = useState({});
    const [otpValue, setOtpValue] = useState(false);
    const [otpResendValue, setOtpResendValue] = useState(false);
    const [otpMsg, setOtpMsg] = useState("");

    
    const handleOtpSubmit=(e)=>{
        e.preventDefault();
        setOtpValue(true);
        const otpData = {
            OTP:otp.current.value
        }

        setOtpData(otpData);
        otp.current.value = "";
    }

    useEffect(()=>{
        if(jwt_token=== undefined){
            navigate("/");
        }

        if(otpValue) {
         async function fetchApi(){
         let options = {
             method:"POST",
             mode:"cors",
             headers:{
                 "Content-Type":"application/json",
                 "Accept":"application/json",
                 "Authorization": `Bearer ${jwt_token}`
             },
             body:JSON.stringify(otpData),
         }
         const response =  await fetch("https://make-my-trip-clone-olive.vercel.app/api/verifyOTP", options);
         const data = await response.json();
         setOtpMsg(data.msg);
         if(response.ok){
            navigateToHome();
         }
        
     }
     fetchApi(); 
     }
     return ()=>{
        setOtpValue(false);
     }
 },[otpValue]);

    function navigateToHome(){
         navigate("/")
    }

    const onclickResendOtpBtn=()=>{
        setOtpResendValue(true);
    }

    useEffect(()=>{
        
        if(otpResendValue) {
         async function fetchApi(){
            console.log("fetching resend");
         let options = {
             method:"POST",
             mode:"cors",
             headers:{
                 "Content-Type":"application/json",
                 "Accept":"application/json",
                 "Authorization": `Bearer ${jwt_token}`
             },
         }
         const response =  await fetch("https://make-my-trip-clone-olive.vercel.app/api/resendOTP", options);
         const data = await response.json();
     }
     fetchApi(); 
     }
     return ()=>{
        setOtpResendValue(false);
     }
 },[otpResendValue]);

    return(
     <div>
        <Header />
        <div className='Otp-main-container'>
       <div className='otpCard'>
        <form onSubmit={handleOtpSubmit}>
            <h1 className='otp-heading'>Enter Otp</h1>
            <p className='otp-para'>Check your Email for the OTP</p>
            <input type="number" className='otp-input' ref={otp} required/><br />
            <button type='submit' className='otp-button'>Validate OTP</button>
            <button type='button' className='otp-button' onClick={onclickResendOtpBtn}>Resend OTP</button>
            <p className='otpErrorMsg'>{otpMsg}</p>
        </form>
      </div>
      </div>
     </div>
    )
}

export default Otp;