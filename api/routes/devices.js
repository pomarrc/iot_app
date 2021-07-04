const express = require("express");
const  router = express.Router();
const { checkAuth } = require('../middlewares/authentication.js')

router.get("/device",checkAuth, (req, res)=>{
    
    console.log(req.userData);
    const toSend = {
        status: "Success",
        data: "[1,2,4,56,6,7]"
  }
  return res.status(200).json(toSend);

});

router.post("/device", (req, res)=>{
});

router.delete("/device", (req, res)=>{
});

router.put("/device", (req, res)=>{
});




module.exports = router;