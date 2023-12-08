var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/token', function (req, res) {
    var test = req.headers;
    if (test.username === "Scarlat" && test.senha === "334455Matheus@") {
        var token = jwt.sign({
            username: 'Scarlat',
            senha: "334455Matheus@"
        }, 'supersecret', {
            expiresIn: 120
        });
        res.json({
            "Token": token
        });
    } else if (test.username === "Tamarozzi" && test.senha === "5D8b9F2g1@") {
        var token = jwt.sign({
            username: 'Tamarozzi',
            senha: "5D8b9F2g1@"
        }, 'supersecret', {
            expiresIn: 120
        });
        res.json({
            "Token": token
        });
    } else {
        res.send("ERRO");
    }
})

module.exports = router;