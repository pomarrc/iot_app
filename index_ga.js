var mysql = require("mysql");
var mqtt = require("mqtt");

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MQSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
var options = {
  port: process.env.MQTT_TCP_TLS_PORT,
  host: process.env.EMQX_NODE_HOST,
  clientId:
    "api_smartgas_access_control_server_" +
    Math.round(Math.random() * (0 - 1000) * -1),
  username: process.env.EMQX_NODE_SUPERUSER_USER,
  password: process.env.EMQX_NODE_SUPERUSER_PASSWORD,
  keepalive: 60,
  reconnectPeriod: 5000,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  encoding: "utf8"
};
var client = mqtt.connect(
  process.env.MQTT_TCP_TLS_PREFIX + process.env.EMQX_NODE_HOST,
  options
);

//var moment = require('moment-timezone');
//moment().tz("America/Los_Angeles").format();
//console.log('La fecha actual es',moment);

//HAGO LA CONEXION A MQTT COMO OTRO cliente
client.on("connect", function() {
  console.log("conexion mqtt exito!");
  client.subscribe("+/#", function(err) {
    ///me subscribo a todos
    console.log("suscrito exito");
  });
});
//cuando se recibe un mensaje
client.on("message", function(topic, message) {
  console.log(
    "mensaje recibido desde -> " + topic + " Mensaje -> " + message.toString()
  );
  var topic_splitted = topic.split("/");
  var serial_number = topic_splitted[0];
  var query = topic_splitted[1];

  if (query == "solicitud") {
    var dispositivo_contrato = message.toString();
    //hacemos busqueda

    var query =
      "SELECT * FROM dispositivos_copy WHERE dispositivo_serie ='" +
      serial_number +
      "' AND dispositivo_contrato ='" +
      dispositivo_contrato +
      "'";
    con.query(query, function(err, result, fields) {
      if (err) throw err; //por si hay error;
      console.log(result);
      dia_cortes = result[0].dispositivo_fechacorte;
      console.log("fecha de corte es:" + dia_cortes);

      if (result[0].dispositivo_status == "tiempo_real") {
        console.log("Monitoreo en tiempo real");
        client.publish(serial_number + "/command", "tiempo_real");
      }

      if (result[0].dispositivo_status == "30seg") {
        console.log("Monitoreo cada 30 segundos");
        client.publish(serial_number + "/command", "medio_min");
      }

      if (result[0].dispositivo_status == "unmin") {
        console.log("Monitoreo cada minuto");
        client.publish(serial_number + "/command", "un_min");
      }

      if (result[0].dispositivo_status == "3min") {
        console.log("Monitoreo cada 3 minutos");
        client.publish(serial_number + "/command", "tres_min");
      }

      if (result[0].dispositivo_status == "7min") {
        console.log("Monitoreo cada 7 minutos");
        client.publish(serial_number + "/command", "siete_min");
      }

      if (result[0].dispositivo_status == "unahora") {
        console.log("Monitoreo cada hora");
        client.publish(serial_number + "/command", "una_hora");
      }

      if (result[0].dispositivo_status == "6horas") {
        console.log("Monitoreo cada 6 horas");
        client.publish(serial_number + "/command", "seis_horas");
      }

      if (result[0].dispositivo_status == "12horas") {
        console.log("Monitoreo cada 12 horas");
        client.publish(serial_number + "/command", "medio_dia");
      }

      if (result[0].dispositivo_status == "24horas") {
        console.log("Monitoreo una vez al dia");
        client.publish(serial_number + "/command", "un_dia");
      }

      if (result[0].dispositivo_status == "5dias") {
        console.log("Monitoreo casa 5 dias");
        client.publish(serial_number + "/command", "power_off");
      }
    });
  }
  if (query == "lecturagas") {
    var mensaje = message.toString();
    var message_splitted = mensaje.split("/");
    var consumogas = message_splitted[0];
    var voltaje = message_splitted[1];
    var porcentaje = message_splitted[2];

    //hacemos consulta para insetar

    //var query = "INSERT INTO `admin_demo_panel`.`data` ( `data_consumo`, `data_serie`) VALUES ( "+ consumogas + ","+ serial_number+");";
    var query =
      "INSERT INTO `admin_demo_panel`.`data` ( `data_consumo`, `data_serie`, `data_porc`,`data_volt`) VALUES ( " +
      consumogas +
      "," +
      serial_number +
      "," +
      porcentaje +
      "," +
      voltaje +
      ");";
    con.query(query, function(err, result, fields) {
      if (err) throw err; //por si hay error;
      console.log("fila insertada correctamente!");
    });
    //
    //  var query = "SELECT users_us_fecha_corte FROM users_us WHERE users_us_serie ='10503'";
    //   con.query(query, function(err, result, fields){
    //   if (err) throw err;//por si hay error;
    //   console.log("fecha de corte es:" + result[0].users_us_fecha_corte);

    //   });
  }

  if (query == "nodejs") {
    var mensaje = message.toString();
    if (mensaje == "tiempo_real") {
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='tiempo_real' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }
    if (mensaje == "30seg") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='30seg' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "unmin") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='unmin' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "3min") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='3min' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "7min") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='7min' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "unahora") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='unahora' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "6horas") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='6horas' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "12horas") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='12horas' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "25horas") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='24horas' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }

    if (mensaje == "5dias") {
      //REFUSED
      //hacemos consulta para insetar
      //UPDATE `admin_demo_panel`.`dispositivos` SET `dispositivo_status`='pagado' WHERE  `dispositivo_serie`=10503;
      var query =
        "UPDATE `admin_demo_panel`.`dispositivos_copy` SET `dispositivo_status`='5dias' WHERE  `dispositivo_serie`='" +
        serial_number +
        "'";
      con.query(query, function(err, result, fields) {
        if (err) throw err; //por si hay error;
        console.log("fila actualizada correctamente en tabla control!");
      });
    }
  }
});

//para mantener session activa
setInterval(function() {
  var query = "SELECT 1 + 1 as result";
  con.query(query, function(err, result, fields) {
    if (err) throw err;
  });
}, 5000);
