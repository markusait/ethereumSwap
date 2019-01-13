import React, {Component} from "react";
// import MarketOffers from '../MarketOffers/MarketOffers'
import EthereumBridge from "../../contractInterface/EthereumBridge.json";
import getWeb3 from "../../utils/getWeb3";
import './MarketOfferModal.css';
import axios from 'axios';
import img from '../../assets/index.jpeg'
import Modal from 'react-modal';

class MarketOfferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //testing
      // const randomString = Math.random().toString(36).substring(34)
      // offersData: this.props.offer,
      bitcoinAddress: '3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9',
      bitcoinTransactionHash: 'b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1',
      bitcoinAmount: 615525,
      ethAmount: 1000000000000000000,
      web3: null,
      networkId: null,
      accounts: null,
      // account = '0x0',
      deployedContract: null,
      deployedContractAddress: null,
      redeemTxHash: null,
      oraclizeApiPrice: 500000000000000000
    }
  }
  componentWillMount = async () => {
    if (!this.props.show) {
      // console.log(this.props);
      console.log("not showing modal!");
      return null;
    }
    try {
      //fetch db for Offers get offers data from constructor
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("trying");
      console.log(web3);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // for ganach networkId should be  5777
      const deployedNetwork = EthereumBridge.networks[networkId];
      // console.log(deployedNetwork.address);
      const deployedContract = new web3.eth.Contract(EthereumBridge.abi, deployedNetwork && deployedNetwork.address);
      // const deployedContract = await instance.deployed()
      console.log(web3);
      console.log(networkId);
      console.log(deployedNetwork);
      console.log(deployedContract);
      console.log(deployedNetwork.address);
      console.log(deployedContract._address);

      this.setState({web3, accounts, deployedContract, networkId, deployedContractAddress: deployedContract._address})
      console.log(this.state);
    } catch (error) {
      // alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  }
  // TODO: secify gas price and usage here
  // this.writeDetailsToDB() with payed = true  and payer address
  //should either get ID from function to process payment or
  //what it has in state: oraclizeApiPrice, accouts[0], deployedContract (should later choose from Mainnet, my testnet and Ropsten )
  //bitcoinTransactionHash and bitcoinAddress from state
  //maybe just save the ID from the form(it should not render the mongodb but would be good for genereal stuff)
  initializePayoutProcess = async (event) => {
    event.preventDefault();
    try {
      const {accounts, bitcoinAddress, bitcoinTransactionHash, deployedContract, oraclizeApiPrice} = this.state;
      const response = await deployedContract.methods.getTransaction(bitcoinTransactionHash, bitcoinAddress).send({from: accounts[0], value: oraclizeApiPrice})
      console.log(response);
      this.setState({redeemTxHash: response.transactionHash});

    } catch (e) {
      console.error(e);
    }
  }

  handleChange = (event) => {
    const {value, name} = event.target
    this.setState({[name]: value});
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    console.log('rendering');

    return (
      <div className="modal">
        <div className="modal-content">
            <button className="close" onClick={this.props.onHide}/>
          <p>{JSON.stringify(this.props.offer)}</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      {
      //   <div>
      //     <p>lol</p>
      // </div>
        // <div><p>lol</p>
        //   <div className="backdrop" style={{
        //     backdropStyle
        //   }}>
        //   <div className="modal" style={{
        //       modalStyle
        //     }}>
        //     <p>Modal showing </p>
        //     <div className="footer">
        //       <button onClick={this.props.onClose}>
        //         Close
        //       </button>
        //     </div>
        //   </div>
        // </div>
      }
    </div>)
  }
}
export default MarketOfferModal;
