import React, {Component} from "react"
import { Preloader, Button } from '../styles/index'
import getCurrency from "../utils/getCurrencyByCode"

class MarketOfferModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptoTransactionHash: 'b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1'
    }
  }

  handleChange = (event) => {
    const {value, name} = event.target
    this.setState({[name]: value})
  }

  render() {
    if (!this.props.show) {
      return null
    }
    const Status = () => {
      if (this.props.offer.payedOut) {
        return (<div>
          <p>This Contract is payed out already
          </p>
        </div>)
      }
      if (!this.props.loading) {
        return (<button onClick={() => {
            this.props.initializePayoutProcess(this.props.index, this.state.cryptoTransactionHash, this.props.offer.cryptoAddress)
          }} type="submit" value="initializePayout" id="initializePayout" className="btn waves-effect waves-light orange">initialize Payout
        </button>)
      } else {
        return (<div>
          <Preloader size='big'/>
          <p>Please wait while your transaction is beeing processed</p>
          <p>you can view the status of your transaction here {this.props.redeemTxHash}</p>
        </div>)
      }
    }
    return (<div className="modal advantages hoverable">
      <div className="modal-content">
        <p>
          Currency: {this.props.offer.currency}
        </p>
        <p>
          CryptoAddress: {this.props.offer.cryptoAddress}</p>
        <p>
          Amount : {this.props.offer.cryptoAmount}</p>
        <p>
          Amount to Pay: {this.props.offer.amountEth}</p>
        <p>
          Ethereum Address of contract: {this.props.offer.contractAddress}</p>
        <p>
          PayedOut: {this.props.offer.payedOut}
        </p>
        <p>
          Transaction Hash of offer: {this.props.offer.offerTxHash}
        </p>
        <p>
          PayedOutTransactionHash:  {this.props.offer.payedOutTransactionHash}
        </p>
        <p>
          RecipientAddress:  {this.props.offer.recipientAddress}
        </p>
        <p>

        </p>
        <div className="row">
          <div className="input-field col s12">
            <input id="cryptoTransactionHash" name="cryptoTransactionHash" value={this.state.cryptoTransactionHash} onChange={this.handleChange} maxLength="64" type="text" className="validate"></input>
            <label htmlFor="amountSatoshi">
              Bitcoin Transaction Hash or Stellar Payment Operation ID
            </label>
          </div>
        </div>
        <Status/>
      </div>
      <div className="modal-footer">
        <Button onClick={this.props.onHide} type="submit" value="Close" id="initContract" className="btn waves-effect waves-light orange">Close
        </Button>
      </div>
    </div>)
  }
}
export default MarketOfferModal
