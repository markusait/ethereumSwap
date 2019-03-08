import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {
  Main,
  Header,
  Card,
  Metamask,
  BitcoinImg,
  StellarImg,
  EtherImg,
} from '../styles/index'


class Home extends Component {
  render() {
    // if (!this.props.web3) return <Preloader > loading < /Preloader>
    return (
      <Main type="home">
        <div className="homewrap">
      <Header>
        Welcome to EtherSwaps, a lightweight decentralized exchange
      </Header>
      <h5 class="light">
           Exchange Ether, Bitcoin and Stellar with anyone in the most decentralized way for free!
        <br/>

        <Link to="/choose">
            Get Started now
        </Link>
      </h5>
          <img src={StellarImg} alt="Stellar" className="headerImg"/>
          <img src={EtherImg} alt="ether" className="headerImg"/>
          <img src={BitcoinImg} alt="Bitcoin" className="headerImg"/>

      <div className="main-wrap">
      <Card type="main">
        <h3>How it works
        </h3>
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <p>1. Download Meta Mask</p>
            </div>
            <div className="collapsible-body">
              <a href="https://Metamask.io/" target="_blank" rel="noopener noreferrer">
                <img src={Metamask} alt="MetaMask" className="MetaMask"/>
              </a>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <p>2. Connect to the Ropsten Testnet or use my blockchain instance
              </p>
            </div>
            <div className="collapsible-body">
              <p>
                connect to &nbsp;
                <a href="http://blockchain.etherswaps.co" target="_blank" rel="noopener noreferrer">
                  http://blockchain.etherswaps.co
                </a>
                &nbsp; and use this private key: f0afc4913d6d4b6e46adfaf3509dd516fa76760bc500dd6e023bb8ecc9832545 for testing
              </p>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              3. Create a new Offer on the Escrow Contract
            </div>
            <div className="collapsible-body">
              Add a value (e.g 1 ETH), a Bitcoin Address (e.g 3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9) and a minimum redeem value: (e.g 615525).
              <br/>
              For security reasons only use Bitcoin or Stellar Addresses with no prior transactions.
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              4. Send the appropriate Amount to the Bitcoin or Stellar Address (Mainnet only)
            </div>
            <div className="collapsible-body">
              <p>The amount is designated in Satoshi only and transactions are only checked in the Bitcoin Mainnet as of now.
                <br/>
                You can find the transaction for this example
                <a target="_blank" rel="noopener noreferrer" href="https://blockchain.info/q/txresult/b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1/3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9">here</a>
              </p>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              5. Redeem the offer by entereing the transaction Hash for the Offer in the markt page
            </div>
            <div className="collapsible-body">
              <p>
                This Transaction will take around 30 seconds until you are payed out by the contract
              </p>
            </div>
          </li>
        </ul>
      </Card>
      </div>
      </div>
    </Main>);
  }
}

// <p>Please note that this Project is in a Testing phase and
//   &nbsp;<b>should not</b>&nbsp;
//   be used in production as of now</p>
export default Home;
