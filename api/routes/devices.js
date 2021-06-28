const express = require("express");
const  router = express.Router();


router.get("/testing", (req, res)=>{
    //console.log(req.query.did);//regla si es get viene por query
    var toReturn = {
        status: "Success",
        data: "hola desde get"
        //data: req.query
    }
    console.log('hello api from devices.js get')
    res.json(toReturn)
})

router.post("/testing", (req, res)=>{
    console.log(req.body);//si es post viene por body
    var toReturn = {
        status: "Success",
        data: "hola desde post"
        //data: req.query
    }
    console.log('hello api from devices.js post')
    res.json(toReturn)
})



module.exports = router;