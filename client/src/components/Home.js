import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Main, Header} from '../styles/index'

class Home extends Component {

  render() {
    return (
      <Main type={"main"}>
        <Header>
          Welcome to the Bitcoin Ethereum Bridge
        </Header>
        <p>
          You can exchange Ether and Bitcoin with anyone in the most decentralized way for free!</p>
        <div >
          <Link to="/choose">
            Get Started
          </Link>
        </div>
      </Main>
  );
  }
}

export default Home;
