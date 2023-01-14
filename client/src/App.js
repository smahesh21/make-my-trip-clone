import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
// import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
import LandingPage from './Components/LandingPage/LandingPage';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import FilterSection from './Components/FilterSection'
import Booking from './Components/Booking'
import {ContextProvider} from './context/mmtcontext'
import Otp from './Components/OTP/otp';
import Payment from './Components/Payment/payment';

function App() {
  return (
    
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="flights" element={<FilterSection />} />
          <Route exact path="booking" element={<Booking />} />
          <Route exact path='Otp' element={<Otp/>}/>
          <Route exact path='payment' element={<Payment />}/>
        </Routes>
      </BrowserRouter> 
    </ContextProvider>
  );
}

export default App;
