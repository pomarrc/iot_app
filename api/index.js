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


module.exports = app;//ordenar todad nuestras rutas o endpoint en archivos separados
//listener
app.listen(3001,()=> {
    console.log('api serves listening on por 3001')
});

//end point test

// MONGO_INITDB_ROOT_USERNAME: "devuser"
//MONGO_INITDB_ROOT_PASSWORD: "devpassword"