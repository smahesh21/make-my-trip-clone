const express = require("express");
const bcrypt = require("bcrypt");
const dbConnection = require("../dbConnection")
const router = express.Router();
const logger = require("../logger");



router.post("/register", async(req, res)=>{
  try{

  const {Name, Password, Email, Gender, mobile_no, Date_of_Birth} = req.body;

  const isValidName = (Name) => {
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(Name)
  }

  const isValidEmail = (Email) => {
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return regex.test(Email)
  }

  const isValidPassword = (Password) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    return regex.test(Password)
  }
  
  if(!(isValidName(Name))){
    res.status(400).json({"msg":`${Name} is not valid`})
  }
  else if(!(isValidEmail(Email))){
    res.status(400).json({"msg":`${Email} is not valid`})
  }
  else if(!(isValidPassword(Password))){
    res.status(400).json({"msg":`invalid password`})
  }else{
    const hashedPassword = await bcrypt.hash(Password, 10);
    const emailQuery = `select Email from Users where Email = "${Email}"`;
    
    dbConnection.query(emailQuery, (error, data)=>{
      if(error){
        logger.error(error.message);
        res.status(500).json({"msg":error.message})
      }else{
        if(data.length === 0){
          const nameQuery = `select Name from Users where Name = "${Name}"`

          dbConnection.query(nameQuery, (error, data)=>{
            if(error){
              logger.error(error.message);
              res.status(500).json({"msg":error.message})
            }else{
              if(data.length===0){
                 const insertingData = `insert into Users(Name, Password, Email, mobile_no, Gender, Date_of_Birth)
                 values("${Name}", "${hashedPassword}", "${Email}", "${mobile_no}", "${Gender}", "${Date_of_Birth}");`
               
                 dbConnection.query(insertingData, (error, data)=>{
                  if(error){
                    logger.error(error.message);
                    res.status(500).json({"msg":error.message})
                  }else{
                    logger.info("registration is successfull");
                    res.status(200).json({"msg":"registration is successfull"})
                  }
                 })
              }else{
                logger.error("Name already exists");
                res.status(400).json({"msg":`${Name} already exists`})
              }
            }
          })

        }else{
          logger.error("Email already exists");
          res.status(400).json({"msg":`email with ${Email} already exists`});
        }
      }
    })
  }
  }catch(error){
    logger.error(error.message);
    res.status(500).json({"msg":error.message})
  }

});

module.exports =  router;