import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Choose.css';

class Choose extends Component {
  componentWillMount() {
    console.log("will Mounting");
  }
  render() {
    return (<section class="container">
    {
      // <div class="left-half">
//   <article>
//     <h1>Buy Bitcoins for Ether</h1>
//     <p>Open up a Smart Contract in our market place.</p>
//     <Link to="/createContract"> create a new Smart Contract</Link>
//   </article>
// </div>
// <div class="right-half">
//   <article>
//     <h1>Buy Ether for Bitcoins</h1>
//     <p>Find an exsisting smart contract to open up your funds</p>
//     <Link to="/market">Go to MarketPlace</Link>
//   </article>
// </div>
//  <div class="split left">
       }
<div class="split left">
  <div class="centered">
    <h1>Buy Bitcoins for Ether</h1>
    <p>Open up a Smart Contract in our market place.</p>
    <Link to="/createContract"> create a new Smart Contract</Link>
  </div>
</div>

<div class="split right">
  <div class="centered">
    <h1>Buy Ether for Bitcoins</h1>
    <p>Find an exsisting smart contract to open up your funds</p>
    <Link to="/market">Go to MarketPlace</Link>
  </div>
</div>
    </section>)
  }
}

export default Choose;
