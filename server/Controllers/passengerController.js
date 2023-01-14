const express = require("express");
const dbConnection = require("../dbConnection")
const router = express.Router();
const logger = require("../logger");
const authenticateToken = require("./authenticateToken");

router.post("/passengers",authenticateToken, (request, response)=>{
  try {
    
    const {Name, Email, Gender, mobile_no, Date_of_Birth} = request.body;

    const isValidName = (Name) => {
      const regex = /^[a-zA-Z ]{2,30}$/;
      return regex.test(Name)
    }

    const isValidGender =(Gender) => {
      const regex = /^[a-zA-Z ]{4,6}$/;
      return regex.test(Gender)
    }

    const isValidEmail = (Email) => {
      const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      return regex.test(Email)
    }

    const isValidMobileNumber = (mobilenumber) => {
      const regex = /^\d{10}$/;
      return regex.test(mobilenumber)
    }

    const isValidDate = (Date_of_Birth) => {
      const regEx = /^\d{4}-\d{2}-\d{2}$/;
      return regEx.test(Date_of_Birth)
    }
  
    if(!(isValidName(Name))){
      response.status(400).json({"Message":`${Name} is not valid name`})
    }else if(!(isValidEmail(Email))){
      response.status(400).json({"Message":`${Email} is not valid email`})
    }else if(!(isValidGender(Gender))){
      response.status(400).json({"Message":`${Gender} is not valid gender`})
    }else if (!(isValidMobileNumber(mobile_no))) {
      response.status(400).json({"Message": `${mobile_no} is not valid mobile number`})
    }else{
      const updatingPassengers = `INSERT INTO Passengers (Name, Gender,Email, mobile_no, Date_of_Birth) VALUES ("${Name}","${Gender}","${Email}","${mobile_no}","${Date_of_Birth}");`  
      dbConnection.query(updatingPassengers,(error)=>{
        error ? response.status(500).json({"Message": error.message }) : response.status(201).json({"Message": "Passenger Details updated successfully"})
    })
  }
  }catch(error){
    logger.error(error.message);
    res.status(500).json({"Message":error.message})
  }

});


router.get('/passengers', (request,response)=>{
  try {
      const getUsersData = `SELECT * FROM Passengers;`
      dbConnection.query(getUsersData, (error,data) => {
          if (error) return response.status(500).json({"Message": error.message})
          data.length != 0 ? response.status(200).json({"PassengersData": data}) : response.json({"Message": "No data is present in the Passengers."})
      })
  } catch(error) {
      response.status(500).json({"Message": error.message})
  }
});

module.exports =  router;