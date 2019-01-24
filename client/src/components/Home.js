import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Main, Header} from '../styles/index'
import metamask from '../assets/metamask.png'
class Home extends Component {

  render() {
    return (<Main type={"home"}>
      <Header>
        Welcome to EtherBridge, a decentralized exchange
      </Header>
      <p>
        You can exchange Ether and Bitcoin with anyone in the most decentralized way for free!</p>
      <div>
        <p>You can either connect to the Ropsten Testnet or use the blockchain at
          <a href="http://ethblockchain.digitpay.de" target="_blank">http://ethblockchain.digitpay.de</a>
          for testing
        </p>
        <p>Please note that this Project is in a Testing phase and should not be used in production as of know</p>
        <p>Download Meta Mask</p>
        <a href="https://metamask.io/" target="_blank">
          <img src={metamask} alt="MetaMask"/>
        </a>
        <br></br>
        <Link to="/choose">
          Get Started
        </Link>
      </div>
      <div>


          <h1>FAQ</h1>
          <h5>Why?</h5>
          <h5>Whom do I need to trust?</h5>
          <p>There are three services you need to trust</p>
          <li>
            This Server</li>
          <li>The Smart Contract which holds the funds
          </li>
          <li>Oraclize services (find out more about them
            <a href="http://www.oraclize.it/"></a>)</li>
          <li>Blockchain.info API (please note that downtime is not a problem because proof of tx can be submitted each time )</li>

      </div>
      </Main>
      );
  }
}

export default Home;
