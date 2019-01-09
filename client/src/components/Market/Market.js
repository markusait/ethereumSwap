import React, {Component} from "react";
import {Link, Router, Route, IndexRoute, BrowserRouter} from 'react-router-dom'
import EthereumBridge from "../../contractInterface/EthereumBridge.json";
import getWeb3 from "../../utils/getWeb3";
import './Market.css';
import axios from 'axios';
// TODO:
//should render only if valid offer (can also show past offers)
//should  not make delete but write to db when payment occurs
//

class Market extends Component {
  state = {
    //testing
    // const randomString = Math.random().toString(36).substring(34)
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

  componentDidMount = async () => {
    try {

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

      // const deployedContract = await TruffleContract(EthereumBridge)
      // deployedContract.setProvider(web3.currentProvider)
      // deployedContract.setNetwork(web3.currentProvider)
      this.setState({web3, accounts, deployedContract, networkId, deployedContractAddress: deployedContract._address})
      // , this.runExample);
    } catch (error) {
      // alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };

  initializePayoutProcess = async (event) => {
    event.preventDefault();
    try {
      const {accounts, bitcoinAddress, bitcoinTransactionHash, deployedContract, oraclizeApiPrice} = this.state;
      const response = await deployedContract.methods.getTransaction(bitcoinTransactionHash, bitcoinAddress).send({
        // TODO: secify gas price and usage here
        from: accounts[0],
        value: oraclizeApiPrice
      })
      console.log(response);
      this.setState({redeemTxHash: response.transactionHash});
      // this.writeDetailsToDB()

    } catch (e) {
      console.error(e);
    }
  }

  handleChange = (event) => {
    const target = event.target;
    // TODO: Bitcoin Stellar switch here
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    const name = target.name;
    this.setState({[name]: value});
    console.log(this.state);
  }

  render() {
    return (<div className="market-page">
      <div className="purple-square-container">
        <div className="inner-container">
          <table>
            <thead></thead>

            <tbody>
              <tr >
                <td >
                  <div className="advantages">
                    <form onSubmit={this.initializePayoutProcess} id="contractForm" className="col s12">
                      <p>Contract xyz</p>
                      <p>
                        Current Price for API payment: {this.state.oraclizeApiPrice}</p>
                      <input name="bitcoinTransactionHash" value={this.state.bitcoinTransactionHash} onChange={this.handleChange} id="bitcoinTransactionHash" type="text" className="validate"/>
                      <label htmlFor="bitcoinAddress">Bitcoin Address</label>
                      <input name="bitcoinAddress" value={this.state.bitcoinAddress} onChange={this.handleChange} id="bitcoinAddress" type="text" className="validate"/>
                      <label htmlFor="bitcoinAddress">Bitcoin Address</label>
                      <br></br>
                      <button type="submit" value="Submit" id="initContract" className="btn waves-effect waves-light orange">Submit</button>
                    </form>
                  </div>
                </td>
                <td>Eclair</td>
                <td>$0.87</td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>Jellybean</td>
                <td>$3.76</td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>Lollipop</td>
                <td>$7.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {
        // <section className="market">
        // <div className="market-page">
        // <h1 className="text-large"> Welcome to the Market </h1>
        // <p>
        // Find any smart contract that you would like to buy Ether from
        // </p>
        // <table>
        //   <thead>
        //     <tr>
        //         <th>Name</th>
        //         <th>Item Name</th>
        //         <th>Item Price</th>
        //     </tr>
        //   </thead>
        //
        //   <tbody>
        //     <tr>
        //       <td>Alvin</td>
        //       <td>Eclair</td>
        //       <td>$0.87</td>
        //     </tr>
        //     <tr>
        //       <td>Alan</td>
        //       <td>Jellybean</td>
        //       <td>$3.76</td>
        //     </tr>
        //     <tr>
        //       <td>Jonathan</td>
        //       <td>Lollipop</td>
        //       <td>$7.00</td>
        //     </tr>
        //   </tbody>
        // </table>

        //     </div>
        // </section>
      }
    </div>)
  }
}

export default Market;
