const express = require("express");
const router =  express.Router();
const dbConnection = require("../dbConnection");
const authenticateToken = require("./authenticateToken");
const nodemailer = require("nodemailer");
const logger = require("../logger");


router.post("/resendOTP", authenticateToken, (req, res)=>{

    const OTP =  Math.floor(Math.random()*9000);    
    const minutes = 1000*60*2
    const time = JSON.stringify(Date.now()+minutes);
    const Email = req.Email;
    console.log(Email)
    
    function storeOtpAndSendMail(){
        const insertQuery = `insert into OTP(Email, OTP, time) values("${Email}", "${OTP}", "${time}");`;
        dbConnection.query(insertQuery, (error, data)=>{
         if(error){
             logger.error(error.message)
             res.status(500).json({"msg":error.message})
         }else{
             const payLoad = {
                Email,
             }
        
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
                  subject:"VERIFYING EMAIL",
                  text:`I have sent this ${OTP} to verify email. Please enter this OTP to LOGIN`
             }  
             
             transporter.sendMail(mailOptions, (error, info)=>{
                 if(error){
                     logger.error(error.message)
                     res.status(400).json({"msg":error.message});
                 }else{
                     logger.info('Email sent: '+info.response)
                     res.status(200).json({"OTP":OTP});
                 }
             });
         }
        })
    
    }
    
    const mailQuery = `select Email from OTP where Email = "${Email}"`;
    
    dbConnection.query(mailQuery, (error, data)=>{
        if(error){
            logger.error(error.message)
            res.status(500).json({"msg":error.message})
        }else{
            console.log(data);
            if(data !== []){
                
                const deleteQuery = `delete from OTP where Email = "${Email}"`           
                dbConnection.query(deleteQuery, (error, data)=>{
                    if(error){
                        logger.error(error.message)
                        res.status(500).json({"msg":error.message});
                    }else{
                        storeOtpAndSendMail();
                    }
                })     
    
            }else{
                  
                 storeOtpAndSendMail();
            }
        }
    })
      
});

module.exports = router;
