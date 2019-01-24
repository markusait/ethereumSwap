import React, {Component} from "react"
import {Preloader} from 'react-materialize'

class MarketOfferModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bitcoinTransactionHash: 'b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1'
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
    const Payout = () => {
      if(!this.props.loading){ return (
        <button onClick={() => {
            this.props.initializePayout(this.props.index, this.state.bitcoinTransactionHash, this.props.offer.bitcoinAddress)
          }} type="submit" value="initializePayout" id="initializePayout" className="btn waves-effect waves-light orange">initialize Payout
        </button>
      )} else {
      return (
        <div>
        <Preloader size='big'/>
        <p>Please wait while your transaction is beeing processed</p>
        <p>you can view the status of your transaction here {this.props.redeemTxHash}</p>
        </div>
      )
    }
    }

    return (<div className="modal advantages hoverable">
      <div className="modal-content">
        <p>
          BitcoinAddress: {this.props.offer.bitcoinAddress}</p>
        <p>
          Amount BTC: {this.props.offer.bitcoinAmount}</p>
        <p>
          Amount to Pay: {this.props.offer.amountEth}</p>
        <p>
          Ethereum Address of contract: {this.props.offer.contractAddress}</p>
        <p>
          PayedOut: {this.props.offer.payedOut}
        </p>
        <p>
          Recipient Address:
        </p>
        <p></p>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="bitcoinTransactionHash"
              name="bitcoinTransactionHash"
              value={this.state.bitcoinTransactionHash}
              onChange={this.handleChange}
              maxLength="64"
              type="text"
              className="validate">
            </input>
            <label htmlFor="amountSatoshi">
              Bitcoin Transaction Hash
            </label>
          </div>
        </div>
          <Payout />
        </div>
        <div className="modal-footer">
          <button onClick={this.props.onHide} type="submit" value="Close" id="initContract" className="btn waves-effect waves-light orange">Close
          </button>
        </div>
      </div>)
  }
}
export default MarketOfferModal
