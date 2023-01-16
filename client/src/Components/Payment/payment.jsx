import Cookies from 'js-cookie';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header'
import { useFlightsData, usePassengerName, useSearch, useSeatNumber, useSeatNumberUpdate } from '../../context/mmtcontext';
import './payment.css'


function loadScript(src){
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src=src;
      
        script.onload = () =>{
            resolve(true);
        }
        script.onerror = ()=> {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

const feeAndSurcharges = 652
const otherServices = 10



const Payment = ()=> {
    const [orderDetails, setOrderDetails] = useState({})
    const [isClickedOnSend, setSendTicket] = useState(false)
    const [isPaymentFinished, setIsPaymentFinished] = useState(false);
    const [clickedOnPaymnetBtn, setClickedOnPaymnetBtn] = useState(false);
    const [isTicketSent, setIsTicketSent] = useState(false)
    const passengerName = usePassengerName()
    const seatNumber = useSeatNumber()
    const flight = useFlightsData()
    const setSeatNumber = useSeatNumberUpdate()

    const jwtToken = Cookies.get("jwt_token")
    const amount = otherServices + feeAndSurcharges + seatNumber.length * flight.price

    const navigate = useNavigate()
   

    useEffect(()=>{

        if (jwtToken===undefined) {
            navigate("/")
        }
        if(clickedOnPaymnetBtn){
           
        async function displayRazorpay(){
            console.log(loadScript)
            const result = loadScript("https://checkout.razorpay.com/v1/checkout.js")
            .then(response=>console.log(response))
            .catch(error=>console.log(error));
    
            if(!result){
                alert("Razorpay SDK failed to load. Are you online!");
                return
            } 
            const amountData = {amount}
            const razorpayOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization": `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(amountData),
              };
    
            
            const response = await fetch("https://mmt-project-backend.vercel.app/api/razorpay", razorpayOptions);
            
            if (response.ok) {
                const data = await response.json();
                setOrderDetails(data)
                console.log(data);

                const options = {
                    "key": "rzp_test_disUdWK4za85Ty", // Enter the Key ID generated from the Dashboard
                    "amount": data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": data.currency,
                    "name": "MMT",
                    "description": "Test Transaction",
                    "image": "https://mir-s3-cdn-cf.behance.net/projects/404/b26ea8114645703.603f3e4094776.png",
                    "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler":function(response){
                            setIsPaymentFinished(true);
                    },
                };
                    const paymentObj = new window.Razorpay(options);
                    paymentObj.open();
            } else {
                const paymentDetails = {
                    id: "Failed",
                    amount: `${amount}`
                }
                setOrderDetails(paymentDetails)
            }
        }

        displayRazorpay()

    }

        return()=>{
            setClickedOnPaymnetBtn(false);
        }

    },[clickedOnPaymnetBtn])

    console.log(`isTicket: ${isTicketSent}`)

    const handleGoToHome = () => {
        navigate("/")
    }

    useEffect(() => {

        const ticketData = {
            Passenger_Name: passengerName,
            Ceat_Number : seatNumber.join(",")
          }

        async function ticketApi() {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify(ticketData),
            };
      
            const response = await fetch("https://mmt-project-backend.vercel.app/api/ticket",options)
            if (response.ok) {
              console.log(response)
              setIsTicketSent(true)
            }
          }

          if (isClickedOnSend) {
            ticketApi()
            setSeatNumber([])
          }

          return () => {
            setSendTicket(false)
            setIsTicketSent(false)
          }
    },[isClickedOnSend])

    return (
        <div>
            <Header />
            <div className='payment-container'>
            {isPaymentFinished ?<>  <div className='payment-card'>
            {orderDetails.id !== "Failed" ? <h1>Payment ID: <span>{orderDetails.id}</span></h1>: null}
                {orderDetails.id === "Failed"? <h2 className='payment-failed'>Payment Failed</h2>:<h2 className='paid-successfully'>Paid Successfully</h2>}
                <h2>Rupees: {orderDetails.amount}</h2>
                {orderDetails.id === "Failed" ? <button className='payment-send-button'>
                    Try Again
                </button> :<button onClick={()=>setSendTicket(true)} className='payment-send-button'>
                    Send ticket details
                </button>}
                {orderDetails.id !== "Failed" ? isTicketSent ? <h2 className='ticket-sent'>Ticket is sent to your Email.</h2> : null : null }
                {orderDetails.id !== "Failed" ? isTicketSent ? <button type='button' onClick={handleGoToHome} className='go-to-home'>Go to Home</button> : null : null }
            </div> 
            </>
            : <div className='payment-card'>
             <h1 className='payment-heading'>Click here to proceed payment</h1>
             <h2>Ticket Fare: {amount}</h2>
                 <button onClick={()=>setClickedOnPaymnetBtn(true)} className='payment-send-button'>Contniue Payment</button>
             </div>}
        </div>
        </div>
        
    )

}

export default Payment;