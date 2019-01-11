import React, {Component} from "react";
import './MarketOffers.css';
import axios from 'axios';
import img from '../../assets/index.jpeg'

// {
  // <div className="card-image waves-effect waves-block waves-light">
  //     <img className="activator"src={img} alt={"logo"}/>
  //   </div>
// }
const MarketOffers = (props) => {
  //making sure it is renderned when offers are set
  let offers = props.offers
  if (offers) {
    return (<React.Fragment>
      {
        offers.map(offer => (<React.Fragment>
          <div className="container col s12 m6 l4">
            <div className="  advantages card-panel hoverable">
              <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i>
            </span>
                <p> BitcoinAddress: {offer.bitcoinAddress}</p>
                <p> Amount BTC: {offer.bitcoinAmount}</p>
                <p> Amount to Pay: {offer.ethAmount}</p>
                <p> Ethereum Address of contract: {offer.contractAddress}</p>

              <div className="input-field ">
                <input id="bitcoinTransactionHash" name="bitcoinTransactionHash" value={props.bitcoinTransactionHash} onChange={props.handleChange} type="text" className="validate"></input>
                <label htmlFor="bitcoinTransactionHash">Type in the bitcoin Transacition Hash</label>
              </div>
              <div className="input-field ">
                <input id="bitcoinAddress" name="bitcoinAddress" value={props.bitcoinAddress} onChange={props.handleChange} type="text" className="validate"></input>
                <label htmlFor="bitcoinAddress"> Type in the Bitcoin Address</label>
              </div>

              </div>

              {
                // <div className="card-reveal">
                //   <span className="card-title grey-text text-darken-4"> Card Title<i className="material-icons right">close</i>
                //   </span>
                //   <p>Here is some more information about this product that is only revealed once clicked on.</p>
                // </div>
              }

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