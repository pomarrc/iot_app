const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const axios = require("axios");
const colors = require("colors");
var mqtt = require("mqtt");

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
import EmqxAuthRule from "../models/emqx_auth.js";
import Notification from "../models/notifications";
import AlarmRule from "../models/emqx_alarm_rule.js";
import Template from "../models/template.js";

var client;
/*               
   ##   #####  # 
  #  #  #    # # 
 #    # #    # # 
 ###### #####  # 
 #    # #      # 
 #    # #      # 
                 
*/
var ex = {
  username: "superuser",
  password: "superuser",
  topic: "5ffcc00149fdcf311a4de607/22222/",
  variables: [
    {
      variable: "6hRtQGSFIl",
      variableFullName: "Temperature",
      variableType: "input",
      variableSendFreq: 10
    },
    {
      variable: "byTmALXl2Y",
      variableFullName: "Humidity",
      variableType: "input",
      variableSendFreq: 5
    },
    {
      variable: "PMHPI0zBNQ",
      variableFullName: "Pump",
      variableType: "output",
      variableSendFreq: undefined
    },
    {
      variable: "yvFApiNOqz",
      variableFullName: "Fan",
      variableType: "output",
      variableSendFreq: undefined
    }
  ]
};

//DEVICE CREDENTIALS WEBHOOK
router.post("/getdevicecredentials", async (req, res) => {
  console.log(req.body);

  const dId = req.body.dId;

  const password = req.body.password;

  const device = await Device.findOne({ dId: dId });

  if (password != device.password) {
    return res.status(401).json(); //cambiar el tipo de respuesta en produccion
  }

  const userId = device.userId;

  var credentials = await getDeviceMqttCredentials(dId, userId);

  var template = await Template.findOne({ _id: device.templateId });

  console.log(template);

  var variables = [];

  template.widgets.forEach(widget => {
    var v = (({
      variable,
      variableFullName,
      variableType,
      variableSendFreq
    }) => ({
      variable,
      variableFullName,
      variableType,
      variableSendFreq
    }))(widget);

    variables.push(v);
  });

  const toSend = {
    username: credentials.username,
    password: credentials.password,
    topic: userId + "/" + dId + "/",
    variables: variables
  };

  console.log(toSend);

  res.json(toSend);

  setTimeout(() => {
    getDeviceMqttCredentials(dId, userId);
    console.log("Device Credentials Updated");
  }, 10000);
});
//SAVER WEBHOOK
router.post("/saver-webhook", async (req, res) => {
  if (req.headers.token != process.env.EMQX_API_TOKEN) {
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
//ALARM WEBHOOK
router.post("/alarm-webhook", async (req, res) => {
  try {
    if (req.headers.token != process.env.EMQX_API_TOKEN) {
      req.sendStatus(404);
      return;
    }
    res.sendStatus(200); //solta a emqx
    const incomingAlarm = req.body;

    updateAlarmCounter(incomingAlarm.emqxRuleId);

    const lastNotif = await Notification.find({
      dId: incomingAlarm.dId,
      emqxRuleId: incomingAlarm.emqxRuleId
    })
      .sort({ time: -1 })
      .limit(1); //trae la ultima notificacion hace consulta en mongodb

    if (lastNotif == 0) {
      console.log("FIRST TIME ALARM");
      saveNotifToMongo(incomingAlarm); //si no hay ninguna notificacion anterior
      sendMqttNotif(incomingAlarm);
    } else {
      const lastNotifToNowMins = (Date.now() - lastNotif[0].time) / 1000 / 60; //pasamos ms a s

      if (lastNotifToNowMins > incomingAlarm.triggerTime) {
        console.log("TRIGGERED");
        saveNotifToMongo(incomingAlarm);
        sendMqttNotif(incomingAlarm);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(200);
  }
});

//nota van en otra ruta
//GET NOTIFICATIONS
router.get("/notifications", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;

    const notifications = await getNotifications(userId);
    const toSend = {
      status: "success",
      data: notifications
    };

    res.json(toSend);
  } catch (error) {
    console.log("ERROR GETTING NOTIFICATIONS");
    console.log(error);

    const toSend = {
      status: "error",
      error: error
    };

    return res.status(500).json(toSend);
  }
});

//UPDATE NOTIFICATION (readed status)
router.put("/notifications", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;

    const notificationId = req.body.notifId;

    await Notification.updateOne(
      { userId: userId, _id: notificationId },
      { readed: true }
    );

    const toSend = {
      status: "success"
    };

    res.json(toSend);
  } catch (error) {
    console.log("ERROR UPDATING NOTIFICATION STATUS");
    console.log(error);

    const toSend = {
      status: "error",
      error: error
    };

    return res.status(500).json(toSend);
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

async function getDeviceMqttCredentials(dId, userId) {
  try {
    var rule = await EmqxAuthRule.find({
      type: "device",
      userId: userId,
      dId: dId
    });

    if (rule.length == 0) {
      const newRule = {
        userId: userId,
        dId: dId,
        username: makeid(10),
        password: makeid(10),
        publish: [userId + "/" + dId + "/+/sdata"],
        subscribe: [userId + "/" + dId + "/+/actdata"],
        type: "device",
        time: Date.now(),
        updatedTime: Date.now()
      };

      const result = await EmqxAuthRule.create(newRule);

      const toReturn = {
        username: result.username,
        password: result.password
      };

      return toReturn;
    }

    const newUserName = makeid(10);
    const newPassword = makeid(10);

    const result = await EmqxAuthRule.updateOne(
      { type: "device", dId: dId },
      {
        $set: {
          username: newUserName,
          password: newPassword,
          updatedTime: Date.now()
        }
      }
    );

    // update response example
    //{ n: 1, nModified: 1, ok: 1 }

    if (result.n == 1 && result.ok == 1) {
      return {
        username: newUserName,
        password: newPassword
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
//CONNECT CLIENT MQTT
function startMqttClient() {
  const options = {
    port: process.env.MQTT_TCP_TLS_PORT,
    host: process.env.EMQX_NODE_HOST,
    clientId:
      "webhook_superuser" + Math.round(Math.random() * (0 - 10000) * -1),
    username: process.env.EMQX_NODE_SUPERUSER_USER,
    password: process.env.EMQX_NODE_SUPERUSER_PASSWORD,
    keepalive: 60,
    reconnectPeriod: 5000,
    protocolId: "MQIsdp",
    protocolVersion: 3,
    clean: true,
    encoding: "utf8"
  };

  client = mqtt.connect(process.env.MQTT_TCP_TLS_PREFIX + process.env.EMQX_NODE_HOST, options);

  client.on("connect", function() {
    console.log("MQTT CONNECTION -> SUCCESS;".green);
    console.log("\n");
  });

  client.on("reconnect", error => {
    console.log("RECONNECTING MQTT");
    console.log(error);
  });

  client.on("error", error => {
    console.log("MQTT CONNECIONT FAIL -> ");
    console.log(error);
  });
}
//SEND NOTIFI MQTT
function sendMqttNotif(notif) {
  const topic = notif.userId + "/dummy-did/dummy-var/notif"; //enviado a un usuario en particular
  const msg =
    "The rule: when the " +
    notif.variableFullName +
    " is " +
    notif.condition +
    " than " +
    notif.value;
  client.publish(topic, msg);
}
//GET ALL NOT READED NOTIFICATIONS
async function getNotifications(userId) {
  try {
    const res = await Notification.find({ userId: userId, readed: false });
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//SAVE NOTIFICATION IN MONGO
function saveNotifToMongo(incomingAlarm) {
  try {
    var newNotif = incomingAlarm;
    newNotif.time = Date.now();
    newNotif.readed = false;
    Notification.create(newNotif);
  } catch (error) {
    console.log(error);
  }
}
//UPDATE ALARM COUNTER
async function updateAlarmCounter(emqxRuleId) {
  try {
    await AlarmRule.updateOne(
      { emqxRuleId: emqxRuleId },
      { $inc: { counter: 1 } }
    );
  } catch (error) {
    console.log(error);
  }
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
//MQTT
setTimeout(() => {
  startMqttClient();
}, 3000);

module.exports = router;
