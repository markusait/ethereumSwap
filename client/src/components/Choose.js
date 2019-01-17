import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SplitDiv, CenterDiv} from '../styles/index.js'

class Choose extends Component {
  render() {
    return (
      <div>
      <SplitDiv left>
        <CenterDiv>
          <h1>Buy Bitcoins for Ether</h1>
          <p>Open up a Smart Contract in our market place.</p>
          <Link to="/createOffer">
            create a new Smart Contract</Link>
        </CenterDiv>
      </SplitDiv>

      <SplitDiv>
        <CenterDiv>
          <h1>Buy Ether for Bitcoins</h1>
          <p>Find an exsisting smart contract to open up your funds</p>
          <Link to="/market">Go to MarketPlace</Link>
        </CenterDiv>
      </SplitDiv>
      </div>
  )
  }
}

export default Choose;
