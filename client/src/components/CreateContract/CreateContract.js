import React, {Component} from "react";
import {Link, Router, Route, IndexRoute, BrowserRouter} from 'react-router-dom'
import EthereumBridge from "../../contractInterface/EthereumBridge.json";
import getWeb3 from "../../utils/getWeb3";
import {Icon, Tag} from 'react-materialize'
import TruffleContract from 'truffle-contract'
import './CreateContract.css';

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
    bitcoinAddress: '',
    bitcoinAmount: 0,
    storageValue: 0,
    web3: null,
    accounts: null,
    // account = '0x0',
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      const instance = TruffleContract(EthereumBridge)

      instance.setProvider(web3.currentProvider)

      // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // for ganach networkId should be  5777
      // const deployedNetwork = EthereumBridge.networks[networkId];
      // console.log(deployedNetwork.address);
      // const instance = new web3.eth.Contract(EthereumBridge.abi, deployedNetwork && deployedNetwork.address);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        contract: instance
      })
      // , this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };


  handleChange = (event) => {
    const target = event.target;
    //Bitcoin Stellar switch here
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    // console.log(this.state.bitcoinAmount);
    // console.log(this.state.bitcoinAddress);
    // alert(JSON.stringify(this.state.bitcoinAmount));
    const address = this.state.bitcoinAddress
    const amount = this.state.bitcoinAmount
    this.depositToContract()

    event.preventDefault();
  }

  //handle Submit without updating state
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   console.log(event.target);
  //   // alert('A name was submitted: ' + this.state.value);
  //   alert(JSON.stringify(data));
  //   event.preventDefault();
  // }

  //Could also use vars to make stateless (but input maintains state anyways)
  depositToContract = async () => {
    try {
      const { accounts, bitcoinAddress, bitcoinAmount, contract } = this.state;
      console.log(contract);
      const deployedContract = await contract.deployed()
      console.log(deployedContract.address);
      // deployedCOntract = await contract.deploy(options)
      // await contract.methods.depositEther(bitcoinAddress, bitcoinAmount.toString()).send({ from: accounts[0] });

    } catch (e) {
      console.error(e);
    }

  }

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
                        <input
                          name="bitcoinAddress"
                          value={this.state.bitcoinAddress}
                          onChange={this.handleChange}
                          id="bitcoinAddress"
                          type="text"
                          className="validate"/>
                        <label htmlFor="bitcoinAddress">
                          Bitcoin Address</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s6">
                        <input name="bitcoinAmount" value={this.state.bitcoinAmount} onChange={this.handleChange}id="amountSatoshi" type="number" min="1" max="10000000000" className="validate"></input>
                        <label htmlFor="amountSatoshi">
                          Amount BTC in Satoshi
                        </label>
                      </div>
                      <div className="input-field col s6">
                        <input id="amountUSD" type="number" min="1" max="10000000000" className="validate"></input>
                        <label htmlFor="amountUSD">Amount in USD</label>
                      </div>
                    </div>

                    <button type="submit" value="Submit" id="initContract" className="btn waves-effect waves-light orange">Submit
                      {
                        //data-parse="uppercase"
                        // <i className="material-icons right">send</i> thre is also  other way in docs with <Icon>
                      }
                    </button>
                  </form>
                <div>
                </div>
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
