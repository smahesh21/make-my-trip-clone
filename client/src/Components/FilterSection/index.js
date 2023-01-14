import { useNavigate } from "react-router-dom"
import { useEffect, useState,useRef } from "react"
import { useFromCity,useToCity,useSearch,useFlightsData,useFromCityUpdate,useToCityUpdate,useSearchUpdate,useFlightsDataUpdate, useDepartureDate, useDepartureDateUpdate } from "../../context/mmtcontext"
import {TailSpin} from 'react-loader-spinner'
import {BsArrowUp} from 'react-icons/bs'
import FlightDetails from "../FlightDetails"

import './filtersection.css'
import Header from "../Header/header"

const fromCityNames = [
    {
      "id":1,
      "cityName": "Hyderabad"
    },
    {
      "id": 2,
      "cityName": "Banglore"
    },
    {
      "id": 3,
      "cityName": "Chennai"
    },
    {
      "id": 4,
      "cityName": "Goa"
    },
    {
      "id": 5,
      "cityName": "Mumbai"
    },
    {
      "id": 6,
      "cityName": "Delhi"
    },
    {
      "id": 7,
      "cityName": "Nagpur"
    },
    {
      "id": 8,
      "cityName": "Kolkata"
    },
  ]
  
  const toCityNames = [
    
    {
      "id": 1,
      "cityName": "Banglore"
    },
    {
      "id": 2,
      "cityName": "Chennai"
    },
    {
      "id": 3,
      "cityName": "Goa"
    },
    {
      "id": 4,
      "cityName": "Mumbai"
    },
    {
      "id": 5,
      "cityName": "Delhi"
    },
    {
      "id": 6,
      "cityName": "Nagpur"
    },
    {
      "id": 7,
      "cityName": "Kolkata"
    },
    {
      "id":8,
      "cityName": "Hyderabad"
    },
  ]

const airlinesData = [
    {
        "id": 1,
        "airlineId": "Air India",
        "airlineName":"Air India"
    },
    {
        "id": 2,
        "airlineId": "AirAsia India",
        "airlineName":"AirAsia India"
    },
    {
        "id": 3,
        "airlineId": "Go First",
        "airlineName":"Go First"
    },
    {
        "id": 4,
        "airlineId": "IndiGo",
        "airlineName":"Indigo"
    },
    {
        "id": 5,
        "airlineId": "Qatar Airways",
        "airlineName": "Qatar Airways"
    },
    {
        "id": 6,
        "airlineId": "SpiceJet",
        "airlineName":"SpiceJet"
    }
]

const apiStatusConstants = {
    initial: "INITIAL",
    failure:'FAILURE',
    success:"SUCCESS",
    inProgress:"IN_POGRESS",
    notFound: "NOT_FOUND"
}


