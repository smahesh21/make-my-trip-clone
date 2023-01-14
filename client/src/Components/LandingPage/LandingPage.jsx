import React, { Fragment, useRef, useState } from "react";
import {
  useSearch,
  useSearchUpdate,
  useFromCity,
  useToCity,
  useDepartureDate,
  useDepartureDateUpdate,
  useFromCityUpdate,
  useToCityUpdate,
} from "../../context/mmtcontext";
import "./LandingPage_styles.css";
import Popup from "reactjs-popup";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import OffersPage from "../OffersPage/OffersPage";
import offerLogo from "../../Images/Screenshot from 2022-12-27 13-42-32.png";
import mylogo from "../../Images/myLogo.png";
import myTripLogo from "../../Images/myTripLogo.png";
import { SlPlane, SlSocialFacebook } from "react-icons/sl";
import {
  FaHotel,
  FaHome,
  FaTrain,
  FaPlane,
  FaBus,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { MdNaturePeople , MdOutlineLogout} from "react-icons/md";
import { GiBowman } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const fromCityNames = [
  {
    id: 1,
    cityName: "Hyderabad",
  },
  {
    id: 2,
    cityName: "Banglore",
  },
  {
    id: 3,
    cityName: "Chennai",
  },
  {
    id: 4,
    cityName: "Goa",
  },
  {
    id: 5,
    cityName: "Mumbai",
  },
  {
    id: 6,
    cityName: "Delhi",
  },
  {
    id: 7,
    cityName: "Nagpur",
  },
  {
    id: 8,
    cityName: "Kolkata",
  },
];

const toCityNames = [
  {
    id: 2,
    cityName: "Banglore",
  },
  {
    id: 3,
    cityName: "Chennai",
  },
  {
    id: 4,
    cityName: "Goa",
  },
  {
    id: 5,
    cityName: "Mumbai",
  },
  {
    id: 6,
    cityName: "Delhi",
  },
  {
    id: 7,
    cityName: "Nagpur",
  },
  {
    id: 8,
    cityName: "Kolkata",
  },
  {
    id: 9,
    cityName: "Hyderabad",
  },
];

function LandingPage() {
  const [blurBG, setBlurrBG] = useState(false);

  const isClickedOnSearch = useSearch();
  const fromCity = useFromCity();
  const toCity = useToCity();
  const setFromCity = useFromCityUpdate();
  const setToCity = useToCityUpdate();
  const departureDate = useDepartureDate();
  const jwtToken = Cookies.get("jwt_token")
  const setIsClickedOnSearch = useSearchUpdate();
  const setDepartureDate = useDepartureDateUpdate();
  const navigate = useNavigate();

  const handlingSearchAction = () => {
    setIsClickedOnSearch(true);
  };

  const handleFromCity = (event) => {
    console.log(event.target.value);
    setFromCity(event);
  };

  const handleToCity = (event) => {
    console.log(event.target.value);
    setToCity(event);
  };

  if (isClickedOnSearch) {
    navigate("/flights");
  }

  const handleLogout = ( ) => {
    Cookies.remove('jwt_token');
    navigate("/")

  }

  return (
    <Fragment>
      {/* -----------------------------------Landing Page-----------------------------------------*/}
      <div
        className={blurBG ? "container-with-blur" : "container"}
        id="landingPage-Container"
      >
        <div className="blue-box-container">
          <div className="nav-and-menu-box">
            <nav className="navigation-bar">
              <div>
                <img
                  className="compony-logo"
                  src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png"
                  alt="Logo"
                />
              </div>
              <div className="offers-and-logos">
                <div className="offer-container margin-nav-logo">
                  <img src={offerLogo} className="offerLogo" alt="offerLogo" />
                  <div>
                    <span>Super Offers</span>
                    <p>Explore greate Deals and offers</p>
                  </div>
                </div>
                <div className="mybiz-container margin-nav-logo">
                  <img
                    className="my-biz-logo"
                    src="https://imgak.mmtcdn.com/mybiz/assets/images/landing/myBizLogo_light.png"
                    alt="MyBIZlogo"
                  />
                  <div>
                    <span>Introducing myBIZ</span>{" "}
                    <p>Bussiness travel solution</p>
                  </div>
                </div>
                <div className="my-trip-container">
                  <img
                    src={myTripLogo}
                    className="my-trip-logo"
                    alt="MY TRIP LOGO"
                  />
                  <div>
                    <span>My Trips</span>
                    <p>Manage Your Bookings</p>
                  </div>
                </div>
                
              </div>
              <div>
                {jwtToken !== undefined ? <button className="logout-button" onClick={handleLogout}><MdOutlineLogout className="logout-icon" /></button>
          : <Popup
            trigger={
              <button className="login-signup-btn margin-nav-logo">
                <img className="my-logo" src={mylogo} alt="myLogo" />
                <span className="header-landing-btn">
                  Login or Create account
                </span>
              </button>
            }
            modal
          >
            {() => <RegistrationPage />}
          </Popup>}
                </div>
            </nav>
          </div>



          {/* -----------------------------------Menu Bar-----------------------------------------*/}

          <div className="menu-bar">
            <div className="menuIconAndName-container">
              <SlPlane className="menu-icon" />
              <p>Flights</p>
            </div>
            <div className="menuIconAndName-container">
              <FaHotel className="menu-icon" />
              <p>Hotels</p>
            </div>
            <div className="menuIconAndName-container">
              <FaHome className="menu-icon" />
              <p>Home Stay</p>
            </div>
            <div className="menuIconAndName-container">
              <MdNaturePeople className="menu-icon" />
              <p>Holidays</p>
            </div>
            <div className="menuIconAndName-container">
              <FaTrain className="menu-icon" />
              <p>Trains</p>
            </div>
            <div className="menuIconAndName-container">
              <FaBus className="menu-icon" />
              <p>Bus</p>
            </div>
            <div className="menuIconAndName-container">
              <AiFillCar className="menu-icon" />
              <p>Cabs</p>
            </div>
            <div className="menuIconAndName-container">
              <FaMoneyBillAlt className="menu-icon" />
              <p>Forex</p>
            </div>
            <div className="menuIconAndName-container">
              <FaPlane className="menu-icon" />
              <p>Charter Plane</p>
            </div>
            <div className="menuIconAndName-container">
              <GiBowman className="menu-icon" />
              <p>Activities</p>
            </div>
          </div>

          {/* -----------------------------------Flight Details Box-----------------------------------------*/}

          <div className="flight-details-box">
            <div className="flight-type">
              <div>
                <input type="radio" id="one way" name="typeOf-flight" />{" "}
                <label htmlFor="one way">One Way Trip</label>
                <input type="radio" id="Round Trip" name="typeOf-flight" />{" "}
                <label htmlFor="Round Trip">Round Trip</label>
                <input type="radio" id="Multicity" name="typeOf-flight" />
                <label htmlFor="Multicity">Multicity</label>
              </div>
              <div>
                <p className="flight-type-msg">
                  Book International and Domestic Flights
                </p>
              </div>
            </div>
            <div className="card-for-flight-details">
              <div className="from-card forHoverClass">
                <p>From</p>
                <select
                  onChange={(event) => setFromCity(event)}
                  value={fromCity}
                  className="landing-page-select-element"
                >
                  {fromCityNames.map((city) => (
                    <option className="select-element-styles" key={city.id}>{city.cityName}</option>
                  ))}
                </select>
                
              </div>
              <div className="to-card forHoverClass">
                <p>To</p>
                <select
                  onChange={(event) => setToCity(event)}
                  value={toCity}
                  className="landing-page-select-element"
                  name="cityNames"
                >
                  {toCityNames.map((city) => (
                    <option className="select-element-styles"  key={city.id}>{city.cityName}</option>
                  ))}
                </select>
                
              </div>
              <div className="departure-card forHoverClass">
                <p>Departure Date</p>
                <input
                  id="departure"
                  type="date"
                  value={departureDate}
                  className="landing-page-input-element"
                  onChange={(event) => setDepartureDate(event)}
                />
              </div>
              <div className="return-card forHoverClass">
                <p>Return Date</p>
                <input type="date" className="landing-page-input-element" />
              </div>
            </div>

            {/* -----------------------------------Fair type card-----------------------------------------*/}

            <div className="fair-msg-and-type">
              <p className="fair-msg">Select a fair type:</p>
              <div className="select-fair-msg">
                <p className="fair-types">
                  <input type="radio" name="type-of-fair" id="regular-fair" />
                  <label htmlFor="regular-fair">Regular Fair</label>
                </p>
                <p className="fair-types">
                  <input
                    type="radio"
                    name="type-of-fair"
                    id="Armed-forces-fair"
                  />
                  <label htmlFor="Armed-forces-fair">Armed Forces Fair</label>
                </p>
                <p className="fair-types">
                  <input type="radio" name="type-of-fair" id="Student-fair" />
                  <label htmlFor="Student-fair">Student Fair</label>
                </p>
                <p className="fair-types">
                  <input type="radio" name="type-of-fair" id="senior-fair" />
                  <label htmlFor="senior-fair">Senior Citizen Fair</label>
                </p>
                <p className="fair-types">
                  <input type="radio" name="type-of-fair" id="Doctors-fair" />
                  <label htmlFor="Doctors-fair">Doctors&Nurses Fair</label>
                </p>
                <p className="fair-types">
                  <input type="radio" name="type-of-fair" id="Double-fair" />
                  <label htmlFor="Double-fair">Double seat Fair</label>
                </p>
              </div>
            </div>
            {/* -----------------------------------The search Button-----------------------------------------*/}
            <div>
              <button className="search-btn" onClick={handlingSearchAction}>
                <h2 className="landing-search">Search</h2>
              </button>
            </div>
          </div>
        </div>

        {/* -----------------------------------The Explore More Card-----------------------------------------*/}

        <div className="explore-more-card">
          <div className="explore-more-item">
            <img
              src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png"
              alt=""
            />
            <p>where to go</p>
          </div>
          <div className="explore-more-item trip-money">
            <img
              src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png"
              alt=""
            />
            <div>
              <p>Trip Money</p>
              <span>Loan Credit and more</span>
            </div>
          </div>
          <div className="explore-int-flights">
            <img
              src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png"
              alt=""
            />
            <div>
              <p>Explore International Flights</p>
              <span>Cheapest flights to Paris, Bali, Tokyo and more</span>
            </div>
          </div>
          <div className="explore-more-item mice">
            <img
              src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png"
              alt=""
            />
            <div>
              <p>MICE</p>
              <span>Plan your offside with us</span>
            </div>
          </div>
          <div className="explore-more-item">
            <img
              src="https://promos.makemytrip.com/appfest/2x/gift%20card%201.png"
              alt=""
            />
            <p>Gift Card</p>
          </div>
        </div>
        {/* -------------------------------------------Offer Section--------------------------------------------- */}
        <OffersPage />

        {/* -------------------------------------------Bottom Section--------------------------------------------- */}

        <div className="offers-at-bottom">
          <div className="product-offering-sec">
            <p className="offers-headline">PRODUCT OFFERING</p>
            <p className="offers-options-detail">
              Flights, International Flights, Charter Flights, Hotels,
              International Hotels, Homestays and Villas, Activities, Holidays
              In India, International Holidays, Book Hotels From UAE, myBiz for
              Corporate Travel, Book Online Cabs, Book Bus Tickets, Book Train
              Tickets, Cheap Tickets to India, Book Flights From US, Book
              Flights From UAE, Trip Planner, Gift Cards, Trip Money, Trip
              Ideas, Travel Blog, PNR Status, MakeMyTrip Advertising Solutions,
              One Way Cab
            </p>
          </div>

          <div>
            <p className="offers-headline">MAKEMYTRIP</p>
            <p className="offers-options-detail">
              About Us, Investor Relations, Careers, MMT Foundation, CSR Policy,
              myPartner - Travel Agent Portal, Foreign Exchange, List your
              hotel, Partners- Redbus, Partners- Goibibo, Advertise with Us
            </p>
          </div>
          <div>
            <p className="offers-headline">ABOUT THE SITE</p>
            <p className="offers-options-detail">
              Customer Support, Payment Security, Privacy Policy, User
              Agreement, Terms of Service, More Offices, Make A Payment, Work
              From Home
            </p>
          </div>
          <div>
            <p className="offers-headline">QUICK LINKS</p>
            <p className="offers-options-detail">
              Delhi Chennai Flights, Delhi Mumbai Flights, Delhi Goa Flights,
              Chennai Mumbai flights, Mumbai Hyderabad flights, Kolkata to Rupsi
              Flights, Rupsi to Guwahati Flights, Pasighat to Guwahati Flights,
              Delhi to Khajuraho Flights, Cochin to Agatti Island Flights,
              Hotels in Delhi, Hotels in Mumbai, Hotels In Goa, Hotels In
              Jaipur, Hotels In Ooty, Hotels In Udaipur, Hotels in Puri, Hotels
              In North Goa, Hotels In Rishikesh, Honeymoon Packages, Kerala
              Packages, Kashmir Packages, Ladakh Packages, Goa Packages,
              Thailand Packages, Sri Lanka Visa, Thailand Visa, Explore Goa,
              Explore Manali, Explore Shimla, Explore Jaipur, Explore Srinagar
            </p>
          </div>
          <div>
            <p className="offers-headline">IMPORTANT LINKS</p>
            <p className="offers-options-detail">
              Cheap Flights, Flight Status, Kumbh Mela, Domestic Airlines,
              International Airlines, Indigo, Spicejet, GoAir, Air Asia, Air
              India, Indian Railways, Trip Ideas, Beaches, Honeymoon
              Destinations, Romantic Destinations, Popular Destinations, Resorts
              In Udaipur, Resorts In Munnar, Villas In Lonavala, Hotels in
              Thailand, Villas In Goa, Domestic Flight Offers, International
              Flight Offers, UAE Flight Offers, USA, UAE, Saudi Arabia, UK, Oman
            </p>
          </div>
          <div>
            <p className="offers-headline">CORPORATE TRAVEL</p>
            <p className="offers-options-detail">
              Corporate Travel, Corporate Hotel Booking, Corporate Flight
              Booking, Business Travel for SME, GST Invoice for International
              flights, Business Travel Solutions, GST Invoice for Bus, Corporate
              Bus booking, myBiz - Best Business Travel Platform, GST Invoice
              for Flights, GST Invoice for Corporate Travel, GST Invoice for
              Hotels, myBiz for Small Business, Free cancellation on
              International Flights
            </p>
          </div>
        </div>

        <div className="web-details-sec-container">
          <div className="website-details-section">
            <div>
              <h5>Why MakeMYTrip ?</h5>
              <p className="offers-options-detail">
                Established in 2000, MakeMyTrip has since positioned itself as
                one of the leading companies, providing great offers,
                competitive airfares, exclusive discounts, and a seamless online
                booking experience to many of its customers. The experience of
                booking your flight tickets, hotel stay, and holiday package
                through our desktop site or mobile app can be done with complete
                ease and no hassles at all. We also deliver amazing offers, such
                as Instant Discounts, Fare Calendar, MyRewardsProgram, MyWallet,
                and many more while updating them from time to time to better
                suit our customers’ evolving needs and demands.
              </p>
            </div>

            <div className="offer-sec-mid">
              <h5>Why MakeMYTrip ?</h5>
              <p className="offers-options-detail">
                At MakeMyTrip, you can find the best of deals and cheap air
                tickets to any place you want by booking your tickets on our
                website or app. Being India’s leading website for hotel, flight,
                and holiday bookings, MakeMyTrip helps you book flight tickets
                that are affordable and customized to your convenience. With
                customer satisfaction being our ultimate goal, we also have a
                24/7 dedicated helpline to cater to our customer’s queries and
                concerns. Serving over 5 million happy customers, we at
                MakeMyTrip are glad to fulfill the dreams of folks who need a
                quick and easy means to find air tickets. You can get a hold of
                the cheapest flight of your choice today while also enjoying the
                other available options for your travel needs with us.
              </p>
            </div>

            <div>
              <h5>Why MakeMYTrip ?</h5>
              <p className="offers-options-detail">
                MakeMyTrip is India's leading player for flight bookings. With
                the cheapest fare guarantee, experience great value at the
                lowest price. Instant notifications ensure current flight
                status, instant fare drops, amazing discounts, instant refunds
                and rebook options, price comparisons and many more interesting
                features.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-items-container">
            <div className="logo-container">
              <a
                href="https://twitter.com/makemytrip/"
                className="anchor-element"
                target="_blank"
              >
                <BsTwitter className="footer-sm-logo" />
              </a>
              <a
                href="https://www.facebook.com/makemytrip/"
                className="anchor-element"
                target="_blank"
              >
                <BsFacebook className="footer-sm-logo" />
              </a>
            </div>
            <div className="footer-msg-container">
              <p>© 2022 MAKEMYTRIP PVT. LTD.</p>
              <p>Country India USA UAE</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LandingPage;
