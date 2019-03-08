import React, { Component } from "react"
import getWeb3Data from "../utils/getWeb3Data";
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
        loading: false,
        web3: null,
        account: null,
        contract: null,
        contractNetworkId: null,
        contractAddress: null,
        contractNetwork: null,
        offerTxHash: null
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
        return !this.state.web3 ? "none" : this.state.contractNetwork
    }
    watchForAccountChanges = () => {
        window.ethereum.on('accountsChanged', (account) => {
            this.setState({
                account
            })
        })
    }
    createdAnOffer = (transactionHash) => {
        this.setState({
            offerTxHash: transactionHash,
            loading: false
        })
    }
    startLoading = () => {
        this.setState({loading: true})
    }

    render() {
        return (
        <Router>
            <Switch>
                <div>
                    <AppNavbar network={this.getNetwork}/>
                    <Route exact path="/" render={()=><Home {...this.state}/>}/>
                    <Route exact path="/choose" component={Choose} />
                    <Route
                      exact path = "/createOffer"
                      render = {() =>
                        <CreateOffer {...this.state}
                            createdAnOffer = {this.createdAnOffer}
                            startLoading = {this.startLoading}
                            />
                    }
                    />
                    <Route path="/market"  render={()=> <Market {...this.state} />} />
                </div>
            </Switch>
        </Router>
        )
    }
}

export default App