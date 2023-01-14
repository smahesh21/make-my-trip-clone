const express = require("express");
const router =  express.Router();
const dbConnection = require("../dbConnection");
const authenticateToken = require("./authenticateToken");
const logger = require("../logger");

router.post("/verifyOTP", authenticateToken, (req, res)=>{
      const {OTP} = req.body;
      const otpQuery = `select time from OTP where OTP = ${OTP}`
      dbConnection.query(otpQuery, (error, data)=>{
        if(error){
           logger.error(error.message)
           res.status(500).json({"msg":error.message})
        }else{
           if(data[0]!==undefined){
               const time = JSON.parse(data[0].time);
               const presentTime = Date.now();
               if(time > presentTime){
                  res.status(200).json({"msg":"OTP verified successfully"})
               }else{
                res.status(400).json({"msg":"OTP expired"})
               }
           }else{
               res.status(400).json({"msg":"OTP is not matched"})
           }
        }
      })

});

module.exports = router;