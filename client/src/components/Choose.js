import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SplitDiv, CenterDiv} from '../styles/index.js'

class Choose extends Component {
  render() {
    return (
      <div>
      <SplitDiv left>
        <CenterDiv>
          <h1>Buy Bitcoins or Lumens for Ether</h1>
          <p>Open up a Offer in the Smart Contract</p>
          <Link to="/createOffer">
            create a new Offer</Link>
        </CenterDiv>
      </SplitDiv>

      <SplitDiv>
        <CenterDiv right>
          <h1>Buy Ether for Bitcoins or Lumens</h1>
          <p>Find an exsisting offer to trade your crypto with</p>
          <Link to="/market">Go to MarketPlace</Link>
        </CenterDiv>
      </SplitDiv>
      </div>
  )
  }
}

export default Choose;
