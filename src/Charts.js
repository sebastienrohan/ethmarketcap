import React, { Component } from 'react';
import { VictoryLabel, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';
import './Charts.css';

class Charts extends Component {
  render() {

  let data = this.props.data;
  let btcCap = Number(data[0].marketcap);
  let btcLabel = `$ ${Math.round(btcCap / 10000000) / 100} B`;
  let ethCap = Number(data[1].marketcap);
  let ethLabel = `$ ${Math.round(ethCap / 10000000) / 100} B`;
  let tokenCap = 0;
  let plotTokenData = [];
  let tokenData = data;
  tokenData.shift(); // remove bitcoin
  tokenData.shift(); // remove ethereum
  for (let i in tokenData) {
    tokenCap += Number(tokenData[i].marketcap);
    plotTokenData.push({
      x: tokenData[i].name,
      y: Number(tokenData[i].marketcap)
    });
  }
  let tokenLabel = `$ ${Math.round(tokenCap / 10000000) / 100} B`;

    return (
      <div className="row">
        <div className="col s6">
          <div>
            <svg viewBox="0 0 400 400" >
              <VictoryPie
                animate={{ duration: 2000 }}
                theme={VictoryTheme.material}
                innerRadius={80}
                cornerRadius={10}
                colorScale={["blue" , "orange"]}
                style={{
                  data: {stroke: "#fff", strokeWidth: 2},
                  labels: {fontSize: 18}
                }}
                data={
                  [{coin: ethLabel, marketcap: ethCap},
                  {coin: btcLabel, marketcap: btcCap}]
                }
                x="coin"
                y="marketcap"
                standalone={false}
                width={400} height={400}
               />
               <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={200} y={200}
                style={{fontSize: 16}}
                text="ETH vs BTC"
              />
            </svg>
          </div>
        </div>
        <div className="col s6">
          <div>
            <svg viewBox="0 0 400 400" >
              <VictoryPie
                animate={{ duration: 2000 }}
                theme={VictoryTheme.material}
                innerRadius={80}
                cornerRadius={10}
                colorScale={["green" , "blue"]}
                style={{
                  data: {stroke: "#fff", strokeWidth: 2},
                  labels: {fontSize: 18}
                }}
                data={
                  [{coin: tokenLabel, marketcap: tokenCap},
                  {coin: ethLabel, marketcap: ethCap}]
                }
                x="coin"
                y="marketcap"
                standalone={false}
                width={400} height={400}
               />
               <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={200} y={200}
                style={{fontSize: 14}}
                text="ETH tokens vs ETH"
              />
            </svg>

          </div>
        </div>
        <div className="col s12">
          <div>
            <VictoryChart
              animate={{ duration: 2000 }}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                style={{
                  tickLabels: {fontSize: 6, padding: 6}
                }}
               />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`$ ${x / 1000000} M`)}
                style={{
                  tickLabels: {fontSize: 7}
                }}
              />
              <VictoryBar
                style={{
                  data: {fill: "red"}, // or green if % > 0
                  labels: {fontSize: 5}
                }}
                data={plotTokenData}
                x="x"
                y="y"
                labels={tokenData.map((token) => (`${token.change} %`))}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
