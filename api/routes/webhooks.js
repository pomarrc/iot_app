const express = require("express");
const router = express.Router();
const axios = require("axios");
const colors = require("colors");
/*
#     # ####### ######  ####### #        #####  
##   ## #     # #     # #       #       #     # 
# # # # #     # #     # #       #       #       
#  #  # #     # #     # #####   #        #####  
#     # #     # #     # #       #             # 
#     # #     # #     # #       #       #     # 
#     # ####### ######  ####### #######  ##### 
*/
import Data from "../models/data.js";
import Device from "../models/device.js";
import Notification from "../models/notifications";

/*
                 
   ##   #####  # 
  #  #  #    # # 
 #    # #    # # 
 ###### #####  # 
 #    # #      # 
 #    # #      # 
                 
*/

router.post("/saver-webhook", async (req, res) => {
  if (req.headers.token != "121212") {
    req.sendStatus(404);
    return;
  }

  const data = req.body;

  const splittedTopic = data.topic.split("/");
  const dId = splittedTopic[1];
  const variable = splittedTopic[2];

  var result = await Device.find({ dId: dId, userId: data.userId });

  if (result.length == 1) {
    Data.create({
      userId: data.userId,
      dId: dId,
      variable: variable,
      value: data.payload.value,
      time: Date.now()
    });
    console.log("Data created");
  }

  res.sendStatus(200);

  console.log(data);
});

router.post("/alarm-webhook", async (req, res) => {
  try {
    if (req.headers.token != "121212") {
      req.sendStatus(404);
      return;
    }

    const incomingAlarm = req.body;

    const lastNotif = await Notification.find({
      dId: incomingAlarm.dId,
      emqxRuleId: incomingAlarm.emqxRuleId
    })
      .sort({ time: -1 })
      .limit(1); //trae la ultima notificacion hace consulta en mongodb

    if (lastNotif == 0) {
      console.log("FIRST TIME ALARM");
      saveNotifToMongo(incomingAlarm); //si no hay ninguna notificacion anterior
    } else {
      const lastNotifToNowMins = (Date.now() - lastNotif[0].time) / 1000 / 60; //pasamos ms a s

      if (lastNotifToNowMins > incomingAlarm.triggerTime) {
        console.log("TRIGGERED");
        saveNotifToMongo(incomingAlarm);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(200);
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

function saveNotifToMongo(incomingAlarm) {
  var newNotif = incomingAlarm;
  newNotif.time = Date.now();
  newNotif.readed = false;
  Notification.create(newNotif);
}

module.exports = router;
