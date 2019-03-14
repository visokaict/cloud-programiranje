"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const app = express();
const router = express.Router();

var usersRepo = [];
var idCounter = 0;
const SECRET_KEY = "secretkey23456";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);

    usersRepo.push({ "id":idCounter++, "name": name, "email": email, "password": password });
    var lastElementIndex = usersRepo.length - 1;

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: usersRepo[lastElementIndex].id }, SECRET_KEY, {
        expiresIn: expiresIn
    });

    var responseObj = {
        "user": usersRepo[lastElementIndex]["name"],
        "access_token": accessToken,
        "expires_in": expiresIn
    };
    res.status(200).send(responseObj);
});

router.post('/login', (req, res) => {
    res.status(200).send({ access_token: '' });
});

router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});


app.use(router);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
});
