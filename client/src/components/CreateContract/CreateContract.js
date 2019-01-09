import React, {Component} from "react";
import {Link, Router, Route, IndexRoute, BrowserRouter} from 'react-router-dom'
import EthereumBridge from "../../contractInterface/EthereumBridge.json";
import getWeb3 from "../../utils/getWeb3";
import {Icon, Tag} from 'react-materialize'
import TruffleContract from 'truffle-contract'
import './CreateContract.css';
import axios from 'axios';
class Market extends Component {
  //  constructor(props) {
  //   super(props);
  //   $(document).ready(function() {
  //     $('.chips').material_chip({
  //       data: [{
  //         tag: 'Apple',
  //       }, {
  //         tag: 'Microsoftaddress, amountaddress, amount',
  //       }, {
  //         tag: 'Google',
  //       }],
  //     });
  //   });
  // }
  state = {
    bitcoinAddress: '3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9',
    bitcoinAmount: 615525,
    ethAmount: 1000000000000000000,
    web3: null,
    accounts: null,
    // account = '0x0',
    deployedContract: null
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

      // TODO: save the network, network id and deployedNetwork

      // const deployedContract = await TruffleContract(EthereumBridge)
      // deployedContract.setProvider(web3.currentProvider)
      // deployedContract.setNetwork(web3.currentProvider)

      this.setState({web3, accounts, deployedContract: deployedContract})
      // , this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      // alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };

  handleChange = (event) => {
    const target = event.target;
    // TODO: Bitcoin Stellar switch here
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    this.depositToContract()
    event.preventDefault();
    // console.log(this.state.bitcoinAmount);
    // console.log(this.state.bitcoinAddress);
    // alert(JSON.stringify(this.state.bitcoinAmount));
    // const address = this.state.bitcoinAddress
    // const amount = this.state.bitcoinAmount
  }

  //handle Submit without updating state
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   console.log(event.target);
  //    alert('A name was submitted: ' + this.state.value);
  //   alert(JSON.stringify(data));
  //   event.preventDefault();
  // }

  //Could also use vars to make stateless (but input maintains state anyways)
  depositToContract = async () => {
    try {
      const {accounts, bitcoinAddress, bitcoinAmount, ethAmount, deployedContract} = this.state;
      // deployedCOntract = await contract.deploy(options)
      // await contract.methods.depositEther(bitcoinAddress, bitcoinAmount.toString()).send({ from: accounts[0] });
      // bitcoinAddress : "3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9"
      // bitcoinAmount: "615525"

      // deployedContract.methods.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525").send({from:accounts[0],value: 1000000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))

      const res = await deployedContract.methods.depositEther(bitcoinAddress, bitcoinAmount.toString()).send({
        // TODO: secify gas price and usage here
        from: accounts[0],
        value: 1000000000000000000
      })
          //   Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    //
    //   Update state with the result.
    // this.setState({ storageValue: response });
    console.log(res);
    this.writeDetailsToDB(res)

    } catch (e) {
      console.error(e)
    }

  }

  writeDetailsToDB = async () => {
    try {
      console.log("writing to db");
      //id
      //time
      //from address
      //bitcoinAddress
      //bitcoinAmount
      //Amount deposited Ether
      //oraclizeID
      //payedout: false
      //to which contract address
      // const res = axios.post('/api/offers', {
      //   username: this.state.field_user,
      //   password: sha256(this.state.field_pass),
      //   updateTime: Date()
      // })

    } catch (e) {
      console.error(e)
    }
  }

  // initializePayoutProcess = async () => {
  //   try {
  //     const { accounts, bitcoinAddress, bitcoinTransactionHash, contract, oraclizeApiPrice } = this.state;
  //      bitcoinTransactionHash: "b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1"
  //      bitcoinAddress : "3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9"
  //     oraclizeApiPrice = 500000000000000000
  //     render the Price
  //     const result = await app.getTransaction(bitcoinTransactionHash, bitcoinAddress, {from:accounts[0],value: oraclizeApiPrice})
  //
  //   }catch (e) {
  //     console.error(e);
  //   }
  // }

  //making sure example is not run each time
  runExample = async () => {
    // const { accounts, contract } = this.state;
    //
    //   Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    //get the form data here (address and amount )
    // await contract.methods.deposit(string sentBitcoinAddress, uint sentBitcoinAmount)
    //   Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    //
    //   Update state with the result.
    // this.setState({ storageValue: response });
  };
  render() {
    return (<section className="market">
      <div className="market-page">
        <div className="container">
          <div id="one" className="section">
            <div className="col">
              <div id="contactCreation" className="advantages offset-l1  col s12 m4 card-panel hoverable">
                <h5 className="center">
                  Create a new Smart Escrow Contract
                </h5>
                <p className="light">
                  Type in your Bitcoin Address and the amount of Ether or USD you want to set it free
                </p>
                <div className="row">
                  <form onSubmit={this.handleSubmit} id="contractForm" className="col s12">
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
                      {
                      // <div className="input-field col s6">
                      //   <input id="amountUSD" type="number" min="1" max="10000000000" className="validate"></input>
                      //   <label htmlFor="amountUSD">Amount in USD</label>
                      // </div>
                    }
                      <div className="input-field col s6">
                        <input id="ethAmount" name="ethAmount" value={this.state.ethAmount} onChange={this.handleChange} type="number" min="1" max="100000000000000000000" className="validate"></input>
                        <label htmlFor="ethAmount">How much Ether (in Wei) is the BTC worth for you</label>
                      </div>
                    </div>

                    <button type="submit" value="Submit" id="initContract" className="btn waves-effect waves-light orange">Submit {
                        //data-parse="uppercase"
                        // <i className="material-icons right">send</i> thre is also  other way in docs with <Icon>
                      }
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

export default Market;
