import React, {Component} from "react"
import {Card, CardAction } from '../styles/index'
import Blockies from 'react-blockies';
import metamask from '../assets/metamask.png'


class MarketOffersGrid extends Component {
  constructor(props) {
    super(props)

  }
  render() {
        // //fix pulse hoverabl bug
        // <Card className={this.props.routeTx === offer.offerTxHash
        //     ? 'hoverable pulse'
        //     : 'hoverable center'}>
        return (<React.Fragment>
          {
            this.props.offers.map((offer, index) => (<React.Fragment>
          <Card offer="true" type={
              () => {
                if(offer.payedOut) return "payedOut"
                if(this.props.routeTx === offer.offerTxHash) return "route"
                return "normal"
            }} className="hoverable" >
                <div class="card-image">
                  <Blockies
                        seed={offer.bitcoinAddress}
                        size={100}
                        scale={3}
                        bgColor="#FF7F00"
                        spotColor="#000"
                  />
                   </div>
                  <p>
                    Amount BTC to claim: {offer.bitcoinAmount}</p>
                  <p>
                    Amount to Pay: {offer.amountEth}</p>
                <CardAction>
                  <button id={offer._id} onClick={e => this.props.openModal(e, index)}>View Details</button>
                </CardAction>
            </Card>
            </React.Fragment>))
          }
        </React.Fragment>)
      }
  }

export default MarketOffersGrid
