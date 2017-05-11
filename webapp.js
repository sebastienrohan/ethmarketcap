const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const async = require('async');

const app = express();
app.use(express.static('build'));
// to parse JSON
app.use(bodyParser.json());

/*
const cmcApi_global = {
  host: 'api.coinmarketcap.com',
  port: '80',
  path: '/v1/global/',
  method: 'GET'
};
*/

// CoinMarketCap API names for the coins
const coins = [
  'ethereum',
  'augur',
  'golem-network-tokens',
  /*'gnosis-gno',
  'digixdao',
  'singulardtv',
  'iconomi',
  'firstblood',
  'melon',
  'tokencard'*/
];

// initialize final array
let dataToSend = [];

/*
// add data for this coin to the final array (function used in externalCall)
const buildDataToSend = function(receivedData) {
  let coinData = JSON.parse(receivedData);
  console.log('coin data: ', receivedData);
  // build the data to be returned to the client
  dataToSend.push(
    {
      name: coinData[0].name,
      marketcap: coinData[0].market_cap_usd,
      change: coinData[0].percent_change_24h
    }
  );
};
*/

// central function that will be applied by async to each coin
const externalCall = function(coin, doneCallback) {
  // initialize temporary coin data storage
  let tempData = {};
  const reqGet = http.request(
    // external API parameters
    {
      host: 'api.coinmarketcap.com',
      path: '/v1/ticker/' + coin + '/',
      method: 'GET'
    },
    // http request callback to execute on response from external API
    function(res) {
      res.on('data', function(receivedData) {
        receivedData = JSON.parse(receivedData);
        console.log('coin data: ', receivedData);
        tempData = {
          name: receivedData[0].name,
          marketcap: receivedData[0].market_cap_usd,
          change: receivedData[0].percent_change_24h
        }
        // callback for the central function : add data for this coin to the final array
        return doneCallback(null, tempData);
      });
    }
  );
  // send the external API request
  reqGet.end();
  console.log('called api for ' + coin);
  reqGet.on('error', function(e) {
    console.error(e);
  });
};

/*
// final callback function for async
const sendData = function(err, dataToSend) {
  if (err) {
    console.log('API error: ', err);
  } else {
    // send to client
    console.log('dataToSend: ', dataToSend);
  }
};
*/

app.get('/api/data', function(req, res) {
  async.map(
    coins,
    externalCall,
    function(err, dataToSend) {
      if (err) {
        console.log('API error: ', err);
      } else {
        // send to client
        console.log('dataToSend: ', dataToSend);
        res.json(dataToSend);
      }
    }
  );
});

/* non-async implementation

const externalApiCall = function(coin, callback) {
  const reqGet = http.request({
   host: 'api.coinmarketcap.com',
   path: '/v1/ticker/' + coin + '/',
   method: 'GET'
 }, function(err, res) {
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

app.get('/api/data', function(req, res) {
  // call API for each coin in the array
  coins.forEach((coin) => {
    externalApiCall(coin,
      // callback function to execute after each API call
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
        console.log('partial completeData: ', completeData);
        // send data to the client
        res.json(completeData);
      }
    );
  });
});

*/

// launch the server
const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log("Started server @ port", port);
});
