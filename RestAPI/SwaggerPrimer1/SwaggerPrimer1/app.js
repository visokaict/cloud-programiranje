var express = require('express');
var app = express();
var router = express.Router();

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');



var getRequest = function (req, res, next) {
    res.send('GET request /test');
    next();
};

var postRequest = function (req, res, next) {
    res.send('POST request /test');
    next();
};

var putRequest = function (req, res, next) {
    res.send('PUT request /test');
    next();
};

var deleteRequest = function (req, res, next) {
    res.send('DELETE request /test');
    next();
};

router.route("/test").get(getRequest).post(postRequest).put(putRequest).delete(deleteRequest);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.listen(3000);

