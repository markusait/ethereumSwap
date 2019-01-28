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
        <p>Please note that this Project is in a Testing phase and <b>should not</b> be used in production as of know</p>
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
      </div>
      </Main>
      );
  }
}

export default Home;
