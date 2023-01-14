const mysql = require("mysql");
const logger = require('./logger')

const dbConnection = mysql.createConnection({
    host:'db4free.net',
    user:'mahesh7',
    password:"mahesh@7777",
    database:"makemytrip"
})

dbConnection.connect((error)=>{
    if (error) return logger.error(error.message)
    logger.info("Database connected successfully.") 
});


module.exports = dbConnection;