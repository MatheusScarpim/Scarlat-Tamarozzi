const servidorExpress = require('./src/assets/Hospedagem/HospedaExpress.js');
const wpp = require('@wppconnect-team/wppconnect');

wpp.create({
        session: 'tamarozzi',
        multidevice: true,
        headless: true,
        updatesLog: true,
        debug: true,
    })
    .then((client) => start(client))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


function start(client) {
    module.exports.client = client
};