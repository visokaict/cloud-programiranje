var express = require('express');
var app = express();

//app.all(), used to load middleware functions at a path for all HTTP request methods
app.all('/test1',
    function (req, res, next) {
        console.log('Pristup test sekciji ...');
        next(); // nastavak izvrsavanje dalje, probaj ovo da uklonis i vidi sta ce se desiti
    });


app.get("/", function(req, res) {
    res.send("Rad sa rutama");
});
app.get('/test1',
    function(req, res) {
        res.send('GET request /test1');
    });

app.post('/test2',
    function(req, res) {
        res.send('POST request /test2');
    });

app.put('/test3',
    function(req, res) {
        res.send('PUT request /test3');
    });

app.delete('/test4',
    function(req, res) {
        res.send('DELETE request /test4');
    });

 /* Prosledivanje parametara */

app.all('/parametri',
    function (req, res, next) {
        console.log('Pristup sekciji sa prosledjivanjem parametara ...');
        next(); 
    });

app.get('/parametri/:podatak',
    function (req, res) {
        var parametri = JSON.stringify(req.params);
        res.send("GET request /parametri/:podatak  Parametri su: " + parametri);
       
    });
var bodyParser = require("body-parser");

app.use(bodyParser.json()); //podrska za podatke koji su JSON formatu
app.use(bodyParser.urlencoded({extended:true})); //podrska za URL enkodovane podatke

app.post('/parametri',
    function (req, res) {
        var parametri = JSON.stringify(req.body);
        res.send('POST request /parametri Parametri su: '+parametri);
    });

app.put('/parametri',
    function (req, res) {
        var parametri = JSON.stringify(req.body);
        res.send('PUT request /parametri Parametri su: '+parametri);
    });

app.delete('/parametri',
    function (req, res) {
        var parametri = JSON.stringify(req.body);
        res.send('DELETE request /parametri Parametri su: '+parametri);
    });

app.listen(3000);
