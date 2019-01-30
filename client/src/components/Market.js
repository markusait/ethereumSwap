import React, {Component} from "react"
import MarketOfferModal from './MarketOfferModal'
import MarketOffersGrid from './MarketOffersGrid'
import EthereumSwap from "../contractInterface/EthereumSwap.json"
import getWeb3Data from "../utils/getWeb3"
import axios from 'axios'
import {Grid, Card, Main, ToastContainer, toast, Preloader } from '../styles/index'

class Market extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      showModal: false,
      offersData: null,
      openModalIndex: null,
      payoutOfferId:null,
      cryptoAmount: 615525,
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
      const {
        web3,
        accounts,
        networkId,
        deployedNetwork,
        deployedContract,
        deployedContractAddress
      } = await getWeb3Data()

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

  getOffersFromDB = async (flag) => {
    try {
      const response = await axios.get('/api/offers', {crossdomain: true})
      if(flag) this.setState({offersData:response.data, loading: false})
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  modifyOfferFromDB = async (payedOutTransactionHash, recipientAddress) => {
    try {
      const updateData = {"payedOut": true, "payedOutTransactionHash": payedOutTransactionHash, "recipientAddress": recipientAddress}
      const response = await axios.put(`/api/offers/${this.state.payoutOfferId}`, updateData)
      return response
    } catch (e) {
      console.error(e)
    }
  }

  initializePayoutProcess = async (index, bitcoinTransactionHash, cryptoAddress) => {
    try {
      //run this from watch events
      // this.modifyOfferFromDB()
      const payoutOfferId = this.state.offersData[index]['_id']
      const {accounts, deployedContract, oraclizeApiPrice} = this.state
      const response = await deployedContract.methods.getTransaction(bitcoinTransactionHash, cryptoAddress).send({from: accounts[0], value: oraclizeApiPrice, gas: 1500000})

      this.setState({redeemTxHash: response.transactionHash, loading: true, payoutOfferId})
      this.watchEvents()
    } catch (e) {
      console.error(e)
    }
  }

  watchEvents = async () => {
    const {deployedContract} = this.state
    //Error Event
    deployedContract.events.LogInfo({fromBlock: 'latest', toBlock: 'pending'}).on('data', (event) => {
      console.log(event.returnValues.log)
      this.notify(event.returnValues.log)
      console.log(event)

    }).on('error', (error) => {
      console.error(error)
    })

    //sucessfull event
    deployedContract.events.PayedOutEvent({fromBlock: 'latest', toBlock: 'pending'}).on('data', (event) => {

      const recipientAddress = event.returnValues._recipientAddress
      const payedOutTransactionHash = event.transactionHash

      this.modifyOfferFromDB(payedOutTransactionHash, recipientAddress)
      this.getOffersFromDB(true)
      this.notify(false, payedOutTransactionHash)
    }).on('error', (error) => {
      console.error(error)
    })
  }

  checkRoutedFrom = () => {
    let path = this.props.location.pathname
    return path.length > 7 ? path.substring(8, path.length) : null
  }

  notify = (error, payedOutTransactionHash) => {
    !error ?
      toast.success(`🦄 Transaction Successfull ! ${payedOutTransactionHash}`, {position: toast.POSITION.TOP_CENTER})
    :
      toast.error(`Transaction unsuccsessfull! ${error} please try again `)
    }

  openModal = (e, index) => {
    this.setState({showModal: true, openModalIndex: index})
  }

  hideModal = () => {
    this.setState({showModal: false})
  }

  render() {
    //waiting for offers data to be loaded
    if (!this.state.offersData)
      return ( <Preloader size='big'/>)

    return (
      <Main type="market">
        <Grid>
          <ToastContainer autoClose={8000}/>
          <MarketOffersGrid
            offers={this.state.offersData}
            openModal={this.openModal}
            routeTx={this.state.routeTx}
            />
          <MarketOfferModal
            offer={this.state.offersData[this.state.openModalIndex]}
            index={this.state.openModalIndex}
            show={this.state.showModal}
            loading={this.state.loading}
            onHide={this.hideModal}
            redeemTxHash={this.state.redeemTxHash}
            initializePayout={this.initializePayoutProcess}/>
        </Grid>
      </Main>
  )
  }
}

export default Market
