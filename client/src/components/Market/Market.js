import React, {Component, Button} from "react";
import {Link, Router, Route, IndexRoute, BrowserRouter} from 'react-router-dom'
import MarketOfferModal from '../MarketOfferModal/MarketOfferModal'
import './Market.css';
import axios from 'axios';
import img from '../../assets/index.jpeg'

class Market extends Component {
  state = {
    offersData: null,
    activeModal: null
  };

  componentWillMount = async () => {
    try {
      const offersData = await this.getOffersFromDB()
      this.setState({offersData: offersData})
    } catch (error) {
      console.error(error);
    }
  };

  getOffersFromDB = async () => {
    try {
      const response = await axios.get('/api/offers')
      // TODO: make this false once you fix it
      let offerData = response.data.filter(data => data.payedOut == true)
      return offerData
    } catch (e) {
      console.error(e)
    }
  }
  clickHandler = (e, index) => {
    console.log(index);
    this.setState({activeModal: index})
  }

  hideModal = () => {
    this.setState({activeModal: null})
  }


  render() {
    const MarketOffers = ({offers}) => {
      if (offers) {
        return (<React.Fragment>
          {
            offers.map((offer, index) => (<React.Fragment>
              <div key={offer._id} className="container col s12 m6 l4">
                <div className="advantages card-panel hoverable">
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Card Title
                    </span>
                    <p>
                      BitcoinAddress: {offer.bitcoinAddress}</p>
                    <p>
                      Amount BTC: {offer.bitcoinAmount}</p>
                    <p>
                      Amount to Pay: {offer.ethAmount}</p>
                    <p>
                      Ethereum Address of contract: {offer.contractAddress}</p>
                    <p>
                      id: {offer._id}
                    </p>
                    <div>
                      <button id={offer._id} onClick={e => this.clickHandler(e, index)}>View Details</button>
                    </div>
                    <MarketOfferModal
                      offer={offer}
                      id={offer._id}
                      show={this.state.activeModal === index}
                      onHide={this.hideModal}
                      >
                    <div>
                      Here's some content for the modal
                    </div>
                    </MarketOfferModal>
                    {
                      //should pass the mongodb id (or bitcoinAddress) in the URL
                      // <Link to={{
                      //     pathname: "/marketOfferModal",
                      //     state: {
                      //       modal: true,
                      //       data: offer
                      //     }
                      //   }} activeStyle={{
                      //     color: 'red'
                      //   }}>
                      //   Claim your Ether!
                      // </Link>
                    }
                  </div>
                </div>
              </div>
            </React.Fragment>))
          }
        </React.Fragment>)
      } else {
        return null
      }
    }

    return (<div className="market-page">
      <div className="inner-container">
        <section className="offers">
          <div className="row">
            <MarketOffers offers={this.state.offersData}/>
          </div>
        </section>
      </div>
    </div>)
  }
}

export default Market;
