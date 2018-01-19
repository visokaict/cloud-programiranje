var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Zdravo svete !!!");
    console.log("Putanja / pozvana !!!!");
});

app.get('/prva', function (req, res) {
    res.send("Zdravo ovo je odgovor sa putanje /prva !!!");
    console.log("Putanja /prva pozvana !!!!");
});

//NAPOMENA: probajte da pogodite putanju koja nije definisana

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Aplikacija dostupna na http://%s:%s", host, port);
});