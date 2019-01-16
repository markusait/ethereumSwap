import React, {Component} from "react";
import EthereumBridge from "./contractInterface/EthereumBridge.json";
import getWeb3 from "./utils/getWeb3";
import {Link} from 'react-router-dom'

import "./App.css";

class App extends Component {

  render() {
    return (<section className="page">
      <div className="App">
        <h1 className="text-large">
          Welcome to the Bitcoin Ethereum Bridge
        </h1>
        <p>
          You can exchange Ether and Bitcoin with anyone in the most decentralized way for free!</p>
        <div >
          <Link to="/choose">
            Get Started
          </Link>
        </div>
      </div>
    </section>);
  }
}

export default App;
