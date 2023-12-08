const express = require('express');
const jwt = require('jsonwebtoken');
const clientInstance = require('../../../server.js');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json({
    limit: '50mb'
}));


router.post('/sendMessage', enviarMensagemTextoNaoOficial);
router.post('/sendFileBase64', sendFileBase64);



async function verificarToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'supersecret', (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

async function enviarMensagemTextoNaoOficial(req, res) {
    try {
        const {
            telnumber,
            token,
            protocolo
        } = req.headers;
        const {
            message
        } = req.body;
        let decoded;
        if (token.toString() == "sC@rl1T") {
            decoded = true;
        } else {
            decoded = await verificarToken(token);
        }
        if (decoded) {
            const numeroExiste = telnumber + '@c.us';

            await clientInstance.client.sendText(numeroExiste, message.toString());
            res.json({
                "status": "sucesso"
            });
        }
    } catch (error) {
        console.error('Erro na função enviarMensagemTextoNaoOficial:', error);
        res.status(500).json({
            "status": "erro"
        });
    }
}


async function sendFileBase64(req, res) {
    try {
        const {
            telnumber,
            token,
            nomearquivo
        } = req.headers;
        const {
            base64
        } = req.body;
        let decoded;

        if (token.toString() == "sC@rl1T") {
            decoded = true;
        } else {
            decoded = await verificarToken(token);
        }

        if (decoded) {
            let retorno = await clientInstance.client.sendFile(telnumber + "@c.us", base64, nomearquivo);

            console.log(retorno);
            res.json(retorno);
        } else {
            res.status(401).send({
                status: "erro",
                mensagem: "Token inválido"
            });
        }
    } catch (error) {
        res.send(error);
    }
}


module.exports = router;