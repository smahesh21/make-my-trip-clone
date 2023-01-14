const express = require('express')
const dbConnection = require('../dbConnection');
const authenticateToken = require('./authenticateToken');
const router = express.Router()

router.get('/users', authenticateToken, (request,response)=>{
    try {
        const getUsersData = `SELECT * FROM Users;`
        dbConnection.query(getUsersData, (error,data) => {
            if (error) return response.status(500).json({"Message": error.message})
            data.length != 0 ? response.status(200).json({"UsersData": data}) : response.json({"Message": "No data is present in the Users."})
        })
    } catch(error) {
        response.status(500).json({"Message": error.message})
    }
});

module.exports = router;