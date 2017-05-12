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
let cachedData = [];

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
        // check if coin data is well-formed
        if (receivedData[0]) {
          tempData = {
            name: receivedData[0].name,
            marketcap: receivedData[0].market_cap_usd,
            change: receivedData[0].percent_change_24h
          }
        } else {
          console.log('Coin not found, maybe the id has changed');
        }

        // callback for the central function : add data for this coin to the final array
        return doneCallback(null, tempData);
      });
    }
  );
  // send the external API request
  reqGet.end();
  reqGet.on('error', function(err) {
    console.log('API error: ', err);
  });
};

// handle multiple asynchronous API calls
const asyncCall = function() {
  async.map(
    coins,
    externalCall,
    function(err, dataToSend /* the array in which each tempData object is placed */) {
      if (err) {
        console.log('Async call error: ', err);
        return(err);
      } else {
        // cache data
        cachedData = dataToSend;
      }
    }
  );
}

// call external APIs every 5 minutes
// setInterval(asyncCall, 300000);
asyncCall();

// send data to client
app.get('/api/data', function(req, res, next) {
  // check if data is complete
  if (cachedData.length !== coins.length) {
    console.log('Problem with Coinmarketcap API (maybe the URL changed)');
    return next();
  } else {
    res.json(cachedData);
  }
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
