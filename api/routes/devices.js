const express = require("express");
const  router = express.Router();


router.get("/testing", (req, res)=>{
    console.log('hello api from devices.js')
    res.send("hello iot apiiiii")
})

module.exports = router;