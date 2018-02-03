var http = require('http');
// pode�avanje request-a 
var options = {
    host: 'localhost',
    port: '3000',
    path: '/api/Osobe/',
};
// Callback funkcija koja obra?uje odgovor
var callback = function (response) {
    // kontinualno a�uriraj stream podaciima
    var body = '';
    response.on('data', function (data) {
        body += data;
    });

    response.on('end', function () {
// kraj prijema podataka.
        console.log(body);
    });
}
// Napravi zahtev ka serveru
var req = http.get(options, callback);
req.end();
