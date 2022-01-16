//requires
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const WebSocket = require("ws");
const fs = require("fs");
const https = require("https");
require("dotenv").config();

//instances
const app = express();
const app3 = express();
//express config
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
//////////////////////////////
app3.use(morgan("tiny"));
app3.use(express.json());
app3.use(
  express.urlencoded({
    extended: true
  })
);
app3.use(cors());
/////////////////////////////



//express routes
app.use("/api", require("./routes/devices.js"));
app.use("/api", require("./routes/users.js"));
app.use("/api", require("./routes/templates.js"));
app.use("/api", require("./routes/webhooks.js"));
app.use("/api", require("./routes/emqxapi.js"));
app.use("/api", require("./routes/alarms.js"));
app.use("/api", require("./routes/dataprovider.js"));
module.exports = app;
///////////////////
app3.use("/api", require("./routes/devices.js"));
app3.use("/api", require("./routes/users.js"));
app3.use("/api", require("./routes/templates.js"));
app3.use("/api", require("./routes/webhooks.js"));
app3.use("/api", require("./routes/emqxapi.js"));
app3.use("/api", require("./routes/alarms.js"));
app3.use("/api", require("./routes/dataprovider.js"));
module.exports = app3;

///////////////////

//listener https
if (process.env.environment == "prod") {
  https
    .createServer(
      {
        cert: fs.readFileSync("./certs/cert.pem"),
        key: fs.readFileSync("./certs/key.key"),
        ca: fs.readFileSync("./certs/ca.pem")
      },
      app
    )
    .listen(process.env.API_PORT, () => {
      console.log("API server https listening on port " + process.env.API_PORT);
    });
}
if (process.env.environment == "dev") {
  //listener
  app.listen(process.env.API_PORT, () => {
    console.log("API server listening on port " + process.env.API_PORT);
  });
}

if (process.env.environment == "prod") {
  const app2 = express();

  app2.listen(3002, function() {
    console.log("Listening on port 3002 ");
  });

  app2.all("*", function(req, res) {
    console.log("NO SSL ACCESS .. REDIRECTING...");
    return res.redirect("https://" + req.headers["host"] + req.url);
  });
}

//////////////////////////
 app3.listen(3003, () => {
    console.log("API server listening http on port " + 3003);
  });

/////////////////////////


//Mongo Connection
const mongoUserName = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDatabase = process.env.MONGO_DATABASE;

var uri =
  "mongodb://" +
  mongoUserName +
  ":" +
  mongoPassword +
  "@" +
  mongoHost +
  ":" +
  mongoPort +
  "/" +
  mongoDatabase;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  authSource: "admin"
};

mongoose.connect(uri, options).then(
  () => {
    console.log("\n");
    console.log("*******************************".green);
    console.log("✔ Mongo Successfully Connected!".green);
    console.log("*******************************".green);
    console.log("\n");
    global.check_mqtt_superuser();
  },
  err => {
    console.log("\n");
    console.log("*******************************".red);
    console.log("    Mongo Connection Failed    ".red);
    console.log("*******************************".red);
    console.log("\n");
    console.log(err);
  }
);

//********************************************* */
//*******    C A M A R I T A ****************** */
//********************************************* */
//prod
var wsServer = null;
if (process.env.environment == "prod") {
  var processRequest = function(req, res) {
    console.log("Request received.");
  };
  var httpServ = require("https");
  var ssl = null;

  ssl = httpServ
    .createServer(
      {
        cert: fs.readFileSync("./certs/cert.pem"),
        key: fs.readFileSync("./certs/key.key"),
        ca: fs.readFileSync("./certs/ca.pem")
      },
      processRequest
    )
    .listen(process.env.WSS_PORT);

  wsServer = new WebSocket.Server({ server: ssl }, () =>
    console.log(">>>>> WSS server  listening ")
  );
}

//dev
if (process.env.environment == "dev") {
  wsServer = new WebSocket.Server({ port: process.env.WSS_PORT }, () =>
    console.log(">>>>> WS Server  listening ")
  );
}

let connectedClients = [];
let connectedCams = [];

//Servidor atento a que se realice una
//conexión
wsServer.on("connection", (ws, req) => {
  console.log("Connected");

  ws.on("message", data => {
    try {
      if (data.indexOf("WEB_CLIENT") !== -1) {
        connectedClients.push(ws);
        console.log("WEB_CLIENT ADDED");
        console.log(connectedClients.length);
        return;
      }

      if (data == "CAM_CLIENT") {
        connectedCams.push(ws);
        console.log("CAM CLIENT ADDED");
        console.log(connectedCams.length);
        return;
      }

      connectedClients.forEach((ws, i) => {
        if (connectedClients[i] == ws && ws.readyState === ws.OPEN) {
          ws.send(data);
        } else {
          connectedClients.splice(i, 1);
          console.log("WEB_CLIENT DELETED");
        }
      });
    } catch (error) {
      console.log("error en server cam 3");
    }
  });

  ws.on("error", error => {
    console.error("WebSocket error observed: ", error);
  });
});

function sendClientsToCam() {
  connectedCams.forEach((ws, i) => {
    try {
      if (connectedCams[i] == ws && ws.readyState === ws.OPEN) {
        ws.send(connectedClients.length.toString());
      } else {
        connectedCams.splice(i, 1);
        console.log("CAM_CLIENT DELETED");
      }
    } catch (error) {
      console.log("error en server cam");
    }
  });

  setTimeout(() => {
    sendClientsToCam();
    //console.log("  " + connectedCams.length);
  }, 1000);
}

sendClientsToCam();
