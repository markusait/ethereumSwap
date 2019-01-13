import React, {Component, Button} from "react";
import {Link, Router, Route, IndexRoute, BrowserRouter} from 'react-router-dom'
import MarketOfferModal from '../MarketOfferModal/MarketOfferModal'
import './Market.css';
import getWeb3 from "../../utils/getWeb3";
import axios from 'axios';
import img from '../../assets/index.jpeg'

class Market extends Component {
  state = {
    offersData: null,
    activeModal: null,
    web3: null
  };

  componentWillMount = async () => {
    try {
      const offersData = await this.getOffersFromDB()
      const web3 = await getWeb3();
      this.setState({offersData: offersData, web3: web3})
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
  openModal = (e, index) => {
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
                    <span className="card-title activator grey-text text-darken-4">Offer
                    </span>
                    <p>
                      BitcoinAddress: {offer.bitcoinAddress}</p>
                    <p>
                      Amount BTC: {offer.bitcoinAmount}</p>
                    <p>
                      Amount to Pay: {offer.amountEth}</p>
                    <p>
                      Ethereum Address of contract: {offer.contractAddress}</p>
                    <p>
                      id: {offer._id}
                    </p>
                    <div>
                      <button id={offer._id} onClick={e => this.openModal(e, index)}>View Details</button>
                    </div>
                    <MarketOfferModal
                      offer={offer}
                      id={index}
                      show={this.state.activeModal === index}
                      onHide={this.hideModal}
                      web3={this.state.web3}
                      >
                    </MarketOfferModal>
                    {
                      //should only render if the Modal
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
