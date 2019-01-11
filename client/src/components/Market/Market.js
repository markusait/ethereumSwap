import React, {Component} from "react";
import {Link, Router, Route, IndexRoute, BrowserRouter} from 'react-router-dom'
import MarketOffers from '../MarketOffers/MarketOffers'
import EthereumBridge from "../../contractInterface/EthereumBridge.json";
import getWeb3 from "../../utils/getWeb3";
import './Market.css';
import axios from 'axios';
import img from '../../assets/index.jpeg'


class Market extends Component {
  state = {
    //testing
    // const randomString = Math.random().toString(36).substring(34)
    offersData: null,
    bitcoinAddress: '3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9',
    bitcoinTransactionHash: 'b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1',
    bitcoinAmount: 615525,
    ethAmount: 1000000000000000000,
    web3: null,
    networkId: null,
    accounts: null,
    // account = '0x0',
    deployedContract: null,
    deployedContractAddress: null,
    redeemTxHash: null,
    oraclizeApiPrice: 500000000000000000
  };

  componentWillMount = async () => {
    try {
      //fetch db for Offers
      const offersData = await this.getOffersFromDB()

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // for ganach networkId should be  5777
      const deployedNetwork = EthereumBridge.networks[networkId];
      // console.log(deployedNetwork.address);
      const deployedContract = new web3.eth.Contract(EthereumBridge.abi, deployedNetwork && deployedNetwork.address);
      // const deployedContract = await instance.deployed()
      console.log(web3);
      console.log(networkId);
      console.log(deployedNetwork);
      console.log(deployedContract);
      console.log(deployedNetwork.address);
      console.log(deployedContract._address);

      this.setState({
        offersData,
        web3,
        accounts,
        deployedContract,
        networkId,
        deployedContractAddress: deployedContract._address
      })
      console.log(this.state);
    } catch (error) {
      // alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };
  // TODO: secify gas price and usage here
  // this.writeDetailsToDB() with payed = true  and payer address
  //should either get ID from function to process payment or
  //what it has in state: oraclizeApiPrice, accouts[0], deployedContract (should later choose from Mainnet, my testnet and Ropsten )
  //bitcoinTransactionHash and bitcoinAddress from state
  //maybe just save the ID from the form(it should not render the mongodb but would be good for genereal stuff)
  initializePayoutProcess = async (event) => {
    event.preventDefault();
    try {
      const {accounts, bitcoinAddress, bitcoinTransactionHash, deployedContract, oraclizeApiPrice} = this.state;
      const response = await deployedContract.methods.getTransaction(bitcoinTransactionHash, bitcoinAddress).send({

        from: accounts[0],
        value: oraclizeApiPrice
      })
      console.log(response);
      this.setState({redeemTxHash: response.transactionHash});

    } catch (e) {
      console.error(e);
    }
  }

  handleChange = (event) => {
    console.log("yaay");
    const target = event.target;
    // TODO: Bitcoin Stellar switch here
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    const name = target.name;
    this.setState({[name]: value});
    console.log(this.state.bitcoinTransactionHash);
  }

  getOffersFromDB = async () => {
    try {
      const response = await axios.get('/api/offers')
      //make this false once you fix it
      let offerData = response.data.filter(data => data.payedOut == true)
      console.log(offerData);
      return offerData
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="market-page">
        <div className="inner-container">
            <section className="offers">
              <div className="row">
              <MarketOffers
                offers={this.state.offersData}
                img={img}
                handleChange={this.handleChange}
                bitcoinTransactionHash={this.state.bitcoinTransactionHash}
                bitcoinAddress={this.state.bitcoinAmount}/>

              </div>
          </section>
          </div>
        </div>)
  }
}

export default Market;
