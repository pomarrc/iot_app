const express = require("express");
const  router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//modell import
import User from '../models/user.js'
router.get('/new-user',async(req,res)=>{
    const user = await User.create(
        {
            name: "Benjamein",
            email: "a@.com",
            password :"1212"
        });
});

module.exports = router;