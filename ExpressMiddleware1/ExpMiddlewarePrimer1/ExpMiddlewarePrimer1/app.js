var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    console.log('Funkcija requestTime pozvana');
    next();
}

app.use(requestTime);

app.get('/',function(req, res) {
        var responseText = 'Zdravo!<br>';
        responseText += '<small>Zahtevano u: ' + req.requestTime + '</small>';
        res.send(responseText);
});

app.get('/druga', function (req, res) {
    var responseText = 'Zdravo sa rute druga!<br>';
    responseText += '<small>Zahtevano u: ' + req.requestTime + '</small>';
    res.send(responseText);
});
//NAPOMENA:startujete i jednu i drugu rutu i obratite paznju sta se desava u konzoli
app.listen(3000);

