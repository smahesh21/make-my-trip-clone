import React, { Fragment, useEffect, useState } from "react";
import "./BookingSeat_style.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useFlightsData, useSeatNumber, useSeatNumberUpdate } from "../../context/mmtcontext";
import { useDepartureDate, usePassengerName } from "../../context/mmtcontext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function BookingSeat() {
  const flights = useFlightsData();
  const passengerName = usePassengerName();
  const departureDate = useDepartureDate();
  const seatNumber = useSeatNumber()
  const setSeatNumber = useSeatNumberUpdate()
  const [isClickedOnContinue, setIsClickedOnContinue] = useState(false);

  console.log(seatNumber)

  const jwtToken = Cookies.get("jwt_token");

  const navigate = useNavigate();

  useEffect(() => {
    const bookingData = {
      Plane_ID: flights.flightId,
      Transaction_ID: "ABC125121",
    };
    const bookingApi = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(bookingData),
      };
      const response = await fetch(
        "http://localhost:5000/api/booking",
        options
      );
      if (response.ok) {
        if (seatNumber !=="") {
          navigate("/payment");
        } else{
          console.log("Please select your seat")
        }
      } else {
        console.log(response)
      }
    };

    if (isClickedOnContinue) {
      bookingApi();
    }

    console.log(seatNumber);

    return () => {
      setIsClickedOnContinue(false);
    };
  }, [isClickedOnContinue]);

  const handleBooking = () => {
    setIsClickedOnContinue(true);
  };

  const handleCeatNumber = (event) => {
    setSeatNumber(event.target.value);
  };

  return (
    <div className="booking-seat-main-container">
      <div className="flight-summary-card">
        <h2>Flight Summary</h2>
        <div className="flight-summary-info">
          <h3>{flights.fromCity}</h3>
          <div className="arrow-icon">
            <AiOutlineArrowRight />
          </div>
          <h3>{flights.toCity}</h3>
          <div>
            <span>{departureDate}</span>
          </div>
        </div>
      </div>

      <div className="traveller-details-card">
        <h2>Traveller Details</h2>
        <p>{passengerName}</p>
      </div>

      <div className="seat-meal-plane-seat">
        <div className="seat-and-meals-card">
          <div className="seats-logo-card">
            <img
              src="	https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/seat.png"
              alt="Seat Picture"
            />
            <span>Seats</span>
          </div>
        </div>
        <div className="green-msg-box">
          <p>Be an early bird and grab an early spot before it runs out</p>
        </div>

        <div className="select-seats">
          <div
            style={{ display: "flex", alignItems: "center", padding: "1rem 0" }}
          >
            <span>{flights.fromCity}</span>
            <AiOutlineArrowRight />
            <span>{flights.toCity}</span>
          </div>
          <div className="plane-seats-card">
            <div className="plane-seats-container">
              <div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="1"
                    value="1"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                  <input
                    type="checkbox"
                    id="2"
                    value="2"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                  <input
                    type="checkbox"
                    id="3"
                    value="3"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="4"
                    value="4"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                  <input
                    type="checkbox"
                    id="5"
                    value="5"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                  <input
                    type="checkbox"
                    id="6"
                    value="6"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="7"
                    value="7"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                  <input
                    type="checkbox"
                    id="8"
                    value="8"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                  <input
                    type="checkbox"
                    id="9"
                    value="9"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                    checked
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="10"
                    value="10"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="11"
                    value="11"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="12"
                    value="12"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="13"
                    value="13"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="14"
                    value="14"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="15"
                    value="15"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="16"
                    value="16"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="17"
                    value="17"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="18"
                    value="18"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="19"
                    value="19"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="20"
                    value="20"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="21"
                    value="21"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="22"
                    value="22"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="23"
                    value="23"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="24"
                    value="24"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="25"
                    value="25"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="26"
                    value="26"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="27"
                    value="27"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="28"
                    value="28"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="29"
                    value="29"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="30"
                    value="30"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="31"
                    value="31"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="32"
                    value="32"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="33"
                    value="33"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="34"
                    value="34"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="35"
                    value="35"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="36"
                    value="36"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="37"
                    value="37"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="38"
                    value="38"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="39"
                    value="39"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="40"
                    value="40"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="41"
                    value="41"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="42"
                    value="42"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="43"
                    value="43"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="44"
                    value="44"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="45"
                    value="45"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="46"
                    value="46"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="47"
                    value="47"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="48"
                    value="48"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="49"
                    value="49"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="50"
                    value="50"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="51"
                    value="51"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="52"
                    value="52"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="53"
                    value="53"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="54"
                    value="54"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="55"
                    value="55"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="56"
                    value="56"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="57"
                    value="57"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="58"
                    value="58"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="59"
                    value="59"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="60"
                    value="60"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
              </div>

              <div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="61"
                    value="61"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="62"
                    value="62"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="63"
                    value="63"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="64"
                    value="64"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="65"
                    value="65"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="66"
                    value="66"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="67"
                    value="67"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="68"
                    value="68"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="69"
                    value="69"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="70"
                    value="70"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="71"
                    value="71"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="72"
                    value="72"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="73"
                    value="73"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="74"
                    value="74"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="75"
                    value="75"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="76"
                    value="76"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="77"
                    value="77"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="78"
                    value="78"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="79"
                    value="79"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="80"
                    value="80"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="81"
                    value="81"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="82"
                    value="82"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="83"
                    value="83"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="84"
                    value="84"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="85"
                    value="85"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="86"
                    value="86"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="87"
                    value="87"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="88"
                    value="88"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="89"
                    value="89"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="90"
                    value="90"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="91"
                    value="91"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="92"
                    value="92"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="93"
                    value="93"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="94"
                    value="94"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="95"
                    value="95"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="96"
                    value="96"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="97"
                    value="97"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="98"
                    value="98"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="99"
                    value="99"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="100"
                    value="100"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="101"
                    value="101"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="102"
                    value="102"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="103"
                    value="103"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="104"
                    value="104"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="105"
                    value="105"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="106"
                    value="106"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="107"
                    value="107"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="108"
                    value="108"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="109"
                    value="109"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="110"
                    value="110"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="111"
                    value="111"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="112"
                    value="112"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="113"
                    value="113"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="114"
                    value="114"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="115"
                    value="115"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="116"
                    value="116"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="117"
                    value="117"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
                <div className="plane-seats">
                  <input
                    type="checkbox"
                    id="118"
                    value="118"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="119"
                    value="119"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                  <input
                    type="checkbox"
                    id="120"
                    value="120"
                    onClick={handleCeatNumber}
                    className="inp-chck-box-as-seat"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="cont-btn-container">
            <button
              type="button"
              className="continue-btn-bookingseat"
              onClick={handleBooking}
            >
              <h2 className="bookingSeatContinue">continue</h2>
            </button>
            
            <p>Skip add on</p>
          </div>
          {seatNumber === "" ? <p className="seat-selection-error-message">Please select the seat</p>: null}
          <div className="add-on-card">
            <h2>Add on</h2>
            <p>
              Airport Pick-Up & Drop, Baggage Courier Service, Covid Insurance,
              Charity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSeat;
