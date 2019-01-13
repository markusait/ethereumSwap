import React, {Component} from "react";
import {Link, }    from 'react-router-dom'
import EthereumSwap from "../../contractInterface/EthereumSwap.json";
import getWeb3 from "../../utils/getWeb3";
import './CreateOffer.css';
import axios from 'axios';
// import { addOffer } from '../../dbActions/offerAction';

class CreateOffer extends Component {

  state = {
    bitcoinAddress: '3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9',
    bitcoinAmount: 615525,
    ethAmount: 1000000000000000000,
    web3: null,
    networkId: null,
    accounts: null,
    // account = '0x0',
    deployedContract: null,
    deployedContractAddress: null,
    offerTxHash: null,
    createdOffer: false
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // for ganach networkId should be  5777
      const deployedNetwork = EthereumSwap.networks[networkId];
      // console.log(deployedNetwork.address);
      const deployedContract = new web3.eth.Contract(EthereumSwap.abi, deployedNetwork && deployedNetwork.address);
      // const deployedContract = await instance.deployed()

      this.setState({web3, accounts, deployedContract, networkId, deployedContractAddress: deployedContract._address})
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const {value, name} = event.target
    this.setState({[name]: value})
  }

  // TODO: secify gas price and usage here
  //Could also use vars to make stateless (but input maintains state anyways)
  depositToContract = async (event) => {
    event.preventDefault();
    try {
      const {accounts, bitcoinAddress, bitcoinAmount, ethAmount, deployedContract} = this.state;

      const response = await deployedContract.methods.depositEther(bitcoinAddress, bitcoinAmount.toString()).send({from: accounts[0], value: ethAmount, gas: 1500000})

      this.setState({offerTxHash: response.transactionHash, createdOffer: true});

      this.writeDetailsToDB()

    } catch (e) {
      console.error(e)
    }

  }

  writeDetailsToDB = async (event) => {
    event.preventDefault();
    try {
      console.log("writing to db");
      // TODO: could add on payout oraclizeID
      const data = this.state;
      const offer = {
        contractAddress: data.deployedContractAddress,
        contractNetworkId: data.networkId,
        ownerAddress: data.accounts[0],
        amountEth: data.ethAmount,
        bitcoinAddress: data.bitcoinAddress,
        bitcoinAmount: data.bitcoinAmount,
        offerTxHash: data.offerTxHash
      }
      const response = await axios.post('/api/items', offer)
      console.log(response);

    } catch (e) {
      console.error(e)
    }
  }

  render() {

      // TODO: return a banner here with redirect to market option
      // should also redirect with information so that the created offer is highlighted
      // return ()
      const MarketLink = () => {
        if (this.state.createdOffer) {
        return (<React.Fragment>
          <Link to="/market">Go to MarketPlace</Link>
        </React.Fragment>)
      } else {
        return (<React.Fragment>  </React.Fragment>)
      }
    }
    return (<section className="market">
      <div className="market-page">
        <div className="container">
          <div id="one" className="section">
            <div className="col">
              <div id="contactCreation" className="advantages offset-l1  col s12 m4 card-panel hoverable">
                <h5 className="center">
                  Create a new Offer to get Bitcoins for your Ether
                </h5>
                <MarketLink />
                <p className="light">
                  Type in your Bitcoin Address and the amount of Ether or USD you want to set it free
                </p>
                <div className="row">
                  <form onSubmit={this.writeDetailsToDB} id="contractForm" className="col s12">
                    <div className="row">
                      <div className="chips-addresses input-field col s12">
                        <input name="bitcoinAddress" value={this.state.bitcoinAddress} onChange={this.handleChange} id="bitcoinAddress" type="text" className="validate"/>
                        <label htmlFor="bitcoinAddress">
                          Bitcoin Address</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s6">
                        <input id="amountSatoshi" name="bitcoinAmount" value={this.state.bitcoinAmount} onChange={this.handleChange} type="number" min="1" max="10000000000" className="validate"></input>
                        <label htmlFor="amountSatoshi">
                          Amount BTC in Satoshi
                        </label>
                      </div>
                      <div className="input-field col s6">
                        <input id="ethAmount" name="ethAmount" value={this.state.ethAmount} onChange={this.handleChange} type="number" min="1" max="100000000000000000000" className="validate"></input>
                        <label htmlFor="ethAmount">How much Ether (in Wei) is the BTC worth for you</label>
                      </div>
                    </div>
                    <button type="submit" value="Submit" id="initContract" className="btn waves-effect waves-light orange">Submit
                    </button>
                  </form>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
  }
}

export default CreateOffer;
