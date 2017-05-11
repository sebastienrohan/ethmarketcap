var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');

const app = express();

app.use(express.static('build'));

app.use(bodyParser.json());

const cmcApi_global = {
  host: 'api.coinmarketcap.com',
  port: '80',
  path: '/v1/global/',
  method: 'GET'
};

const coins = [
  'ethereum',
  'augur',
  'golem'
];

const externalApiCall = function(coin, callback) {
  const reqGet = http.request({
   host: 'api.coinmarketcap.com',
   path: '/v1/ticker/' + coin + '/',
   method: 'GET'
   }, function(res, err) {
    if (err) {
      console.log('API error: ', err);
    } else {
      res.on('data', function(data) {
        callback(data);
      });
    }
  });

  reqGet.end();
  console.log('called api for ' + coin);
  reqGet.on('error', function(e) {
    console.error(e);
  });
}

let completeData = [];

app.get('/api/data', function(req, res) {
    externalApiCall('ethereum',
      // callback
      function(data) {
        data = JSON.parse(data);
        console.log('data: ', data);

        // build the data to be returned to the client
        completeData.push(
          {
            name: data[0].name,
            marketcap: data[0].market_cap_usd,
            change: data[0].percent_change_24h
          }
        );
        console.log('completeData: ', completeData);
        res.json(completeData);
        completeData = [];
      }
    );
});

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log("Started server @ port", port);
});
