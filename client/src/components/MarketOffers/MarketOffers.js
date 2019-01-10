import React, {Component} from "react";
import './MarketOffers.css';
import axios from 'axios';
import img from '../../assets/index.jpeg'

const MarketOffers = ({offers}) => {
  if (offers) {
    return (<React.Fragment>
      {
        offers.map(offer => (<React.Fragment>
          <div className="container col l4">
            <div className="  advantages card-panel hoverable">
              {
            // <div class="card-image waves-effect waves-block waves-light">
            //     <img className="activator"src={img} alt={"logo"}/>
            //   </div>
            }
              <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i>
            </span>
                <p> BitcoinAddress: {offer.bitcoinAddress}</p>
                <p> Amount: {offer.bitcoinAmount}</p>
                <p> Ethereum Address of contract: {offer.contractAddress}</p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4"> Card Title<i class="material-icons right">close</i>
                </span>
                <p>Here is some more information about this product that is only revealed once clicked on.</p>
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
export default MarketOffers;
