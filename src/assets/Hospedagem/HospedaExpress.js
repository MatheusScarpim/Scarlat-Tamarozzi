const express = require('express');
const http = require('http');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

const path = require('path');
const userRouteToken = require('../Api/requestToken');
const userMensagemPost = require('../Api/requestPost');

app.use('/', userRouteToken);
app.use('/', userMensagemPost);
// app.use('/', ScarlatMeta)

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/status', (req, res) => {
  res.json({
    "status": "OK"
  });
});

const port = process.env.PORT || 7070;
const server = http.createServer(app);

server.listen(port, function () {
  console.log('O app está rodando ' + port);
});

// Exporte todos os módulos em um único objeto
module.exports = {
  userRouteToken: userRouteToken,
  userMensagemPost: userMensagemPost,
};