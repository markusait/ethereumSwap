import React, {Component} from "react"
import './MarketOfferModal.css'
// import Modal from 'react-modal'

class MarketOfferModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bitcoinAddress: '3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9',
      bitcoinTransactionHash: 'b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1'
    }
  }
  componentWillMount = async () => {
    console.log('Modal called');
    if (!this.props.show) {
      console.log(this.props.id)
      return null
    }
  }
  handleChange = (event) => {
    const {value, name} = event.target
    console.log(value,name);
    this.setState({[name]: value})
  }

  render() {
    console.log('Modal is rendering');
    if (!this.props.show) {
      return null
    }

    return (<div className="modal">
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
          id: {this.props.offer._id}
        </p>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="bitcoinTransactionHash"
              name="bitcoinTransactionHash"
              value={this.state.bitcoinTransactionHash}
              onChange={this.handleChange}
              type="text"
              className="validate"></input>
            <label htmlFor="amountSatoshi">
              Bitcoin Transaction Hash
            </label>
          </div>
        </div>
          <button onClick={() => {
              this.props.initializePayout(this.props.index, this.state.bitcoinTransactionHash, this.props.offer.bitcoinAddress)
            }} type="submit" value="initializePayout" id="initializePayout" className="btn waves-effect waves-light orange">initialize Payout
          </button>
        </div>
        <div className="modal-footer">
          <button onClick={this.props.onHide} type="submit" value="Close" id="initContract" className="btn waves-effect waves-light orange">Close
          </button>
        </div>
        {
          //   <div>
          //     <p>lol</p>
          // </div>
          // <div><p>lol</p>
          //   <div className="backdrop" style={{
          //     backdropStyle
          //   }}>
          //   <div className="modal" style={{
          //       modalStyle
          //     }}>
          //     <p>Modal showing </p>
          //     <div className="footer">
          //       <button onClick={this.props.onClose}>
          //         Close
          //       </button>
          //     </div>
          //   </div>
          // </div>
        }
      </div>)
  }
}
export default MarketOfferModal
