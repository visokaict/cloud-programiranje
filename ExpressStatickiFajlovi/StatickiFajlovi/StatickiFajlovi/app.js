var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(express.static('public'));// folder gde se nalaze staticki fajlovi
app.use(bodyParser.json()); //podrska za podatke koji su JSON formatu
app.use(bodyParser.urlencoded({ extended: true })); //podrska za URL enkodovane podatke

app.get('/',function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/process_post', function(req, res,next) {
    var parametri = JSON.stringify(req.body);
    console.log("Prosledjeni podaci su: %s",parametri);
    res.json(req.body);
    //res.redirect("/");
    //next();
});


var server = app.listen(3000,function() {

        var host = server.address().address;
        var port = server.address().port;

        console.log("Aplikacija radi na adresi http://%s:%s", host, port);

});


