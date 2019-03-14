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
    const email = req.body.email;
    const password = req.body.password;
    var registeredUser = null;
    usersRepo.forEach(function (user) {
        if (user["email"] == email) {
            registeredUser = user;
        }
    });
    if (registeredUser === null) return res.status(404).send('User not found!');

    const result = bcrypt.compareSync(password, registeredUser.password);

    if (!result) return res.status(401).send('Password not valid!');
    
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: registeredUser.id }, SECRET_KEY, {
        expiresIn: expiresIn
    });
    res.status(200).send({ "user": registeredUser.name, "access_token": accessToken, "expires_in": expiresIn });
});

router.post('/protected', (req, res) => {
    const authorization = req.headers.authorization;
    const tokenValue = authorization.split(" ")[1];
    var tokenVerified = jwt.verify(tokenValue, SECRET_KEY, (err, tokenValue) => {
        if (err) {
            res.status(401).send('Token not valid');
        } else {
            res.status(200).send('You token is valid and you are seeing protected resource ');
        }
    });
});

router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});


app.use(router);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
});
