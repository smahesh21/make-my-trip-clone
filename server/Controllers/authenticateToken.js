const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];

    if(authHeader !== undefined){
       let jwtToken = authHeader.split(" ")[1];
       jwt.verify(jwtToken, process.env.ACCESS_TOKEN, (error, payload) => {
            if(error){
                res.status(401).json({"msg":"Invalid access token"});
            }else{
                req.Email = payload.Email
                next()
            }
        });
}else{
    res.status(400).json("required accessToken");
  }
};

module.exports = authenticateToken;
 