import { useFlightsData,usePassengerName, usePassengerNameUpdate, useSeatNumber } from '../../context/mmtcontext'
import Popup from 'reactjs-popup'
import {BsArrowRight} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react'
import BookingSeat from '../BookingSeat/BookingSeat'
import './booking.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginPage from '../LoginPage/LoginPage'
import Header from '../Header/header'

const Booking = () => {
    //const passengerName = useRef(null);
    const passengerEmail = useRef(null);
    const passengerMobileNo = useRef(null);
    const passengerDate  = useRef(null);
    const [jsonData, setJsonData] = useState({});
    const [value, setValue] = useState(false);
    const [msg, setMsg] = useState("");
    const [isCLickedOnBookingPageContinue, setIsClickedOnBookingContinue] = useState(false)

    const flights = useFlightsData()
    const passengerName = usePassengerName()
    const setPassengerName = usePassengerNameUpdate()
    const seatNumber = useSeatNumber()

    const feeAndSurcharges = 652
    const otherServices = 10

    const date = new Date()
    const formattedDate = date.toLocaleDateString('default',{month:'short',day:'numeric'});

    
    date.setHours(date.getHours() + 2);
    const afterTwoHours = date.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' });
    date.setHours(date.getHours() + 4)
    const afterFourHours = date.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' });


    let box = null;
    let box1 = null;
    const travelLeftBtn=()=>{
        box.scrollLeft -= 350
    }
    const travelRightBtn=()=>{
        box.scrollLeft += 350
    }

    const travelLeftBtnOne=()=>{
        box1.scrollLeft -= 500
    }
    const travelRightBtnOne=()=>{
        box1.scrollLeft += 500
    }

    const onclickMaleLabel=()=>{
        document.getElementById("passengerLabelFemale").classList.remove("passenger-male");
        let labelEl = document.getElementById("passengerLabel");
        labelEl.classList.add("passenger-male");
    }

    const onclickFemaleLabel=()=>{
        document.getElementById("passengerLabel").classList.remove("passenger-male");
        let labelEl1 = document.getElementById("passengerLabelFemale");
        labelEl1.classList.add("passenger-male");
    }

    const handleContinueBtn=(e)=>{
        e.preventDefault();
        setValue(true);
        let passengerGender = null;
        const radioInputEl = document.querySelectorAll('input[type="radio"]');

        for (let inputEl of radioInputEl){
            if(inputEl.checked){
                passengerGender = inputEl.value;
            }
        }

        let jsonData = {
             "Name":passengerName,
             "Email":passengerEmail.current.value,
             "Gender":passengerGender,
             "mobile_no": passengerMobileNo.current.value, 
             "Date_of_Birth":passengerDate.current.value
        }
        setJsonData(jsonData);   
    }

    useEffect(()=>{
         box = document.getElementById('travel-slider-container');
         box1 = document.getElementById('travel-claim-slider-container');
    },[])

    const jwtToken = Cookies.get("jwt_token");

    useEffect(()=>{
           if(value) {
            console.log(jsonData);
            async function fetchApi(){
            let options = {
                method:"POST",
                mode:"cors",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization":`Bearer ${jwtToken}`
                },
                body:JSON.stringify(jsonData),
            }
            const response =  await fetch("https://mmt-project-backend.vercel.app/api/passengers", options)
            if(response.ok){
                setIsClickedOnBookingContinue(true);
            }else{
                const data = await response.json();
                setMsg(data.Message);
            }
        }
        fetchApi(); 
        }
        return ()=>{
            setValue(false);
        }
    },[value])

    return (
        <div>
            <Header />
            <div className="booking-page">
            <div className='booking-page-header'>
                <h1 className='complete-your-booking'>Complete your booking</h1>
                <div className='menu-items-container'>
                    <p className='menu-items'>Flights Summary</p>
                    <p className='menu-items'>.</p>
                    <p className='menu-items'>Travel Insurance</p>
                    <p className='menu-items'>.</p>
                    <p className='menu-items'>Traveller Details</p>
                    <p className='menu-items'>.</p>
                    <p className='menu-items'>Seats & Meals</p>
                    <p className='menu-items'>.</p>
                    <p className='menu-items'>Add-ons</p>
                </div>
            </div>
            <span className="bgGradient"></span>
            
            <div className='booking-details-container'>
                { !isCLickedOnBookingPageContinue ?
                    <div>
                        <div className='booking-details-left-container'>
                    <div className='bookings-container'>
                        <div className="bookings-top-container">
                            <div>
                                <h1 className='from-to-locations'>{flights.fromCity}<span><BsArrowRight className='arrow-icon' size="16px" /></span>{flights.toCity}</h1>
                                <p className='date-styling'>{formattedDate}</p>
                            </div>
                            <div>
                                <p className='cancellation-fee-apply'>CANCELLATION FEES APPLY</p>
                                <div className='view-fare-rules-container'>
                                    
                                    <Popup trigger={<button className='view-fare-rules'>VIEW FARE RULES</button>} modal>
                                        {close => (
                                            <div className="popup-container">
                                                <button className="close" onClick={close}>
                                                     &times;
                                                </button>
                                            <h1 className="popup-fare-rules">Fare rules</h1>
                                            <div className="popup-cancellation-date-charges">
                                                <button className="charges-button" active>Cancellation charges</button>
                                                <button className="charges-button">Date change charges</button>
                                            </div>
                                            <div className="popup-card">
                                                <div className="popup-airline-logo-locations">
                                                    <img src={flights.airlineImageUrl} className='popup-airline-logo' alt="airline" />
                                                    <p className='popup-locations'>{flights.fromCity} - {flights.toCity}</p>
                                                </div>
                                                <div className='popup-fare-details'>
                                                    <div className='card'>
                                                        <div className='time-frame-container'>
                                                            <h1 className='time-frame'>Time frame</h1>
                                                            <p className='card-text'>(From Scheduled flight departure)</p>
                                                        </div>
                                                    </div>
                                                    <div className='card'>
                                                        <div className="fee-container">
                                                            <h1 className='time-frame'>Airline Fee + MMT Fee</h1>
                                                            <p className='card-text'>(Per passenger)</p>
                                                        </div>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>0 hours to 2 hours*</p>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>ADULT: <span className="span-text">Non Refundable</span></p>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>2 hours to 365 days*</p>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>ADULT: <span className="span-text"><BiRupee size={15} className="rupee-icon" />1,922 + <BiRupee size={15} className="rupee-icon" />300</span></p>
                                                    </div>
                                                </div>
                                                <p className='card-text star'>*From the Date of Departure</p>
                                            </div>
                                            <div className='popup-bottom'>
                                                <p><span>*Important</span>The airline fee is indicative. MakeMyTrip does not guarantee the accuracy of this information. All fees mentioned are per passenger.</p>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                </div>
                            </div>
                        </div>
                        <div className="bookings-middle-container">
                                <img src={flights.airlineImageUrl} className='airline-logo' alt="airline" />
                                <p className='airline-name'>{flights.airlineName}</p>
                                <p className='economy'>Economy</p>
                        </div>
                        <div className="bookings-bottom-container">
                            <div className='time-container'>
                                <p className='time'>{flights.departureTime.substring(11,16)}</p>
                                <p className='time'>{flights.arrivalTime.substring(11,16)}</p>
                            </div>
                            <div className='circles-line'>
                                <span className='circle'></span>
                                <span className='line-border'></span>
                                <span className='circle'></span>
                            </div>
                            <div className='locations-container'>
                                <p className="time">{flights.fromCity}</p>
                                <p className="time">{flights.toCity}</p>
                            </div>
                            <div className='baggage-container'>
                                <p className='baggage'>Baggage</p>
                                <p className='baggage-weight'>{flights.baggage}</p>
                            </div>
                        </div>
                    </div>
                    <div className='cancellation-container'>
                        <div className="cancellation-top-container">
                            <h1 className='cancellation'>Cancellation Refund Policy</h1>
                                
                            <Popup trigger={<button className='view-policy-button view-policy'>View Policy</button>} modal>
                                        {close => (
                                            <div className="popup-container">
                                                <button className="close" onClick={close}>
                                                     &times;
                                                </button>
                                            <h1 className="popup-fare-rules">Fare rules</h1>
                                            <div className="popup-cancellation-date-charges">
                                                <button className="charges-button" active>Cancellation charges</button>
                                                <button className="charges-button">Date change charges</button>
                                            </div>
                                            <div className="popup-card">
                                                <div className="popup-airline-logo-locations">
                                                    <img src={flights.airlineImageUrl} className='popup-airline-logo' alt="airline" />
                                                    <p className='popup-locations'>{flights.fromCity} - {flights.toCity}</p>
                                                </div>
                                                <div className='popup-fare-details'>
                                                    <div className='card'>
                                                        <div className='time-frame-container'>
                                                            <h1 className='time-frame'>Time frame</h1>
                                                            <p className='card-text'>(From Scheduled flight departure)</p>
                                                        </div>
                                                    </div>
                                                    <div className='card'>
                                                        <div className="fee-container">
                                                            <h1 className='time-frame'>Airline Fee + MMT Fee</h1>
                                                            <p className='card-text'>(Per passenger)</p>
                                                        </div>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>0 hours to 2 hours*</p>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>ADULT: <span className="span-text">Non Refundable</span></p>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>2 hours to 365 days*</p>
                                                    </div>
                                                    <div className='card'>
                                                        <p className='card-text'>ADULT: <span className="span-text"><BiRupee size={15} className="rupee-icon" />1,922 + <BiRupee size={15} className="rupee-icon" />300</span></p>
                                                    </div>
                                                </div>
                                                <p className='card-text star'>*From the Date of Departure</p>
                                            </div>
                                            <div className='popup-bottom'>
                                                <p><span>*Important</span>The airline fee is indicative. MakeMyTrip does not guarantee the accuracy of this information. All fees mentioned are per passenger.</p>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>     
                        </div>
                        <div className="cancellation-middle-container">
                            <img src={flights.airlineImageUrl} className='airline-logo' alt="airline" />
                            <p className='airline-name'>{flights.fromCity} - {flights.toCity}</p>
                        </div>
                        <div className='cancellation-penality-container'>
                            <div className='cancellation-penality'>
                                <h1 className='cancellation-penality-text'>Cancellation Penality :</h1>
                                <h1 className='cancellation-penality-text'>Cancel Between (IST) :</h1>
                            </div>
                            <div className='cancellation-penality-duraion'>
                                <div className='price-container'>
                                    <p className='price'><BiRupee />3,800</p>
                                    <p className='price'><BiRupee />10,320</p>
                                </div>
                                <div className='colored-line'></div>
                                <div className='dates-container'>
                                    <h1 className='date-text'>Now</h1>
                                    <div>
                                        <h1 className='date-text'>{formattedDate}</h1>
                                        <p className='cancellation-penality-text penality-time'>{afterTwoHours}</p>
                                    </div>
                                    <div>
                                        <h1 className='date-text'>{formattedDate}</h1>
                                        <p className='cancellation-penality-text penality-time'>{afterFourHours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cancellation-bottom-container">
                            <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/fare-upgrade.png" className='cancellation-logo' alt="cancellation" />
                            <h1 className='more-fare'>More fares with flexible refund & date change policy available!</h1>
                            <button className='upgrade-button upgrade'>UPGRADE</button>
                        </div>
                    </div>
                    <div className='unsure-of-your-travel-plans'>
                        <h1 className='unsure-your-travel-plans-text'>Unsure of your travel plans?</h1>
                        <div className='add-free-date-change-card'>
                            <div className='add-free-card'>
                                <input type="checkbox" className='checkbox' />
                            </div>
                            <div className='add-free-card middle'>
                                <p className='add-free-text'>Add Free Date Change</p>
                                <p className='add-free-description'><span>Save up to <BiRupee className='rupee-icon' />3,250</span> on date change charges up to 2 hours before departure. You just pay the fare difference.</p>
                                <a href="https://promos.makemytrip.com/digit-tnc-dom/TermsAndConditions.html" target="_blank">View T&C</a>
                            </div>
                            <div className='add-free-card bottom'>
                                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/travel-plan-fdc-card.png" className='calender-logo' />
                                <p className='travel-plans-price'><BiRupee />207</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='refund-container'> 
                          <p className='refund-para'>100% refund on flight cancellations guaranteed.</p>
                          <p className='refund-para-2'>On Covid + cases. No questions asked . #MMTPromise <span className='refund-span'>Know More</span></p>
                </div>

                <div className='important-container'>
                          <h1 className='important-heading'>Important Information</h1>
                          <div className='important-container-para-1'>
                                <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/imp-info.png' className='important-image' alt='asset'/>
                                <p className='important-container-para-1-1'>Check travel guidelines and baggage information below:</p>
                          </div>
                          <ul className='important-unordered-list'>
                                <li><p className='important-unordered-list-para-1'>Wearing masks/face covers is no longer mandatory. However, all travellers are advised to wear them, in view of the threat posed by COVID-19.</p></li>
                                <li><p className='important-unordered-list-para'>For the complete list of travel guidelines issued by Indian States and UTs, <span>click here</span></p></li>
                                <li><p className='important-unordered-list-para important-para'>Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges</p></li>
                          </ul>
                </div>

                <div className='travel-insurance-container'>
                <div className='travel-image-heading-container-1'>
                   <div className='travel-image-heading-container'>
                        <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/insurance-shield.png' className='travel-image' alt='travel'/>
                        <h1 className='travel-heading'>Travel Insurance</h1>
                   </div>
                   <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/insurance-digit.png' className='travel-image-2' alt='flights'/>
                </div>
                
                <div className='travel-para-slider-container'>
                  <div className='travel-pra-btn-container'>
                    <p className='travel-para'><span className='travel-span-para'>₹ 249/</span>Traveller (18% GST included)</p>
                    <div className='travel-slider-btn-container'>
                            <button onClick = {travelLeftBtn} className='travel-slider-btn'>&lt;</button>
                            <button onClick = {travelRightBtn} className='travel-slider-btn'>&gt;</button>
                    </div>
                  </div>
                  <div id='travel-slider-container' className='travel-slider-container'>
                      <div className='travel-card'>
                          <img src='https://imgak.mmtcdn.com/flights/assets/media/mobile/common/2X/rt_ia2.png' className='travel-card-image' alt='travel-card'/>
                          <div className='travel-card-description'>
                              <p className='travel-card-description-para'>Get up to ₹ 3,000</p>
                              <p className='travel-card-description-para-2'>Flights Cancelled</p>
                          </div>
                      </div>

                      <div className='travel-card'>
                          <img src='https://imgak.mmtcdn.com/flights/assets/media/mobile/common/2X/rt_ia9.png' className='travel-card-image' alt='travel-card'/>
                          <div className='travel-card-description'>
                              <p className='travel-card-description-para'>Get flat ₹ 1,250</p>
                              <p className='travel-card-description-para-2'>Flight Delayed</p>
                          </div>
                      </div>

                      <div className='travel-card'>
                          <img src='https://imgak.mmtcdn.com/flights/assets/media/mobile/common/2X/rt_ia5.png' className='travel-card-image' alt='travel-card'/>
                          <div className='travel-card-description'>
                              <p className='travel-card-description-para'>Get up to ₹ 2,500</p>
                              <p className='travel-card-description-para-2'>Missed Flight</p>
                          </div>
                      </div>

                      <div className='travel-card'>
                          <img src='https://imgak.mmtcdn.com/flights/assets/media/mobile/common/2X/rt_ia4.png?v=5' className='travel-card-image' alt='travel-card'/>
                          <div className='travel-card-description'>
                              <p className='travel-card-description-para'>Get flat ₹ 1,500</p>
                              <p className='travel-card-description-para-2'>Baggage Delay</p>
                          </div>
                      </div>

                      <div className='travel-card'>
                          <img src='https://imgak.mmtcdn.com/flights/assets/media/mobile/common/2X/rt_ia6.png' className='travel-card-image' alt='travel-card'/>
                          <div className='travel-card-description'>
                              <p className='travel-card-description-para'>Get flat ₹ 2,500</p>
                              <p className='travel-card-description-para-2'>Diverted Flight</p>
                          </div>
                      </div>

                      <div className='travel-card'>
                          <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/insurance-accident.png' className='travel-card-image' alt='travel-card'/>
                          <div className='travel-card-description'>
                              <p className='travel-card-description-para'>Get flat ₹ 50,000</p>
                              <p className='travel-card-description-para-2'>Personal Accident</p>
                          </div>
                      </div>
                  </div>
                </div> 
              
                <div className='travel-claim-container'>
                  <div className='travel-pra-btn-container'>
                    <h1 className='travel-claim-heading'>Claim processed in 24 hrs directly on MMT</h1>
                    <div className='travel-claim-btn-container'>
                            <button onClick = {travelLeftBtnOne} className='travel-claim-btn '>&lt;</button>
                            <button onClick = {travelRightBtnOne} className='travel-claim-btn'>&gt;</button>
                    </div>
                 
                  </div> 

                  <div id='travel-claim-slider-container' className='travel-claim-slider-container'>
                        <div className='travel-claim-card'>
                             <div className='travel-claim-card-image-para-container'>
                             <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/testimonial.png' className='travel-claim-card-image' alt='comma'/>
                             <p className='travel-claim-card-para'> It was my first time when I took insurance along with my travel. Digit executives were very helpful. The settlement was quick.</p>
                            </div>
                             <p className='travel-claim-card-name'>~Priyabrata Das</p>
                        </div>

                        <div className='travel-claim-card'>
                             <div className='travel-claim-card-image-para-container'>
                             <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/testimonial.png' className='travel-claim-card-image' alt='comma'/>
                             <p className='travel-claim-card-para'> The whole process was pretty simple and hassle free. I just dropped a mail for claim intimation and I received the settlement amount within 48 hours.</p>
                            </div>
                             <p className='travel-claim-card-name'>~Aditi Golsalves</p>
                        </div>

                        <div className='travel-claim-card'>
                             <div className='travel-claim-card-image-para-container'>
                             <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/testimonial.png' className='travel-claim-card-image' alt='comma'/>
                             <p className='travel-claim-card-para'> Smooth claim application process without any follow-up. Claim fund transfer was faster than refund from flight operator for flight cancellation.</p>
                            </div>
                             <p className='travel-claim-card-name'>~Padmini</p>
                        </div>
                    </div>
                </div>

               

                </div>
                
                {jwtToken === undefined ? <Popup trigger={<button type="button" className="click-here-to-login-button">Booking</button>} modal>
                    {()=>(
                        <div className='login-popup'>
                            <LoginPage />
                        </div>
                    )}
                </Popup> :
                <form onSubmit={handleContinueBtn}>
                <div className='passengers-container'>
                       <h1 className='passengers-heading'>Traveller Details</h1>  
                       <div className='user-container'>
                            <img src='https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/traveller-placeholder2.png' className='user-image' alt='user' />     
                            <h1 className='user-heading'>ADULT (12 yr+)</h1>
                       </div>    
                       <div className='passenger-input-container'>
                            <input id='name' onChange={(event) => setPassengerName(event)} placeholder='Enter your Name' className='passenger-input'  required />
                            <input id='email' ref={passengerEmail} placeholder='Enter your Email' className='passenger-input' required/>
                            
                            <div className='passengers-label-container'>
                            <label id='passengerLabel' htmlFor="male" onClick={onclickMaleLabel} className="passenger-label">
                                <input type="radio" id="male" name="gender" value="male" checked className='passenger-input-radio' />
                                    MALE
                                </label>
                                <br />
                                <label id='passengerLabelFemale' onClick={onclickFemaleLabel} htmlFor="female" className='passenger-label'>
                                    <input type="radio" id="female" name="gender" value="female"  className='passenger-input-radio' />
                                    FEMALE
                                </label>
                            </div>
                            <input id='mobileNumber' type="number" placeholder='Enter your Mobile Number' className='passenger-input' required ref={passengerMobileNo}/>
                            <input id='date' type="date" placeholder='Enter DOB' className='passenger-input' required ref={passengerDate}/> <br />
                      </div>
                      <p className='errorMsg'>{msg}</p>
                </div>

                {/* <div className='booking-details-sent-container'>
                     <h1 className='booking-details-heading'>Booking details will be sent to</h1>
                     <input id='bookingMobileNumber' type="number" placeholder='Enter your Mobile Number' className='passenger-input' required ref={passengerUpdateMobileNo}/>
                     <input id='bookingEmail' placeholder='Enter your Email' className='passenger-input' required ref={passengerUpdateEmail} />
                                        </div>*/}
                
                <button type='submit'  className='bookingContinueBtn'>CONTINUE</button>
                </form>
                } 

                </div>
                : <BookingSeat /> } 
            </div>
                <div className='booking-details-right-container'>
                    <div className='fare-summary-card'>
                        <h1 className='fare-summary'>Fare Summary</h1>
                        <div className='base-fare-card'>
                            <div>
                                <AiOutlinePlusCircle className='circle-icon' />
                                <span className='summary-text'>Base Fare</span> 
                            </div>   
                            <p className='price'><BiRupee />{flights.price}</p>
                        </div>
                        <div className='base-fare-card'>
                            <div>
                                <AiOutlinePlusCircle className='circle-icon' />
                                <span className='summary-text'>Fee & Surcharges</span>
                            </div>
                            <p className='price'><BiRupee />{feeAndSurcharges}</p>
                        </div>
                        <div className='base-fare-card bottom-fare-summary-card'>
                            <div>
                                <AiOutlinePlusCircle className='circle-icon' />
                                <span className='summary-text'>Other Services</span>
                            </div>
                            <p className='price'><BiRupee />{otherServices}</p>
                        </div>
                        <div className='total-amount-container'>
                            <h1 className='total-amount'>Total Amount</h1>
                            <h1 className='total-amount'><BiRupee />{seatNumber.length * flights.price + feeAndSurcharges + otherServices}</h1>
                        </div>
                    </div>
                    <div className='second-container'>
                        <div className='promocodes-card'>
                            <h1 className='promo-text'>PROMO<span className='codes'>CODES</span></h1>
                            <div className='promo-code-logo-container'>
                                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/promo-code.png" className='promocode-logo' alt="promocode" />
                            </div>
                        </div>
                        <input type="search" className='input-element' placeholder='Enter promo code here' />
                        <div className='promo-card-one'>
                            <input type="radio" className='radio-element' />
                            <div className='promo-middle-card'>
                                <h1 className='promo-code'>MMTSUPER</h1>
                                <p className='promotext'>Use this coupon and get Rs 250 instant discount on your flight booking.</p>
                                <a href="https://www.makemytrip.com/promos/df-mmtsuper-amazon-22042022.html" target="_blank" className='anchor-element'>Terms & Conditions</a>
                            </div>
                            <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/INSTANT.png?v=1" className='promocodelogo' alt="promo" />
                        </div>
                        <div className='promo-card-one card-two'>
                            <input type="radio" className='radio-element' />
                            <div className='promo-middle-card'>
                                <h1 className='promo-code'>MMTAU</h1>
                                <p className='promotext'>Use this coupon and get Rs 250 instant discount on your flight booking.</p>
                                <a href="https://www.makemytrip.com/promos/df-mmtsuper-amazon-22042022.html" target="_blank" className='anchor-element'>Terms & Conditions</a>
                            </div>
                            <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/IC.png?v=1" className='promocodelogo' alt="promo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Booking;