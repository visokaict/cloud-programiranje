var express = require('express');
var app = express();

var mojMiddleware = require("./mojMiddleware");

app.use(mojMiddleware({ option1: "1", option2: "2" }));

app.get('/', function (req, res) {
    var responseText = 'Zdravo!<br>';
    responseText += '<small>Zahtevano u: ' + req.jsonData + '</small>';
    res.send(responseText);
});

app.listen(3000);