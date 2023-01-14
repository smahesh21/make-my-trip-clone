const express = require("express");
const dbConnection = require("../dbConnection");
const logger = require("../logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

router.post('/login', (req,res)=>{
     try{
    const {Email, Password} = req.body;

    const emailQuery = `select Email, Password from Users where Email = "${Email}"`

    dbConnection.query(emailQuery, async (error, data)=>{
        if(error){
            logger.error(error.message)
            res.status(500).json({"msg":error.message})
        }else{
            if (data[0] === undefined){
                res.status(400).json({"msg": `Email with ${Email} does not exist`})
            }else{

            if(data[0].Email === Email){
                  const hashedPassword = data[0].Password;
                  const isPasswordMatched =  await bcrypt.compare(Password, hashedPassword);
                  
                  if(isPasswordMatched){
                        const OTP =  Math.floor(Math.random()*9000);    
                        const minutes = 1000*60*30
                        const time = JSON.stringify(Date.now()+minutes);


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
                                 const jwtToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN, {expiresIn:'10m'});
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
                                         res.status(200).json({"OTP":OTP, jwtToken,});
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
                                            storeOtpAndSendMail()
                                        }
                                    })     

                                }else{
                                      
                                     storeOtpAndSendMail();
                                }
                            }
                        })

                      
                  }else{
                    logger.error("password is not matched");
                    res.status(400).json({"msg":"Invalid password"})
                  }
            }else{
                res.status(400).json({"msg":`Email with ${Email} does not exist`})
            }
        }
        }
    })
}catch(error){
    logger.error(error.message);
    res.status(400).json({"msg":error.message})
}});


module.exports =router;