const FilterSection  = () => {
    const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)
    const [airlineId,setAirlineId] = useState("")

    const fromCity = useFromCity()
    const toCity = useToCity()
    const isClickedOnSearch = useSearch()
    const flights = useFlightsData()
    const departureDate = useDepartureDate()
    const setFromCity =useFromCityUpdate()
    const setToCity = useToCityUpdate()
    const setFlightsData = useFlightsDataUpdate()
    const setIsClickedOnSearch = useSearchUpdate()
    const setDepartureDate = useDepartureDateUpdate()

    const formatData = (data) => {
        return ({
            flightId: data.Flight_ID,
            airlineName: data.Airline_name,
            arrivalTime: data.Arrival_time,
            departureTime: data.Departure_time,
            fromCity: data.From_City,
            toCity: data.To_City,
            baggage: data.Baggage,
            price: data.Price,
            airlineImageUrl:data.image_url
        })
    }

    const searchButtonStyle = airlineId !== "" ? "search-button-active" : "search-button"

    useEffect(()=>{
        const apiUrl = `http://localhost:5000/api/flights/?search=${airlineId}&from_city=${fromCity}&to_city=${toCity}`
        const getFlightsData = async () => {
            const response = await fetch(apiUrl)
           
            if (response.ok) {
                const flightsData = await response.json()
                console.log(response)
                const formattedFlightsData = flightsData.map((flightsDetails)=>(formatData(flightsDetails)))
                setFlightsData(formattedFlightsData)
                setApiStatus(apiStatusConstants.success)
                console.log(formattedFlightsData)
            } else if (response.status === 404){
                setApiStatus(apiStatusConstants.notFound)
            } else {
                setApiStatus(apiStatusConstants.failure)
            }
        }

        if (fromCity !== toCity) {
            if (isClickedOnSearch) {
                setApiStatus(apiStatusConstants.inProgress)
                getFlightsData()
                setIsClickedOnSearch(false)        
            }
        }

    },[fromCity,toCity,airlineId,isClickedOnSearch,flights,apiStatus])

    const navigate = useNavigate()

    const handleBooking = (flightDetails) => {
        console.log("Initialised the Boooking")
        console.log(flightDetails)
        setFlightsData(flightDetails)
        navigate('/booking')
    }

    const handleSearch = () => {
        
        setIsClickedOnSearch()
    }

    const handleClearFilters = () => {    
        setAirlineId("")
        setFlightsData(flights)
        setIsClickedOnSearch(true)
    }

    const handleAirlineId = (airlineId) => {
        setAirlineId(airlineId)
        setIsClickedOnSearch(true)
    }

    const renderFailureView = () => (
        <div className="failure-view">
            <h1 className="failure-heading">Ooops, Something went wrong.</h1>
        </div>
    )

    const renderSuccessView = () => {
        return flights.map((flight)=> (<FlightDetails key={flight.flightId} flightDetails = {flight} handleBooking={handleBooking} />))
    }

    const renderLoader = () => (
        <div className="loader">
            <TailSpin width="50px" height="50px" color="#344ceb" />
        </div>
    )

    const renderNotFoundView = () => (
        <div className="failure-view">
            <h1 className="failure-heading">
                Sorry, right now there are no flights between {fromCity} to {toCity}
            </h1>
        </div>
    )

    const renderFlights = () => {
        switch(apiStatus) {
            case apiStatusConstants.inProgress:
                return renderLoader()
            case apiStatusConstants.failure:
                return renderFailureView()
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.notFound:
                return renderNotFoundView()
            default:
                return null
        }
    }

    console.log(fromCity)
    console.log(toCity)

    return (
        <div>
        <Header />
        <div className="main-container">
            <div className="filter-section">
                <div className="filters">
                    <div className="filter-cards">
                        <p className="filter-card-text">TRIP TYPE</p>
                        <select className="select-element">
                            <option>Round Trip</option>
                            <option>Multi City</option>
                        </select>
                    </div>
                    <div className="filter-cards">
                        <p className="filter-card-text">FROM</p>
                        {/* <input type="text" onChange={(event)=>setFromCity(event)} value={fromCity} className="flights-input-element" placeholder="From" /> */}
                        <select onChange={(event)=>setFromCity(event)} value={fromCity} className="filter-page-select-elements" >
                            {
                                fromCityNames.map((city)=><option key={city.id}>{city.cityName}</option>)
                            }
                        </select>
                    </div>
                    <div className="filter-cards">
                        <p className="filter-card-text">TO</p>
                        {/* <input type="text" onChange={(event)=>setToCity(event)} value={toCity} className="flights-input-element" placeholder="To" /> */}
                        <select onChange={(event)=>setToCity(event)} value={toCity} className="filter-page-select-elements" name="cityNames">
                            {
                                toCityNames.map((city)=><option key={city.id}>{city.cityName}</option>)
                            }
                        </select>
                        {fromCity === toCity ? <p className="same-cities-error">From and To cities could not be same.</p> : null }
                    </div>
                    <div className="filter-cards">
                        <p className="filter-card-text">DEPART</p>
                        <input 
                            type='date' 
                            id="departure"
                            className="flights-input-element" 
                            value={departureDate} 
                            onChange={(event) => setDepartureDate(event)} />
                    </div>
                    <button type="button" className={searchButtonStyle} onClick={handleSearch}>Search</button>
                </div>
                <div className="fare-type-container">
                    <p className="fare-type">Fare Type:</p>
                    <div className="fare-type-items">
                        <div className="radio-label-container">
                            <input type="radio" id="regular"  className="fare-type-radio-element" name="fare" />
                            <label htmlFor="regular" className="label-element">Regular</label>
                        </div>
                        <div className="radio-label-container">
                            <input type="radio" id="armedforces"  className="fare-type-radio-element" name="fare" />
                            <label htmlFor="armedforces" className="label-element">ArmedForces <span className="new">NEW</span></label>
                        </div>
                        <div className="radio-label-container">
                            <input type="radio" id="student"  className="fare-type-radio-element" name="fare" />
                            <label htmlFor="student" className="label-element">Student</label>
                        </div>
                        <div className="radio-label-container">
                            <input type="radio" id="seniorcitizens"  className="fare-type-radio-element" name="fare" />
                            <label htmlFor="seniorcitizens" className="label-element">Senior Citizen</label>
                        </div>
                        <div className="radio-label-container">
                            <input type="radio" id="doctorsnurses"  className="fare-type-radio-element"  name="fare" />
                            <label htmlFor="doctorsnurses" className="label-element">Doctors & Nurses</label>
                        </div>
                        <div className="radio-label-container">
                            <input type="radio" id="doubleseat" className="fare-type-radio-element"  name="fare" />
                            <label htmlFor="doubleseat" className="label-element">Double Seat</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-flightcards-container">
                <div className="sidebar">
                    <h1 className="popular-filters">Popular Filters</h1>
                    <div className="airline-names">
                    <h1 className="popular-filters airlines">Airlines</h1>
                        {
                            airlinesData.map((airline, index)=> {
                                console.log(airlineId)
                                const isActive = airline.airlineName === airlineId ? true : false
                                return (
                                    <div key={airline.id}  className="checkbox-label-container"> 
                                        <input type="checkbox" onClick={()=>handleAirlineId(airline.airlineName)} id={index} checked={isActive}  className="airline-checkbox" value={airline.airlineId} />
                                        <label htmlFor={index} className="airline-checkbox-label">{airline.airlineName}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <button type="button" className="clear-filters" onClick={handleClearFilters}>Clear Filters</button>
                    </div>
                </div>
                <div className="flights-cards">
                    <h1 className="heading">Flights from {fromCity} to {toCity}</h1>
                    <div className="advisories-guidelines">
                        <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/safety.png" className="mysafety-logo" alt="my safety" />
                        <div>
                            <h1 className="guidelines">Important Advisories & State Guidelines</h1>
                            <p className="guidelines-description">With travel openeing up, govt. advisories and state/UT guidelines are constantly evolving. Please check the latest updates before travelling.<a href="https://www.makemytrip.com/promos/MySafety.html?tab=flights" target="_blank" className="know-more">KNOW MORE</a></p>
                        </div>
                    </div>
                    <div className="sortby-container">
                        <p className="sort-by">SortBy :</p>
                        <p className="departure-arrival">Departure</p>
                        <p className="departure-arrival arrival">Arrival</p>
                        <p className="price">Price <BsArrowUp /></p>
                    </div>
                    {renderFlights()}
                </div>
            </div>
        </div>
        </div>
    )
}

export default FilterSection;