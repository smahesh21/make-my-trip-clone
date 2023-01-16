const express = require("express");
const dbConnection = require("../dbConnection");
const router = express.Router();
const logger = require("../logger");
const authenticateToken = require("./authenticateToken");
const Razorpay =require("razorpay");
const shortid = require("shortid");
const { response } = require("express");


const razorpay = new Razorpay({
    key_id:"rzp_test_disUdWK4za85Ty",
    key_secret:"NheN3gQO4IixV61cmqxzMz94"
});

router.post("/razorpay", authenticateToken, async (req, res)=> {
    try {
        const {amount} = req.body
        const payment_capture = 1;
        const currency = "INR";
        
        const options =  {  
            amount : (amount).toString(),
            currency, 
            receipt: shortid.generate(), 
            payment_capture
        }

        const response = await razorpay.orders.create(options);
        res.status(200).json(
            {id:response.id,
             amount:response.amount,
             currency:response.currency,
            }); 
    } catch (error) {
        response.status(500).json({"Message":error.message})
    }
});

module.exports = router;