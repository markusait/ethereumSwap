import React, { Component } from "react"
import getWeb3Data from "../utils/getWeb3";
import Home from './Home';
import Choose from './Choose';
import Market from './Market';
import CreateOffer from './CreateOffer';
import AppNavbar from './AppNavbar'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import '../styles/main.css';

class App extends Component {
    state = {
        web3: null,
        network: null,
        networkId: null,
        accounts: null,
        deployedContract: null,
        deployedContractAddress: null,
        deployedNetwork: null,
    };
    componentDidMount = async () => {
        try {
            const web3Data = await getWeb3Data()
            this.watchForAccountChanges()
            this.setState({
                ...web3Data
            })
        } catch (error) {
            console.error(error);
        }
    };

    getNetwork = () => {
        return !this.state.web3 ? "none" : this.state.network
    }
    watchForAccountChanges = () => {
        window.ethereum.on('accountsChanged', (accounts) => {
            console.log(this.state.accounts)
            this.setState({
                accounts
            })
        })
    }
    render() {
        return (
        <Router>
            <Switch>
                <div>
                    <AppNavbar network={this.getNetwork}/>
                    <Route exact path="/" render={()=><Home {...this.state}/>}/>
                    <Route exact path="/choose" component={Choose} />
                    <Route exact path="/createOffer" render={()=><CreateOffer {...this.state}/>} />
                    <Route path="/market" component={Market} />
                </div>
            </Switch>
        </Router>
        )
    }
}

export default App