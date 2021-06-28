//requires
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");

//instances
const app =express();

//listener
app.listen(3001,()=> {
    console.log('api serves listening on por 3001')
});

//end point test

app.get("/testing", (req, res)=>{
    console.log('hello api soy metodo app.get')
    res.send("hello iot apiiiii")
})