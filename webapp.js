var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');

const app = express();

app.use(express.static('build'));

app.use(bodyParser.json());

const test = [
  {
    a: 1,
    b: 2
  },{
    a: 3,
    b: 4
  },{
    a: 5,
    b: 6
  },{
    a: 7,
    b: 8
  }
];

const cmcApi_1 = {
  host: 'api.coinmarketcap.com',
  port: '80',
  path: '/v1/global/',
  method: 'GET'
};

const externalApiCall = function(callback) {
  const reqGet = http.request(cmcApi_1, function(res, err) {
    if (err) {
      console.log('API error: ', err);
    } else {
      res.on('data', function(data) {
        callback(data);
      });
    }
  });
  reqGet.end();
  reqGet.on('error', function(e) {
    console.error(e);
  });
}

app.get('/api/data', function(req, res) {
    externalApiCall(
      function(data) {
        data = JSON.parse(data);
        res.json(data);
      }
    );
});

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log("Started server @ port", port);
});
