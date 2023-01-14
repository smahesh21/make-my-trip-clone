const express = require('express')
const dbConnection = require('../dbConnection');
const authenticateToken = require("./authenticateToken");
const router = express.Router()


router.get('/flights', (request,response)=>{
    try {
        const {search,from_city,to_city} = request.query
        const getFlights = `
            SELECT
                Planes.Plane_ID AS Flight_ID,
                Planes.From_City,
                Planes.To_City,
                Airlines.name AS Airline_name,
                Planes.Arrival_time AS Arrival_time,
                Planes.Departure_time AS Departure_time, 
                Planes.Baggage AS Baggage,
                Planes.Price,
                Airlines.image_url AS image_url 
            FROM Planes
                INNER JOIN Airlines ON Planes.Airline_ID = Airlines.Airline_ID
                WHERE (Planes.From_City = "${from_city}" AND Planes.To_City = "${to_city}") AND (
                    CASE 
                        WHEN "${search}" = "" THEN Airlines.name IN ("IndiGo","Air India","SpiceJet","AirAsia India","Qatar Airways","Go First")
                        ELSE Airlines.name = "${search}"
                        END
                );
            `
        dbConnection.query(getFlights,(error,data)=>{
            if (error) return response.status(500).json({message: error.message})
            
            if (data.length === 0) {
                response.status(404).json({message: `No data is matched`})
            } else {
                response.status(200).json(data)
            }
        })
    } catch(error) {
        response.send({"fatal":error.message})
    }
})

module.exports = router;