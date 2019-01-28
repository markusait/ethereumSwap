import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Main, Header, Card} from '../styles/index'
import metamask from '../assets/metamask.png'
class Home extends Component {

  render() {
    return (<Main type={"home"}>
      <Header>
        Welcome to EtherSwap, a decentralized exchange based on Oraclize
      </Header>
      <h5>
        Exchange Ether and Bitcoin with anyone in the most decentralized way for free!
        <br/>
        <br/>
        <Link to="/choose">
            Get Started now
        </Link>
        </h5>
      <div className="main-wrap">
      <Card className="main-card">
        <h3>How it works
        </h3>
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <p>1. Download Meta Mask</p>
            </div>
            <div class="collapsible-body">
              <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                <img src={metamask} alt="MetaMask" className="MetaMask"/>
              </a>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <p>2. Connect to the Ropsten Testnet or use my blockchain instance
              </p>
            </div>
            <div class="collapsible-body">
              <p>
                connect to &nbsp;
                <a href="http://ethblockchain.digitpay.de" target="_blank" rel="noopener noreferrer">
                  http://ethblockchain.digitpay.de
                </a>
                &nbsp; and use this private key: d60984ec931d45517e170c1a1e48a9ca041a6b9803e4d7cebc1704d8f478b5d0 for testing
              </p>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              3. Create a new Offer on the Escrow Contract
            </div>
            <div class="collapsible-body">
              Add a value (e.g 1 ETH), a Bitcoin Address (e.g 3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9) and a minimum redeem value: (e.g 615525).
              <br/>
              For security reasons only use Bitcoin Addresses with no prior transactions.
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              4. Send the appropriate Amount to the Bitcoin Address (Mainnet only)
            </div>
            <div class="collapsible-body">
              <p>The amount is designated in Satoshi only and transactions are only checked in the Bitcoin Mainnet as of now.
                <br/>
                You can find the transaction for this example
                <a target="_blank" rel="noopener noreferrer" href="https://blockchain.info/q/txresult/b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1/3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9">here</a>
              </p>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              5. Redeem the offer by entereing the transaction Hash for the Offer in the markt page
            </div>
            <div class="collapsible-body">
              <p>
                This Transaction will take around 30 seconds until you are payed out by the contract
              </p>
            </div>
          </li>
        </ul>
      </Card>
      </div>
      <p>Please note that this Project is in a Testing phase and
        &nbsp;<b>should not</b>&nbsp;
        be used in production as of now</p>
    </Main>);
  }
}

export default Home;
