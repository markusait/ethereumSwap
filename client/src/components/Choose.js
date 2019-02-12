import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SplitDiv, CenterDiv} from '../styles/index.js'

class Choose extends Component {
  render() {
    return (<div>
      <Link to="/createOffer">
        <SplitDiv left="left">
          <CenterDiv>
            <h1>Trade Bitcoins or Lumens for your Ether</h1>
            <p>Open up a Offer in the Smart Contract</p>
          </CenterDiv>
        </SplitDiv>
      </Link>
      <Link to="/market">
        <SplitDiv>
          <CenterDiv right="right">
            <h1>Trade Ether for Bitcoins or Lumens</h1>
            <p>Find an exsisting offer to buy Ether</p>
          </CenterDiv>
        </SplitDiv>
      </Link>
    </div>)
  }
}

export default Choose;
