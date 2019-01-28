import React, {Component} from "react"
import {Card, CardAction } from '../styles/index'
import Blockies from 'react-blockies';
import metamask from '../assets/metamask.png'


class MarketOffersGrid extends Component {
  constructor(props) {
    super(props)
  }

  defineComponentstate(offer){
      if(offer.payedOut) return "payedOut hoverable"
      if(this.props.routeTx === offer.offerTxHash) return "routeTx hoverable"
      return "normal hoverable"
  }
  render() {
    if(this.props.offers.length < 10) return <p>not here yet</p>
        const StatusText = ({offer}) => {
          const status = this.defineComponentstate(offer)
          if(status === "payedOut hoverable" ) return <p className="markedContract">This contract is alredy payed out!</p>
          if(status === "routeTx hoverable") return <p className="markedContract">This is your Contract!</p>
          return <React.Fragment> </React.Fragment>
        }

        return (<React.Fragment>
          {
            this.props.offers.map((offer, index) => (<React.Fragment>
          <Card offer="true" className={this.defineComponentstate(offer)} >
              <StatusText offer={offer}/>
                <div className="card-image">
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
