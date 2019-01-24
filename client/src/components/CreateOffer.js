import React, {Component} from "react";
import {Link} from 'react-router-dom'
import EthereumSwap from "../contractInterface/EthereumSwap.json";
import getWeb3Data from "../utils/getWeb3";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Main, Card, toast } from '../styles/index.js'
import {Row} from 'react-materialize'

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
    deployedNetwork: null,
    offerTxHash: null,
    createdOffer: false
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const {
        web3,
        accounts,
        networkId,
        deployedNetwork,
        deployedContract,
        deployedContractAddress
      } = await getWeb3Data()
      this.setState({
        web3,
        accounts,
        networkId,
        deployedContract,
        deployedNetwork,
        deployedContractAddress
      })
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const {value, name} = event.target
    this.setState({[name]: value})
  }

  notify = (error) => {
    if (!error) {
      toast("Transaction successfull")
    } else {
      toast.error("Transaction unsucsessfull please try again " + error)
    }
  }

  // TODO: secify gas price and usage here
  //Could also use vars to make stateless (but input maintains state anyways)
  depositToContract = async (event) => {
    event.preventDefault();
    try {
      const {accounts, bitcoinAddress, bitcoinAmount, ethAmount, deployedContract} = this.state;

      const response = await deployedContract.methods.depositEther(bitcoinAddress, bitcoinAmount.toString()).send({from: accounts[0], value: ethAmount, gas: 1500000})

      this.setState({offerTxHash: response.transactionHash, createdOffer: true});

      console.log(response);

      this.writeDetailsToDB()

      this.notify()

    } catch (e) {
      this.notify(e)
      console.error(e)
    }

  }

  writeDetailsToDB = async (event) => {
    try {
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
      const response = await axios.post('/api/offers', offer)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    const MarketLink = () => {
      if (this.state.createdOffer) {
        let txHash = this.state.offerTxHash
        return (<React.Fragment>
          <Link to={"/market/" + txHash}>Go to MarketPlace</Link>
          <p>
            {'this is your Transaction hash' + txHash}
          </p>
        </React.Fragment>)
      } else {
        return (<React.Fragment></React.Fragment>)
      }
    }
    // <div className="advantages s12 m4 card-panel hoverable">
    return (
      <Main type={"create"}>
      <div className="container col">
      <Card className="hoverable">
       <ToastContainer autoClose={8000}/>
          <h5 className="center">
            Create a new Offer to get Bitcoins for your Ether
          </h5>
          <MarketLink/>
          <p>
            Type in your Bitcoin Address and the amount of Ether or USD you want to set it free
          </p>
          <Row>
            <form onSubmit={this.depositToContract} id="contractForm" className="col s12">
              <Row>
                <div className="chips-addresses input-field col s12">
                  <input name="bitcoinAddress" value={this.state.bitcoinAddress} onChange={this.handleChange} id="bitcoinAddress" type="text" className="validate"/>
                  <label htmlFor="bitcoinAddress">
                    Bitcoin Address</label>
                </div>
              </Row>
              <Row>
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
              </Row>
              <button type="submit" value="Submit" id="initContract" className="btn waves-effect waves-light orange">Submit
              </button>
            </form>
          </Row>
        </Card>
      </div>
    </Main>
  )
  }
}

export default CreateOffer;
