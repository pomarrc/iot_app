const express = require("express");
const  router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//modell import
import User from '../models/user.js'

//post ->req.body
//get ->req.query


router.post("/login",(req,res) =>{

});


//auth register
router.post("/register",async(req,res) =>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const encryptedPassword =bcrypt.hashSync(password,10);
    
        const newUser = {
            name: name,
            email: email,
            password:encryptedPassword 
        }
    
        const user = await User.create(newUser)
        console.log(user);
        const toSend = {
            status:"success"
        }
        res.status(200).json(toSend);
        
    } catch (error) {
        console.log(error);
        console.log("error register endpoint");
        const toSend = {
            status:"error",
            error: error//no mandar el error siempre
        }
        res.status(500).json(toSend);//error 500 algun problema en base de datos
    }

   
});


// router.get('/new-user',async(req,res)=>{//hardcoreado por get 
//     try{
//         const user = await User.create(
//             {
//                 name: "Benjamein",
//                 email: "b@.com",
//                 password :"1212"
//             });
//             res.json({"status":"success"})

//     }catch(error){
//         console.log(error);
//         res.json({"status":"fail"});
//     }
   
// });

module.exports = router;