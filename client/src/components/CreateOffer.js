import React, {Component} from "react";
import {Link} from 'react-router-dom'
import getWeb3Data from "../utils/getWeb3";
import axios from 'axios';
import getCurrency from "../utils/getCurrencyByCode"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, Main, Card, toast, Row} from '../styles/index.js'

class CreateOffer extends Component {
  state = {
    stellar: false,
    cryptoAddress: '3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9',
    cryptoAmount: '615525',
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
    const target = event.target
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value
    const name = target.name
    this.setState({[name]: value})
  }

  notify = (error) => {
    if (!error) {
      toast("Transaction successfull")
    } else {
      toast.error("Transaction unsucsessfull please try again " + error)
    }
  }

  depositToContract = async (event) => {
    event.preventDefault();
    try {
      const {accounts, cryptoAddress, cryptoAmount, ethAmount, deployedContract, stellar} = this.state;

      const response = await deployedContract.methods.depositEther(cryptoAddress, cryptoAmount.toString(), ~~stellar).send({from: accounts[0], value: ethAmount, gas: 1500000})

      this.setState({offerTxHash: response.transactionHash, createdOffer: true});

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
      console.log(getCurrency(~~data.stellar))
      const offer = {
        contractAddress: data.deployedContractAddress,
        contractNetworkId: data.networkId,
        ownerAddress: data.accounts[0],
        amountEth: data.ethAmount,
        cryptoAddress: data.cryptoAddress,
        cryptoAmount: data.cryptoAmount,
        offerTxHash: data.offerTxHash,
        currency: getCurrency(~~data.stellar)
      }
      const response = await axios.post('/api/offers', offer)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const MarketLink = () => {
      if (this.state.createdOffer) {
        return (<React.Fragment>
          <Link to={"/market/" + this.state.offerTxHash}>Go to MarketPlace</Link>
          <p>
            {'this is your Transaction hash' + this.state.offerTxHash}
          </p>
        </React.Fragment>)
      } else {
        return (<React.Fragment></React.Fragment>)
      }
    }
    const CryptoAddressLabel = () => {
      return <label className="toplabel" htmlFor="cryptoAddress"> {this.state.stellar ? "Stellar Address" : "Bitcoin Address"}  </label>
    }
    const CryptoAmountLabel = () => {
      return <label className="toplabel" htmlFor="cryptoAmount"> {this.state.stellar ? "Exact Amount in Stroops" : "Amount BTC in Satoshi"}  </label>
    }
    const EthAmountLabel = () => {
      return <label className="toplabel" htmlFor="ethAmount"> Amount Ether (in Wei) the Offer is worth for you </label>
    }

    return (<Main type="create">
      <div className="container col createCard-container">
        <Card className="hoverable">
          <ToastContainer autoClose={8000}/>
          <h5 className="center">
            Create a new Offer to get Bitcoins for your Ether
          </h5>
          <MarketLink/>
          <p className="center">
            Type in your Bitcoin Address and the amount of Ether or USD you want to set it free
          </p>
          <Row>
            <form onSubmit={this.depositToContract} id="contractForm" className="col s12">
              <Row>
                <div className="center switch">
                  <label>
                    Bitcoin
                    <input name="stellar" type="checkbox" value={this.state.stellar} onChange={this.handleChange}/>
                      <span class="lever"></span>
                      Stellar
                    </label>
                  </div>

                </Row>
                <Row>
                  <div className="chips-addresses input-field col s12">
                    <input name="cryptoAddress" value={this.state.cryptoAddress} onChange={this.handleChange} id="cryptoAddress" type="text" className="validate"/>
                      <CryptoAddressLabel/>
                  </div>
                </Row>
                <Row>
                  <div className="input-field col s6">
                    <input name="cryptoAmount" value={this.state.cryptoAmount} onChange={this.handleChange} type="text" className="validate"></input>
                      <CryptoAmountLabel/>
                    </div>
                  <div className="input-field col s6">
                    <input id="ethAmount" name="ethAmount" value={this.state.ethAmount} onChange={this.handleChange} type="number" min="1" max="100000000000000000000" className="validate"></input>
                    <EthAmountLabel/>
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
