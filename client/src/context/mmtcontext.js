import React, { useContext,useState } from "react";

const FromCityContext = React.createContext()
const UpdateFromCityContext = React.createContext()

const ToCityContext = React.createContext()
const UpdateToCityContext = React.createContext()

const FlightsDataContext = React.createContext()
const UpdateFlightsDataContext = React.createContext()

const SearchContext = React.createContext()
const UpdateSearchContext = React.createContext()

const DepartureDateContext = React.createContext() 
const UpdateDepartureDateContext = React.createContext()

const PassengerName = React.createContext()
const UpdatePassengerName = React.createContext()

const SeatNumber = React.createContext()
const UpdateSeatNumber = React.createContext()

export const useFromCity = () => useContext(FromCityContext) 
export const useFromCityUpdate = () => useContext(UpdateFromCityContext)

export const useToCity = () => useContext(ToCityContext)
export const useToCityUpdate = () => useContext(UpdateToCityContext)

export const useFlightsData = () => useContext(FlightsDataContext)
export const useFlightsDataUpdate = () => useContext(UpdateFlightsDataContext)

export const useSearch = () => useContext(SearchContext)
export const useSearchUpdate = () => useContext(UpdateSearchContext)

export const useDepartureDate = () => useContext(DepartureDateContext)
export const useDepartureDateUpdate = () => useContext(UpdateDepartureDateContext)

export const usePassengerName = () => useContext(PassengerName)
export const usePassengerNameUpdate = () => useContext(UpdatePassengerName)

export const useSeatNumber = () => useContext(SeatNumber)
export const useSeatNumberUpdate = () => useContext(UpdateSeatNumber)

export const ContextProvider = ({children}) => {
    
    const [isClickedOnSearch, setIsClickedOnSearch] = useState(false)
    const [fromCity,setFromCity] = useState("Hyderabad")
    const [toCity,setToCity] = useState("Banglore")
    const [flights,setFlights] = useState([])
    const [departureDate,setDepartureDate] = useState("")
    const [passengerName, setPassengerName] = useState("")
    const [seatNumber, setSeatNumber] = useState([])

    const updateSearchAction = () => setIsClickedOnSearch(prev=>!prev)
    const updateFromCityAction = (event) => setFromCity(event.target.value)
    const updateToCityAction = (event) => setToCity(event.target.value)
    const updateFlightsAction = (flightsData) => setFlights(flightsData)
    const updateDepartureDate = (event) => setDepartureDate(event.target.value)
    const updatePassengerName = (event) => setPassengerName(event.target.value)
    const updateSeatNumber = (seatNo) => setSeatNumber(seatNo)
    
    return <SearchContext.Provider value={isClickedOnSearch}>
        <FromCityContext.Provider value={fromCity}>
            <ToCityContext.Provider value={toCity}>
                <FlightsDataContext.Provider value={flights}>
                    <UpdateSearchContext.Provider value={updateSearchAction}>
                        <UpdateFromCityContext.Provider value={updateFromCityAction}>
                            <UpdateToCityContext.Provider value={updateToCityAction}>
                                <UpdateFlightsDataContext.Provider value={updateFlightsAction}>
                                    <DepartureDateContext.Provider value={departureDate}>
                                        <UpdateDepartureDateContext.Provider value={updateDepartureDate}>
                                            <PassengerName.Provider value={passengerName}>
                                                <UpdatePassengerName.Provider value={updatePassengerName}>
                                                    <SeatNumber.Provider value={seatNumber}>
                                                        <UpdateSeatNumber.Provider value={updateSeatNumber}>
                                                            {children}
                                                        </UpdateSeatNumber.Provider>
                                                    </SeatNumber.Provider>
                                                </UpdatePassengerName.Provider>
                                            </PassengerName.Provider>
                                        </UpdateDepartureDateContext.Provider>
                                    </DepartureDateContext.Provider>
                                </UpdateFlightsDataContext.Provider>
                            </UpdateToCityContext.Provider>
                        </UpdateFromCityContext.Provider>
                    </UpdateSearchContext.Provider>
                </FlightsDataContext.Provider>
            </ToCityContext.Provider>
        </FromCityContext.Provider>
    </SearchContext.Provider>
}



