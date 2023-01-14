const express = require('express');
const bcrypt = require('bcrypt')
const logger = require('../logger');
const router = express.Router()

const dbConnection = require('../dbConnection')

const authenticateToken = require('./authenticateToken')


router.patch('/passwordreset', authenticateToken, (request,response)=>{
    try {
        const {email,oldPassword,newPassword} =request.body

        const queryToGetAllUsers = `SELECT * FROM Users WHERE Email = "${email}"`
        
        dbConnection.query(queryToGetAllUsers, async (error,userData) => {
            if (error) {
                logger.error(error.message)
                response.status(500).json({"Message": error.message})
            } else {
                console.log(userData)
                if (userData.length !== 0) {
                    const isPasswordMatched = await bcrypt.compare(oldPassword,userData[0].Password)
                    const hassedPassword = await bcrypt.hash(newPassword,10)
                    if (isPasswordMatched) {
                        const updatePassword = `
                            UPDATE Users
                            SET Password = '${hassedPassword}'
                            WHERE Email = "${email}";
                        `
                        dbConnection.query(updatePassword,(error)=>{
                            if (error) {
                                logger.error(error.message)
                                response.status(500).json({"Message": error.message})
                            } else {
                                logger.info("Password is updated successfully")
                                response.status(200).json({"Message":"Paassword is updated successfully"})
                            }
                        })
                    } else {
                        logger.error("Incorrect Password")
                        response.status(401).json({"Message":"Incorrect Password"})
                    }
                } else {
                    logger.error(`No data is found with the Email: ${email}`)
                    response.status(404).json({"Message": `No data is found with the Email: ${email}`})
                }
            }
        })

    } catch(error) {
        logger.error(error.message)
        response.status(500).json({"Message":error.message })
    }
});


module.exports = router;