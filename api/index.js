//requires
const express = require("express");//servidor web
const mongoose = require("mongoose");//interactuar con base de datos a mongodb
const colors = require("colors");//permite implimir console.logs de diferente color para identificar 
const morgan = require("morgan");//middleware algo que se pone enmedio  para ver quien golpea a los endpoint 
const cors = require("cors");//configuracion de politicas de acceso

//instances
const app =express();

//express config
app.use(morgan("tiny"));//middleware configuracion, tiny>version de la salida 
app.use(express.json());//premite trabajar con json en express
app.use(express.urlencoded({//habilita la posibilidad de elementos de la sig manera: user_id=1212&user_name=juan y la transforme en objeto
    extended: true
}));
app.use(cors());//le pasamos las politicas a express para que esten incluidas 

//express routes
app.use('/api',require('./routes/devices.js'));
app.use('/api',require('./routes/users.js'));

module.exports = app;//ordenar todad nuestras rutas o endpoint en archivos separados
//listener
app.listen(3001,()=> {
    console.log('api serves listening on por 3001')
});

//end point test




//Mongo connections
const mongoUserName = "devuser";
const mongoPassword = "devpassword";
const mongoHost = "localhost";
const mongoPort = "27017"
const mongoDatabase = "ioticos_god_level";

var url = "mongodb://" + mongoUserName + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDatabase;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: "admin"
}; 


    mongoose.connect(url,options).then(()=>{
        console.log("\n");
        console.log("************************************".blue);
        console.log(" :) Mongo Successfully Connected!".blue);
        console.log("************************************".blue);
        console.log("\n");
    },
    (err)=>{
        console.log("\n");
        console.log("************************************".red);
        console.log(" :( Mongo Connetion Failed!".red);
        console.log("************************************".red);
        console.log("\n");
    });



