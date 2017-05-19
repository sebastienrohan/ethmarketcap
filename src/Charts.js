import React, { Component } from 'react';
import { VictoryLabel, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';

class Charts extends Component {
  render() {

  let data = this.props.data;
  let btcCap = Number(data[0].marketcap);
  let btcLabel = `$ ${Math.round(btcCap / 10000000) / 100} B`;
  let ethCap = Number(data[1].marketcap);
  let ethLabel = `$ ${Math.round(ethCap / 10000000) / 100} B`;
  let tokenCap = 0;
  let plotTokenData = []; // for use in the VictoryBar
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
      <div className="row" style={{ marginTop: '8%' }}>
        <div className="col s12 m6 l4 animated slideInLeft">
          <div>
            <svg viewBox="0 0 400 400" >
              <VictoryPie
                theme={VictoryTheme.material}
                innerRadius={80}
                cornerRadius={10}
                colorScale={["blue" , "orange"]}
                style={{
                  data: {stroke: "#fff", strokeWidth: 2},
                  labels: {fontSize: 12}
                }}
                data={
                  [{coin: ethLabel, marketcap: ethCap},
                  {coin: btcLabel, marketcap: btcCap}]
                }
                x="coin"
                y="marketcap"
                standalone={false}
                width={350} height={350}
               />
               <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={175} y={175}
                style={{fontSize: 16}}
                text="ETH vs BTC"
              />
            </svg>
          </div>
        </div>
        <div className="col s12 m6 l4 animated slideInUp">
          <div>
            <svg viewBox="0 0 400 400" >
              <VictoryPie
                theme={VictoryTheme.material}
                innerRadius={80}
                cornerRadius={10}
                colorScale={["green" , "blue"]}
                style={{
                  data: {stroke: "#fff", strokeWidth: 2},
                  labels: {fontSize: 12}
                }}
                data={
                  [{coin: tokenLabel, marketcap: tokenCap},
                  {coin: ethLabel, marketcap: ethCap}]
                }
                x="coin"
                y="marketcap"
                standalone={false}
                width={350} height={350}
               />
               <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={175} y={175}
                style={{fontSize: 14}}
                text="ETH tokens vs ETH"
              />
            </svg>
          </div>
        </div>
        <div className="col s12 m6 l4 animated slideInRight">
          <div>
            <VictoryChart
              animate={{ duration: 1000 }}
              theme={VictoryTheme.material}
              padding={40}
            >
              <VictoryAxis
                style={{
                  tickLabels: {fontSize: 7, padding: 6}
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
                  data: {width: 15, fill: "green"}, // or red if % < 0
                  labels: {fontSize: 6}
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
