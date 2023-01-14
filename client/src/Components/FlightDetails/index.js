import {BiRupee} from 'react-icons/bi'
import Popup from 'reactjs-popup'
import './flightdetails.css'

const FlightDetails = (props) => {
    const {flightDetails, handleBooking} = props
    const {flightId,airlineImageUrl,departureTime,arrivalTime,price,baggage,fromCity,toCity,airlineName} = flightDetails
    const handleBookNow=(flightDetails) => {
        handleBooking(flightDetails)
    }
    return ( 
        <div className="flight-details">
            <div className='lock-this-price-card'>
                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/farelock/fl_small_blue_plain_lock.png" className='lock-logo' alt="lock" />
                <p className='lockthisprice'>Lock this Price</p>
                <Popup
                    trigger={<button className="circle">i</button>}
                    modal
                >
                {close => (
                    <div className="popup-container">
                        <div className="popup-lock-prices">
                            <div className="lock-circle">
                                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/farelock/fl_small_blue_plain_lock.png" className='popup-lock-logo' alt="lock" />
                            </div>
                            <h1 className="popup-heading">Now Lock Prices & Pay Later</h1>
                        </div>
                
                        <p className="description">Unsure of your travel plans? Lock this ticket price for a small fee and complete your booking up to 7 days later!</p>
                        <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/farelock/hopperIntro.png?v=1" className="popup-image" alt="popup-logo" />
                        <div className="button-container">
                            <button className="okay-got-it-button" onClick={()=>close()}>OKAY, GOT IT!</button>
                        </div>
                    
                </div>
                )}
            </Popup>
            </div>
            

            <div className='flight-details-card'>
                <div className='airline-details'>
                    <img src={airlineImageUrl} className="airline-image" alt="image" />
                    <div>
                        <p className='airline-name'>{airlineName}</p>
                        <p className='description flight'>{flightId}</p>
                    </div>
                </div>
                <div>
                    <p className='time-style'>{departureTime.substring(11,16)}</p>
                    <p className='description'>{fromCity}</p>
                </div>
                <div>
                    <p className='time-style'>{arrivalTime.substring(11,16)}</p>
                    <p className='description'>{toCity}</p>
                </div>
                <div>
                    <p className='time-style rupee'><BiRupee />{price}</p>
                    <p className='description baggage'>{baggage}</p>
                </div>
                <div>
                    <button className='book-now-button' onClick={()=>handleBookNow(flightDetails)}>Book Now</button>
                </div>
            </div>
        </div>
     );
}
 
export default FlightDetails;