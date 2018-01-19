module.exports = function (options) {
    return function (req, res, next) {
        var jsonString = JSON.stringify(options);
        console.log("Pozvan mojMiddlevare");
        console.log("Prosledjeni podaci su: %s", jsonString);
        req.jsonData = jsonString;
        next();
    }
}
