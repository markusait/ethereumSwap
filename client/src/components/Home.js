import React, {Component} from "react";

import {
  NetworkImg,
  BlocksImg,
  ScalableImg,
  Card,
  Metamask,
  BankImg,
  FastImg,
  Footer
}from '../styles/index'
class Home extends Component {
  componentDidMount() {
    this.setTriangle();
  }

  setTriangle() {
      document.getElementsByClassName('path')[0].setAttribute("d", "M0 50 L" + window.innerWidth + " 0 L" + window.innerWidth + " 55z");
  }

  render() {
    return (
      <div className="DEPRHome">
          <div className="index-banner">

            <div className="title-container">
                <h1 className="header-title"> Etherswaps</h1>
                <p className="header-subtitle">
                  Welcome to Etherswaps, a lightweight decentralized Exchange.<br/>
                  No Middleman are required to swap your Ether for Bitcoin and Stellar. <br/>
                  You can enjoy full MetaMask Wallet support with low fees and fast exchange times. <br/>
                </p>
                <a className="get-started-button" href="http://etherswaps.co/#/choose"> get started now</a>
            </div>
            <div className="image-container">
                <img className="blockImage" src={BlocksImg} alt="blocks" />
            </div>

            <svg className="triangle" aria-hidden="true">
                <path className="path"></path>
            </svg>
        </div>
        <div className="Info-Section">
          <div className="wrapper">
            <h2> Features </h2>
              <div className="Row">
                  <div class="advantage-container">
                    <div class="adv">
                    {/* TODO add ether bitcoin stellar image here  */}
                        <img alt="shield" src={NetworkImg}/>
                        <h5 class="center point1">Ethereum Blockchain</h5>
                        <p class="point1sub"> Swap your currencies directly on a decentralized blockchain </p>
                    </div>
                    <div class="adv">
                        <img alt="hand" src={ScalableImg}/>
                        <h5 class="center point2">Multiple Blockchains Support </h5>
                        <p class="point2sub"> Currently you can perrform Atomic Swaps with Ether, Bitcoin and Stellar </p>
                    </div>
                    <div class="adv">
                        <img alt="spaceship" src={BankImg} className="green-filter"/>
                        <h5 class="center point3">No Middleman required</h5>
                        <p class="point3sub"> By using <a href="http://www.oraclize.it/)" target="blank">  Oraclize </a>
                        the underlying smart contract can perform validations itself so you dont have to trust any third parties  </p>
                    </div>
                    <div class="adv">
                        <img alt="person" src={FastImg}/>
                        <h5 class="center point4">Low fees and fast confirmations</h5>
                        <p class="point4sub subpoints"> Transact directly on the fast Ethereum Blockchain
                         Exchange fees payed to the smart contract are around 0.004 Ether (0.5 USD)
                         while confirmations are quick</p>
                    </div>
                </div>
              </div>
          </div>
        </div>
      <div className = "main-wrap" >
        <h3>How it works
        </h3>
         <Card type="main" className="word-box">
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <p>1. Download MetaMask</p>
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
              <p>connect to &nbsp;
                <a href="http://blockchain.etherswaps.co" target="_blank" rel="noopener noreferrer">
                  http://blockchain.etherswaps.co
                </a>
                &nbsp; and use this private key: f0afc4913d6d4b6e46adfaf3509dd516fa76760bc500dd6e023bb8ecc9832545 for testing
              </p>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <p> 3. Create a new Offer on the Escrow Contract </p>
            </div>
            <div className="collapsible-body">
              Add a value (e.g 1 ETH), a Bitcoin Address (e.g 3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9) and a minimum redeem value: (e.g 615525).
              <br/>
              For security reasons only use Bitcoin or Stellar Addresses with no prior transactions.
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <p>4. Send the appropriate Amount to the Bitcoin or Stellar Address (Mainnet only) </p>
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
              <p> 5. Redeem the offer by entereing the transaction Hash for the Offer in the markt page </p>
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
      <Footer copyrights = "® 2019, Etherswaps"
        links={
          <ul>
            <li><a className="grey-text text-lighten-3" href="https://github.com/markusait/ethereumSwap">Fork me on Github </a></li>
            <li><a className="grey-text text-lighten-3" href="mailto:markus.saitmacher@web.de">Contact</a></li>
          </ul>
        }
        className='example'
        >
    <h5 className="white-text">Etherswaps</h5>
    {/* <p className="grey-text text-lighten-4">No warrantiy </p> */}
    </Footer>

     </div>
    );
  }
}

export default Home;
