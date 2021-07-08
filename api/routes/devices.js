const express = require("express");
const  router = express.Router();
const { checkAuth } = require('../middlewares/authentication.js')
import { select } from 'd3';
import { async } from 'q';
/*
#     # ####### ######  ####### #        #####  
##   ## #     # #     # #       #       #     # 
# # # # #     # #     # #       #       #       
#  #  # #     # #     # #####   #        #####  
#     # #     # #     # #       #             # 
#     # #     # #     # #       #       #     # 
#     # ####### ######  ####### #######  ##### 
*/
import Device from '../models/device.js'
/*
                 
   ##   #####  # 
  #  #  #    # # 
 #    # #    # # 
 ###### #####  # 
 #    # #      # 
 #    # #      # 
                 
*/
//GET DEVICES
router.get("/device",checkAuth,async (req, res)=>{
    try {
        const userId = req.userData._id;
        const devices = await Device.find({userId: userId});
        const toSend = {
        status: "success",
        data: devices
        }
        return res.json(toSend);
    } catch (error) {
        console.log("Error getting devices")
        const toSend = {
            status: "error",
            error: error

        }
        return res.status(500).json(toSend);
    }
    
   

});

//NEW DEVICE
router.post("/device",checkAuth, async(req, res)=>{

    try {
        const userId = req.userData._id;
        var newDevice = req.body.newDevice;
        newDevice.userId = userId;
        newDevice.createdTime = Date.now();
        const device = await Device.create(newDevice);
        selectDevice(userId, newDevice.dId);//LO PONE EN TRUE CUANDO SE CREA
        const toSend = {
        status: "success",

    }
    return res.json(toSend);
    } catch (error) {
        console.log("Error creating new device");
        console.log(error);
        const toSend = {
            status: "error",
            error: error
        }
       return res.status(500).json(toSend);

    }
    


});
//DELETE DEVICE
router.delete("/device", checkAuth, async(req, res)=>{//PENDIENTE 
   try {
        const userId = req.userData._id;
        const dId = req.query.dId;
        //.....
        const result = await Device.deleteOne({userId: userId, dId: dId});

        const toSend = {
            status: "success",
            data: result

        }
        return res.json(toSend);
       
   } catch (error) {
        console.log("Error deleting device");
        console.log(error);
        const toSend = {
        status: "error",
        error: error
    }
   return res.status(500).json(toSend);

       
   }


});
//UPDATE DEVICE
router.put("/device",checkAuth, (req, res)=>{
    const dId = req.body.dId;
    const userId = req.userData._id;
    if(selectDevice(userId,dId)){
        const toSend = {
            status: "success",
    

        }
        return res.json(toSend);

    }else{
        const toSend = {
            status: "error",

        }
        return res.json(toSend);

    }
    

});


/*
                                                          
 ###### #    # #    #  ####  ##### #  ####  #    #  ####  
 #      #    # ##   # #    #   #   # #    # ##   # #      
 #####  #    # # #  # #        #   # #    # # #  #  ####  
 #      #    # #  # # #        #   # #    # #  # #      # 
 #      #    # #   ## #    #   #   # #    # #   ## #    # 
 #       ####  #    #  ####    #   #  ####  #    #  ####  
                                                          
*/

 
async function selectDevice(userId ,dId){
    try {
        const result = await Device.updateMany({userId: userId},{selected:false});
        const result2 = await Device.updateOne({dId: dId, userId: userId},{selected:true});
        return true;
    } catch (error) {
        console.log("Error in 'selectDevice' function");
        console.log(error);
        return false;
        
    }
    
    

}


module.exports = router;