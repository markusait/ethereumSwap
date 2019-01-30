import React, {Component} from "react"
import {Blockies, Card, CardAction, Button} from '../styles/index'


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
    // if(this.props.offers.length == 0) return <p>not here yet</p>
        const StatusText = ({offer}) => {
          const status = this.defineComponentstate(offer)
          if(status === "payedOut hoverable" ) return <p className="markedContract">This contract is alredy payed out!</p>
          if(status === "routeTx hoverable") return <p className="markedContract">This is your Contract!</p>
          return <React.Fragment> </React.Fragment>
        }

        return (<React.Fragment>
          {
            this.props.offers.map((offer, index) => (<React.Fragment>
          <Card key={index} offer="true" className={this.defineComponentstate(offer)} >
              <StatusText offer={offer}/>
                <div className="card-image">
                  <Blockies
                        seed={offer.cryptoAddress}
                        size={100}
                        scale={3}
                        bgColor="#FF7F00"
                        spotColor="#000"
                  />
                   </div>
                  <p>
                    Amount to claim: {offer.cryptoAmount} {offer.curreny ? "Lumens": "Bitcoin"}
                  </p>
                  <p>
                    Amount to Pay: {offer.amountEth} </p>
                <CardAction>
                  <Button floating large waves='light' icon='remove_red_eye' className="orange marketBtn" id={offer._id} onClick={e => this.props.openModal(e, index)}>View Details</Button>
                </CardAction>
            </Card>
            </React.Fragment>))
          }
        </React.Fragment>)
      }
  }

export default MarketOffersGrid
