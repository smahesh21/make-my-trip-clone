import Popup from "reactjs-popup";
import { SlPlane, SlSocialFacebook } from "react-icons/sl";
import {
  FaHotel,
  FaHome,
  FaTrain,
  FaPlane,
  FaBus,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { MdNaturePeople,MdOutlineLogout } from "react-icons/md";
import { GiBowman } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import mylogo from "../../Images/myLogo.png";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import './header.css'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/")
  }
  const jwtToken = Cookies.get("jwt_token")

  return (
      <div className="header-main-container">
          <img
            className="header-company-logo"
            src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png"
            alt="Logo"
          />
        <div className="header-menu-bar">
          <div className="header-menuIconAndName-container">
            <SlPlane className="header-menu-icon" />
            <p>Flights</p>
          </div>
          <div className="header-menuIconAndName-container">
            <FaHotel className="header-menu-icon" />
            <p>Hotels</p>
          </div>
          <div className="header-menuIconAndName-container">
            <FaHome className="header-menu-icon" />
            <p>Home Stay</p>
          </div>
          <div className="header-menuIconAndName-container">
            <MdNaturePeople className="header-menu-icon" />
            <p>Holidays</p>
          </div>
          <div className="header-menuIconAndName-container">
            <FaTrain className="header-menu-icon" />
            <p>Trains</p>
          </div>
          <div className="header-menuIconAndName-container">
            <FaBus className="header-menu-icon" />
            <p>Bus</p>
          </div>
          <div className="header-menuIconAndName-container">
            <AiFillCar className="header-menu-icon" />
            <p>Cabs</p>
          </div>
          <div className="header-menuIconAndName-container">
            <FaMoneyBillAlt className="header-menu-icon" />
            <p>Forex</p>
          </div>
          <div className="header-menuIconAndName-container">
            <FaPlane className="header-menu-icon" />
            <p>Charter Plane</p>
          </div>
          <div className="header-menuIconAndName-container">
            <GiBowman className="header-menu-icon" />
            <p>Activities</p>
          </div>
        </div>
        <div className="header-popup">
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
      </div>
  );
};

export default Header;
