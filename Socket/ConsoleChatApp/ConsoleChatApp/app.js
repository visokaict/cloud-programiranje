var net = require('net');
/*Broj konekcija.*/
var broj = 0;
var users = {};
/*Kreiraj server.*/
var server = net.createServer(function (conn) {
    var nadimak, uneto = "";
    broj++;
    conn.write(
        '\n > Dobrodosli \033[92mu moj chat\033[39m!'
        + '\n > ' + broj + ' ljudi je povezano na chat.'
        + '\n > unesite vase ime i pritisnite enter: '
    );
    broj++;
    conn.setEncoding('utf8'); //probajte da ovu liniju zakomentarisete da vidite šta ?e te dobiti

    function broadcast(msg, nemojMene) {
        for (var i in users) {
            if (!nemojMene || i != nadimak) { users[i].write(msg); }
        }
    }

    conn.on('data', function (data) {
        //console.log(data);
        if (!nadimak) {
            if (users[data]) {
                conn.write('\033[93m>nadimak se vec koristi izaberite drugi:\033[39m ');
                return;
            } else {
                if (data == '\r\n') {
                    nadimak = uneto;
                    users[nadimak] = conn;
                    for (var i in users) {
                        users[i].write('\033[90m> ' + nadimak + ' se pridruzio chat-u\033[39m\n');
                    }
                    uneto = "";
                } else { uneto += data; }
            }
        } else {
            if (data == "\r\n") {
                for (var i in users) {
                    if (i != nadimak) {
                        users[i].write('\033[96m> ' + nadimak + ':\033[39m ' + uneto + '\n');
                    }
                }
                uneto = "";
            } else { uneto += data; }
        }

    });

    conn.on('close', function () {
        broj--;
        delete users[nadimak];
        broadcast('\033[90m > ' + nadimak + ' je napustio chat\033[39m\n');
    });

    console.log('\033[90m   nova konekcija!\033[39m');

});
/*Slusanje konekcije. Izvrsava se svaki put kada se uspostavi konekcija*/
server.listen(3000, function () {
    console.log('\033[96m   server slusa na *:3000\033[39m');
});

