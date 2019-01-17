import React, {Component} from "react"
import MarketOfferModal from '../MarketOfferModal/MarketOfferModal'
import EthereumSwap from "../../contractInterface/EthereumSwap.json"

import './Market.css'
import getWeb3Data from "../../utils/getWeb3"
import axios from 'axios'
// axios.defaults.baseURL = 'http://ethswap-backend.digitpay.de';
// import img from '../../assets/index.jpeg'

class Market extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offersData: null,
      activeModal: null,
      bitcoinAmount: 615525,
      ethAmount: 1000000000000000000,
      web3: null,
      networkId: null,
      accounts: null,
      // account = '0x0',
      deployedContract: null,
      deployedContractAddress: null,
      redeemTxHash: null,
      oraclizeApiPrice: 500000000000000000,
      routeTx: null
    }
  }

  componentWillMount = async () => {
    try {
      const routeTx = await this.checkRoutedFrom()
      //fetch db for Offers get offers data from constructor
      const offersData = await this.getOffersFromDB()

      // Get network provider and web3 instance.
      const  {web3, accounts, networkId, deployedNetwork, deployedContract, deployedContractAddress } = await getWeb3Data()

      this.setState({
        offersData,
        web3,
        accounts,
        deployedContract,
        networkId,
        deployedNetwork,
        deployedContractAddress,
        routeTx
      })

    } catch (error) {
      console.error(error)
    }
  }
  handleChange = (event) => {
    const {value, name} = event.target
    this.setState({[name]: value})
  }

  //check if routed from creatOffer with a tx
  //if true highlight in the render object function
  checkRoutedFrom = () => {
    if (this.props.location.pathname.length > 7) {
      const path = this.props.location.pathname
      const tx = path.substring(8, path.length)
      return tx
    } else {
      return null
    }
  }

  getOffersFromDB = async () => {
    try {
      const response = await axios.get('/api/offers', {crossdomain: true})
      // TODO: make this false once you fix it
      // let offerData = response.data.filter(data => data.payedOut == true)
      console.log(response);
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  initializePayoutProcess = async (index, bitcoinTransactionHash, bitcoinAddress) => {
    try {
      const {accounts, deployedContract, oraclizeApiPrice} = this.state
      const response = await deployedContract.methods.getTransaction(bitcoinTransactionHash, bitcoinAddress).send({from: accounts[0], value: oraclizeApiPrice, gas: 1500000})
      console.log(response)
      this.watchEvents()
      this.setState({redeemTxHash: response.transactionHash})
    } catch (e) {
      console.error(e)
    }
  }

  watchEvents = async () => {
    console.log('watching for events');
    const {deployedContract} = this.state
    deployedContract.events.LogInfo({fromBlock: 'latest', toBlock: 'latest'}).on('data', (event) => {
      console.log(event)
    }).on('error', (error) => {
      console.error(error)
    })
    //acess data with returnedValues and (bitcoinAddress, ethAmount and recipient Address)
    // promt toast with this data and the transaction hash (modify solidity)
    // delete the contract from the Market placed or disable it (payedOut: true!!!!)
    // show a loader which says waiting for transaction to be compled showing the first Log
    // loader should resolve once the Payed out event occured and data is checked correctly
    deployedContract.events.PayedOutEvent({fromBlock: 0, toBlock: 'latest'}).on('data', (event) => {
      console.log(event)
    }).on('error', (error) => {
      console.error(error)
    })

  }

  openModal = (e, index) => {
    this.setState({activeModal: index})
  }

  hideModal = () => {
    this.setState({activeModal: null})
  }

  render() {

    const MarketOffers = ({offers}) => {
      console.log(offers);
      if (offers) {
        return (<React.Fragment>
          {
            offers.map((offer, index) => (<React.Fragment>
              <div key={offer._id} className="container col s12 m6 l4">

                <div className="advantages card-panel hoverable">
                  <div className={this.state.routeTx === offer.offerTxHash
                      ? 'center highlight'
                      : 'dont-show'}>
                    <a onClick={e => this.openModal(e, index)} className="btn-floating btn-small pulse orange">
                      <i className="material-icons">arrow_drop_down</i>
                    </a>
                    <p>this is your offer
                    </p>
                  </div>
                  <div className="card-content">
                    <p>
                      BitcoinAddress: {offer.bitcoinAddress}</p>
                    <p>
                      Amount BTC: {offer.bitcoinAmount}</p>
                    <p>
                      Amount to Pay: {offer.amountEth}</p>
                    <p>
                      Ethereum Address of contract: {offer.contractAddress}</p>
                    <p>
                      id: {offer._id}
                    </p>
                    <div>
                      <button id={offer._id} onClick={e => this.openModal(e, index)}>View Details</button>
                    </div>
                    <MarketOfferModal offer={offer} index={index} show={this.state.activeModal === index} onHide={this.hideModal} initializePayout={this.initializePayoutProcess}></MarketOfferModal>
                  </div>
                </div>
              </div>
            </React.Fragment>))
          }
        </React.Fragment>)
      } else {
        return null
      }
    }

    return (<div className="market-page">
      <div className="inner-container">
        <section className="offers">
          <div className="row">
            <MarketOffers offers={this.state.offersData}/>
          </div>
        </section>
      </div>
    </div>)
  }
}

export default Market
