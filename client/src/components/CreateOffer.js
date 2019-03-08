import React, {Component} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import {
  getPrices,
  weiDenomination,
  satoshiDenomination,
  stroopsDenomination,
  getDataForDB,
  hasPriorTransactions
} from "../utils/utilFunctions";
import 'react-toastify/dist/ReactToastify.css';
import {
  ToastContainer,
  Main,
  Card,
  toast,
  Row,
  Preloader
} from '../styles/index.js'

class CreateOffer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stellar: false,
      offerCryptoAddress: '1MfJVqRgryFvnGSQjVt3xCAhdwmcwairYQ',
      offerCryptoAmount: '700000',
      offerEthAmount: 2000000000000000000,
      offerTxHash: null,
      priceForCryptoLabel: '',
      priceForEthLabel: ''
    }
  }
  componentDidMount = () => {
    this.updatePrices()
  };

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ?
      target.checked :
      target.value
    const name = target.name
    this.updatePrices()
    this.setState({
      [name]: value
    })
  }



  updatePrices = async (currency, vsCurrency) => {
    const weiPrice = await getPrices('ethereum', (this.state.stellar ? 'xlm' : 'btc'))
    const lumensPrice = await getPrices('stellar', 'eth')
    const btcPrice = await getPrices('bitcoin', 'eth')
    const cryptoPrice = Math.floor((this.state.stellar ? lumensPrice : btcPrice ) * this.state.offerCryptoAmount * weiDenomination)
    const ethPrice = Math.floor((weiPrice * this.state.offerEthAmount ) * (this.state.stellar ? stroopsDenomination : satoshiDenomination))
    this.setState({
      priceForCryptoLabel: cryptoPrice,
      priceForEthLabel: ethPrice
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
        this.props.startLoading()
        event.preventDefault();
        try {
          const { account, contract } = this.props;
          const {
            offerCryptoAddress,
            offerCryptoAmount,
            offerEthAmount,
            stellar
          } = this.state

          if (await hasPriorTransactions(offerCryptoAddress, this.state.stellar ? 'stellar' : 'bitcoin')) {
            throw Object.assign(new Error("make sure the account has no prior transactions"), {
              code: 402
            })
          }

          const {transactionHash} = await contract.methods
            .depositEther(offerCryptoAddress, offerCryptoAmount.toString(), ~~stellar)
            .send({
              from: account,
              value: offerEthAmount,
              gas: 1500000
            })

          this.props.createdAnOffer(transactionHash)

          this.writeDetailsToDB()

          this.notify()

    } catch (e) {
      this.props.contract == null ? this.notify("Contract not deployed on this blockchain please change your rpc provider to http://blockchain.etherswaps.co")
      : this.notify(e.message)
      console.error(e)
    }

  }

  writeDetailsToDB = async () => {
    try {
      const offerData = getDataForDB({...this.state, ...this.props})
      await axios.post('/api/offers', offerData)
    } catch (e) {
      console.error(e)
    }
  }

  render() {

    const MarketLink = () => {
      if (this.props.offerTxHash) {
        return (<React.Fragment>
          <Link to={"/market/" + this.props.offerTxHash}>Go to MarketPlace</Link>
          <p>
            {`this is your Transaction hash ${this.props.offerTxHash}`}
          </p>
        </React.Fragment>)
      } else {
        return (<React.Fragment></React.Fragment>)
      }
    }
    const OfferCryptoAddressLabel = () => {
      return <label className="toplabel" htmlFor="offerCryptoAddress"> {this.state.stellar ? "Stellar Address" : "Bitcoin Address"} (make sure it has no prior transactions)  </label>
    }
    const OfferCryptoAmountLabel = () => {
      return <label className="toplabel" htmlFor="offerCryptoAmount">
      {
        this.state.stellar ? `Exact Amount in Stroops, currently worth${this.state.priceForCryptoLabel} wei`
      : `Amount BTC in Satoshi, currently worth ${this.state.priceForCryptoLabel} Wei`
      }
       </label>
    }
    const EthAmountLabel = () => {
      return <label className="toplabel" htmlFor="ethAmount">
        Amount Ether in Wei the Offer is worth for you,
        currently worth {`${this.state.priceForEthLabel} ${this.state.stellar ? 'Stroops' : 'Satoshi' }   `}  </label>
    }
    const Loader = () => this.props.loading ? <Preloader size='big'/> : ''

    return (<Main type="create">
      <div className="container col createCard-container">
        <Card className="hoverable">
          <ToastContainer autoClose={8000}/>
          <h5 className="center">
            Create a new offer to get {this.state.stellar ? "Lumens" : "Bitcoins"} for your Ether
          </h5>
          <MarketLink/>
          <p className="center">
            Type in your  {this.state.stellar ? "Lumens" : "Bitcoins"} Address and the amount of Ether or USD you want to set it free
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
                <Loader/>
                <Row>
                  <div className="chips-addresses input-field col s12">
                    <input name="offerCryptoAddress" value={this.state.offerCryptoAddress} onChange={this.handleChange} id="offerCryptoAddress" type="text" className="validate"/>
                      <OfferCryptoAddressLabel/>
                  </div>
                </Row>
                <Row>
                  <div className="input-field col s6">
                    <input name="offerCryptoAmount" value={this.state.offerCryptoAmount} onChange={this.handleChange} type="text" className="validate"></input>
                      <OfferCryptoAmountLabel/>
                    </div>
                  <div className="input-field col s6">
                    <input id="ethAmount" name="offerEthAmount" value={this.state.offerEthAmount} onChange={this.handleChange} type="number" min="1" className="validate"></input>
                    <EthAmountLabel/>
                  </div>
                </Row>
                <button type="submit" value="Submit" id="initContract" className="btn waves-effect waves-light teal">Submit
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
