const express = require('express')

const dbConnection = require('../dbConnection')
const authenticateToken = require('./authenticateToken')

const router = express.Router()

router.post('/booking', authenticateToken, (request,response) => {
    
    try {
        const {Plane_ID,Transaction_ID} = request.body 
        const isValidId = (id) => {
            const regex = /^[0-9]+$/;
            return regex.test(id)
          }
          const isValidTransactionId = (id) => {
            const regex = /^[a-zA-Z0-9]+$/;
            return regex.test(id)
          }

          if (!isValidId(Plane_ID)) {
            response.status(400).json({"Message":`Provided Plane ID: ${Plane_ID} is not a valid ID.`})
          } else if (!isValidTransactionId(Transaction_ID)) {
            response.status(400).json({"Message":`Provided Transaction ID: ${Transaction_ID} is not valid.`})
          } else {

            const {Email} = request

            const getUser = `SELECT * FROM Users WHERE Email="${Email}"`
            dbConnection.query(getUser,(error, userData) => {
              if (error) {
                response.status(500).json({"Message": error.message})
              } else {
                if (userData.length !== 0) {
                  const user = userData[0]
                  const storingTheBookingDetails = `
                    INSERT INTO Bookings (User_ID,Flight_ID,Transaction_ID)
                    VALUES (${user.ID},${Plane_ID},"${Transaction_ID}");
                  `
                  dbConnection.query(storingTheBookingDetails, (error) => {
                    error ? response.status(500).json({"Message": error.message}) : response.status(200).json({"Message": "Booking details are stored successfully." })
                  })
                } else {
                  response.status(401).json({"Message": "Unauthorized"})
                }
              }
            })            
          }
        
        
    } catch(error) {
        response.status(500).json({"Message": error.message})
    }
})

module.exports = router;