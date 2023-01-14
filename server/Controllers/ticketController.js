const express = require('express')
const dbConnection = require('../dbConnection')
const authenticateToken = require('./authenticateToken');
const nodemailer = require("nodemailer");


const router = express.Router()

router.post('/ticket',authenticateToken, (request,response) => {
    try {
        const {Passenger_Name,Ceat_Number} = request.body 
        const {Email} = request;
        const isValidId = (id) => {
            const regex = /^[0-9]+$/;
            return regex.test(id)
          }
          const isValidName = (name) => {
            const regex = /^[a-zA-Z ]{2,30}$/;
            return regex.test(name)
          }

          if (!isValidName(Passenger_Name)) {
            response.status(400).json({"Message":`Provided Passenger Name: ${Passenger_Name} is not a valid name.`})
          } else if (!isValidId(Ceat_Number)) {
            response.status(400).json({"Message":`Provided Ceat Numer: ${Ceat_Number} is not valid.`})
          } else {
            const toGetTheBookingId = `
            SELECT Bookings.Booking_ID 
              FROM Users INNER JOIN Bookings 
              ON Users.ID = Bookings.User_ID
              WHERE Users.Email = "${Email}"
            `
            dbConnection.query(toGetTheBookingId, (error,bookingid) => {
              if (error) { 
                response.status(500).json({"Message": error.message})
              } else {
                console.log(bookingid[bookingid.length - 1].Booking_ID)
                const storingTheTicketDetails = `
                  INSERT INTO Ticket (Booking_ID,Passenger_Name,Ceat_Number)
                  VALUES (${bookingid[bookingid.length - 1].Booking_ID},"${Passenger_Name}",${Ceat_Number});
                `
                  dbConnection.query(storingTheTicketDetails, (error) => {
                    if(error){

                      response.status(500).json({"Message": error.message})

                    }else{

                      const transporter = nodemailer.createTransport({
                        service:"gmail",
                        auth:{
                            user:"muttanagendrakumar@gmail.com",
                            pass:"dcugcyhvhkplezcn"
                        }
                    });
                    
                    const mailOptions = {
                         from:"muttanagendrakumar@gmail.com",
                         to:Email,
                         subject:"Ticket Details",
                         text:`${bookingid[bookingid.length - 1].Booking_ID} ${Passenger_Name}  ${Ceat_Number}`,
                         html: `<h2> Ticket </h2> 
                                <h4>Booking ID: ${bookingid[bookingid.length - 1].Booking_ID}</h4>
                                <h4>Name: ${Passenger_Name}</h4>
                                <h4>Ceat Number: ${Ceat_Number}</h4>

                                <h5> Have a Safe Journey </h5>
                                `
                    }  
                    
                    transporter.sendMail(mailOptions, (error, info)=>{
                        if(error){
                            logger.error(error.message)
                            res.status(400).json({"msg":error.message});
                        }else{
                            logger.info('Email sent: '+info.response)
                            res.status(200).json({"msg":"Ticket sent to mail successfully"});
                        }
                    });

                      response.status(200).json({"Message": "Ticket details are stored successfully." })

                    } 
                  })
              }
            })
          }
        
        
    } catch(error) {
        response.status(500).json({"Message": error.message})
    }
})

module.exports = router;