var express = require('express');
var app = express();
//var port = process.env.PORT || 8000; //odkomentarisati na production okruzenju
var port = 3000;
var osobeRouter = express.Router();
var bodyParser = require('body-parser');

//simulacija baze podataka
var osobe = [
    { id: 1, ime: "Marko", prezime: "Spasojevic", pol: "M" },
    { id: 2, ime: "Petar", prezime: "Petrovic", pol: "M" },
    { id: 3, ime: "Jovana", prezime: "Milicevic", pol: "F" }
];
var odgovorObj = {
    data: {},
    errors: []
};

var osobePolPretraga = function (pol) {
    var rezultat = [];
    osobe.forEach(function(obj) {
        if (obj.pol === pol) {
            rezultat.push(obj);
        }
    });
    return rezultat;
};

var osobeIdPretraga = function (id) {
    var rezultat = null;
    osobe.forEach(function (obj) {
        if (obj.id === id) {
            rezultat = obj;
            return;
        }
    });
    return rezultat;
};

var obrisiOsobu = function(id) {
    var niz = [];
    osobe.forEach(function(obj) {
        if (obj.id !== id) {
            niz.push(obj);
        }
    });
    return niz;
};


osobeRouter.route('/Osobe').get(function(req, res) {
    var query = {};
    if (req.query.pol) {
        var rezultat = osobePolPretraga(req.query.pol);
        if (rezultat.length == 0) {
            res.status(404).send();
        } else {
            res.json(rezultat);
        }
        
    } else {
        res.json(osobe);
    }
});

osobeRouter.route('/Osobe/:id').get(function(req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id):null;
    if (id == null) {
        return res.status(500).send();
    } else {
        var rezultat = osobeIdPretraga(id);
        return rezultat != null ? res.json(rezultat) : res.status(404).send();
    }
    
});

osobeRouter.route('/Osobe').post(function (req, res) {
    var newId = osobe.length + 1;
    var osoba = {id:newId,ime:req.body.ime,prezime:req.body.prezime,pol:req.body.pol};
    osobe.push(osoba);
    res.status(201).send(osobe);
});

osobeRouter.route('/Osobe/:id').put(function(req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        return res.status(500).send();
    } else {
        var osoba = osobeIdPretraga(id);
        if (osoba == null) return res.status(404).send();
        osoba.ime = req.body.ime;
        osoba.prezime = req.body.prezime;
        osoba.pol = req.body.pol;
        return res.status(201).json(osobe);
    }
});
osobeRouter.route('/Osobe/:id').patch(function (req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        return res.status(500).send();
    } else {
        var osoba = osobeIdPretraga(id);
        if (osoba == null) return res.status(404).send();
        if (req.body.id) {
            delete req.body.id;
        }
        for (var p in req.body) {
            osoba[p] = req.body[p];
        }
        
        return res.status(201).json(osobe);
    }
});
osobeRouter.route('/Osobe/:id').delete(function(req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    var odgovor = Object.create(odgovorObj);
    if (id == null) {
        res.status(500);
        odgovor.errors.push("Greska na serveru !!!");
        return res.json(odgovor);
    } else {
        var osoba = osobeIdPretraga(id);
        if (osoba == null) return res.status(404).send();
        var noviNiz = obrisiOsobu(id);
        res.status(201);
        odgovor.data = noviNiz;
        return res.json(odgovor);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', osobeRouter);

app.get('/', function (req, res) {
    res.send('Dobrodosli u API');
});



app.listen(port, function () {
    console.log('REST API radi na portu %s',port);
});