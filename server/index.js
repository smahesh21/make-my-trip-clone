const express = require("express");
const path = require('path')
const cors = require("cors");
const router = require("./Controllers/regControllers");
const filterApi = require('./Controllers/filterControllers');
const verifyOTP = require("./Controllers/verifyOtpController")
const loginApi = require('./Controllers/loginController')
const passengersApi = require('./Controllers/passengerController')
const usersApi = require('./Controllers/usersController')
const ticketApi = require('./Controllers/ticketController')
const bookingApi = require('./Controllers/bookingController')
const resendApi = require('./Controllers/resendOTP');
const logger = require("./logger");
const passwordResetApi = require('./Controllers/passwordResetController')
const razorApi = require('./Controllers/razorpay')
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use(cors());

app.use("/api", router);
app.use("/api", loginApi);
app.use("/api", verifyOTP);
app.use("/api", resendApi);
app.use("/api", filterApi);
app.use('/api', passengersApi);
app.use('/api', razorApi);
app.use('/api', usersApi);
app.use('/api', ticketApi);
app.use('/api', bookingApi);
app.use('/api', passwordResetApi);

app.use(express.static(path.join(__dirname,'../client/build')))

app.get("*", (_,response)=> {
    response.sendFile(
        path.join(__dirname,'../client/build/index.html', (error) => {
            if (error) {
                response.status(500).send({"Message": error.message})
            }
        })
    )
})


app.listen(5000, ()=>{
    logger.info(`Server is running at http://localhost:${PORT}`)
})