import React, { Component } from "react"
import { Navbar, NavItem, Icon } from 'react-materialize'
import { Link } from 'react-router-dom';
import getWeb3Data from "../utils/getWeb3";

class AppNavbar extends Component {
  state = {
    //   web3Data: null
    web3: null,
    networkId: null,
    accounts: null,
    deployedContract: null,
    deployedContractAddress: null,
    deployedNetwork: null,
  };


    componentDidMount = async () => {
        try {
            const web3Data = await getWeb3Data()
            console.log(web3Data.networkId)
            this.watchForAccountChanges()
            this.setState({...web3Data})
          } catch (error) {
              console.error(error);
          }
      };

    getNetwork = () => {
         return !this.state.web3 ? "none" : this.state.network
    }
    watchForAccountChanges = () => {
        window.ethereum.on('accountsChanged', (accounts) => {
            console.log(this)
            this.setState({
                accounts
            })
        })
    }

    render() {
        return (
            <Navbar brand='Etherswaps' right>
                    <NavItem> Connected Network: {this.getNetwork()} </NavItem>
                    <NavItem><Link to="/choose"> Getting started </Link></NavItem>
                    <NavItem><Link to="/createOffer">Create an Offer </Link></NavItem>
                    <NavItem><NavItem><Link to="/market"><Icon>view_module</Icon></Link></NavItem></NavItem>
            </Navbar>
        )
    }
}

export default AppNavbar