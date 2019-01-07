import React, { Component } from "react";
import { Link, Router, Route, IndexRoute, BrowserRouter} from 'react-router-dom'
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../utils/getWeb3";
import './Market.css';


class Market extends Component {
    state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    // account = '0x0',
    contract: null
  };

  componentDidMount = async () => {
    try {
      console.log("Did Mounting");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // for ganach networkId should be  5777
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      console.log(networkId);
      // console.log(deployedNetwork.address);
      const instance = new web3.eth.Contract(SimpleStorageContract.abi, deployedNetwork && deployedNetwork.address,);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        contract: instance
      }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };


  activateLasers = async () => {
    console.log('button clicked');
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }

  //making sure example is not run each time
  runExample = async () => {
    // const { accounts, contract } = this.state;
    //
    //   Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    //get the form data here (address and amount )
    // use the inizialize payout process here

        //   Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    //
    //   Update state with the result.
    // this.setState({ storageValue: response });
  };
  render() {
    return (
      <section class="market">
        <div className="market-page">
        <h1 className="text-large"> Welcome to the Market </h1>
        <p>
        Find any smart contract that you would like to buy Ether from
        </p>
        </div>
    </section>
  )
  }
}

export default Market;
