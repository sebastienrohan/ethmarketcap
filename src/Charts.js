import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';
import './Charts.css';

class Charts extends Component {
  render() {

  let data = this.props.data;
  let btc = Number(data[0].marketcap);
  let eth = Number(data[1].marketcap);
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

    return (
      <div className="row">
        <div className="col s6 left-align">
          <div>
            <h4>ETH vs BTC</h4>
            <VictoryPie
              animate={{ duration: 2000 }}
              theme={VictoryTheme.material}
              colorScale={[
                "#D85F49",
                "#F66D3B",
                "#D92E1D",
                "#D73C4C",
                "#FFAF59",
                "#E28300",
                "#F6A57F"
              ]}
              data={
                [{coin: "Ether", marketcap: eth},
                {coin: "Bitcoin", marketcap: btc}]
              }
              x="coin"
              y="marketcap"
              style={{
                labels: {fontSize: 18}
              }}
             />
          </div>
        </div>
        <div className="col s6">
          <div>
            <h4>ETH tokens vs ETH</h4>
            <VictoryPie
              animate={{ duration: 2000 }}
              theme={VictoryTheme.material}
              innerRadius={80}
              cornerRadius={10}
              colorScale={["blue" , "green"]}
              data={
                [{coin: "Tokens", marketcap: tokenCap},
                {coin: "Ether", marketcap: eth}]
              }
              x="coin"
              y="marketcap"
              style={{
                data: {stroke: "#fff", strokeWidth: 2},
                labels: {fontSize: 12},
                parent: {border: "1px solid #ccc"}
              }}
             />
          </div>
        </div>
        <div className="col s12">
          <div>
            <h4>ETH Tokens</h4>
            <VictoryChart
              animate={{ duration: 2000 }}
              theme={VictoryTheme.material}
              domainPadding={80}>
              <VictoryAxis />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000000}M`)}
                style={{
                  tickLabels: {fontSize: 6, padding: 10}
                }}
              />
              <VictoryBar
                data={plotTokenData}
                // data accessor for x values
                x="x"
                // data accessor for y values
                y="y"
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
