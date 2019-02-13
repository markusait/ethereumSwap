import React, {Component} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import getDataForDB from "../utils/getDataForDB"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, Main, Card, toast, Row} from '../styles/index.js'

class CreateOffer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stellar: false,
      offerCryptoAddress: '3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9',
      offerCryptoAmount: '615525',
      offerEthAmount: 1000000000000000000,
      offerTxHash: null,
      createdOffer: false
    }
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ?
      target.checked :
      target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  notify = (error) => {
    if (!error) {
      toast("Transaction successfull")
    } else {
      toast.error(error)
    }
  }

  depositToContract = async (event) => {
        event.preventDefault();
        try {

          const { account, contract } = this.props;
          const {
            offerCryptoAddress,
            offerCryptoAmount,
            offerEthAmount,
            stellar
          } = this.state

          const response = await contract.methods
            .depositEther(offerCryptoAddress, offerCryptoAmount.toString(), ~~stellar)
            .send({
              from: account,
              value: offerEthAmount,
              gas: 1500000
            })

          this.setState({
            offerTxHash: response.transactionHash,
            createdOffer: true
          });

      this.writeDetailsToDB()

      this.notify()

    } catch (e) {
      this.props.contract == null ? this.notify("Contract not deployed on this blockchain please change your rpc provider to http://ethblockchain.digitpay.de")
      : this.notify(e)
      console.error(e)
    }

  }



  writeDetailsToDB = async () => {
    try {
      const offerData = getDataForDB({...this.state, ...this.props})
      console.log(offerData)
      await axios.post('/api/offers', offerData)
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
    const offerCryptoAddressLabel = () => {
      return <label className="toplabel" htmlFor="offerCryptoAddress"> {this.state.stellar ? "Stellar Address" : "Bitcoin Address"}  </label>
    }
    const offerCryptoAmountLabel = () => {
      return <label className="toplabel" htmlFor="offerCryptoAmount"> {this.state.stellar ? "Exact Amount in Stroops" : "Amount BTC in Satoshi"}  </label>
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
                    <input name="offerCryptoAddress" value={this.state.offerCryptoAddress} onChange={this.handleChange} id="offerCryptoAddress" type="text" className="validate"/>
                      <offerCryptoAddressLabel/>
                  </div>
                </Row>
                <Row>
                  <div className="input-field col s6">
                    <input name="offerCryptoAmount" value={this.state.offerCryptoAmount} onChange={this.handleChange} type="text" className="validate"></input>
                      <offerCryptoAmountLabel/>
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
