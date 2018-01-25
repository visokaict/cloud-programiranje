var express = require('express');
var app = express();

app.get('/get', function (req, res) {
    res.send('API Get request');
});

app.get('/get/:id', function (req, res) {
    var parametri = JSON.stringify(req.params);
    res.send('API Get request sa parametrom ' + parametri);
});

app.post('/post', function (req, res) {
    res.send('API Post request');
});

app.listen(8000, function () {
    console.log('Port 8000');
});
