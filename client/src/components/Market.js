import React, {Component} from "react"
import MarketOfferModal from './MarketOfferModal'
import MarketOffersGrid from './MarketOffersGrid'
import axios from 'axios'
import {Grid, Main, ToastContainer, toast, Preloader } from '../styles/index'

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
      redeemTxHash: null,
      // oraclizeApiPrice: 50000000000000000,
      oraclizeApiPrice: 4000000000000000,
      // oraclizeApiPrice: 3,
      gasLimit: 3500000,
    }
  }

  componentDidMount = async () => {
    try {
      const offersData = await this.getOffersFromDB()
      this.setState({
        offersData
      })
    } catch (error) {
      console.error(error)
    }
  }

  getOffersFromDB = async (reload) => {
    try {
      const {data} = await axios.get('/api/offers', {crossdomain: true})
      if(reload) this.setState({offersData: data, loading: false})
      return data
    } catch (e) {
      console.error(e)
    }
  }

  modifyOfferFromDB = async (payedOutTransactionHash, recipientAddress) => {
    try {
      const updateData = {
        payedOutTransactionHash,
        recipientAddress,
        'payedOut': true,
      }
      const response = await axios.put(`/api/offers/${this.state.payoutOfferId}`, updateData)
      return response
    } catch (e) {
      console.error(e)
    }
  }

  initializePayoutProcess = async (index, cryptoTransactionHash, cryptoAddress) => {
    this.setState({loading : true})
    try {
      const payoutOfferId = this.state.offersData[index]['_id']
      const { account, contract } = this.props
      const { gasLimit, oraclizeApiPrice } = this.state
      const response = await contract.methods.getTransaction(cryptoTransactionHash, cryptoAddress)
                                  .send({from: account, value: oraclizeApiPrice, gas: gasLimit})
      this.setState({
        payoutOfferId,
        redeemTxHash: response.transactionHash,
      })
      this.watchEvents()
    } catch (e) {
      console.error(e)
    }
  }

  watchEvents = async () => {
    const {contract} = this.props
    //error event
    contract.events.LogInfo({fromBlock: 'latest', toBlock: 'pending'}).on('data', (event) => {
      this.notify(event.returnValues.log)
    }).on('error', (error) => {
      console.error(error)
    })

    //sucessfull event
    contract.events.PayedOutEvent({fromBlock: 'latest', toBlock: 'pending'}).on('data', (event) => {

      const recipientAddress = event.returnValues._recipientAddress
      const payedOutTransactionHash = event.transactionHash

      this.modifyOfferFromDB(payedOutTransactionHash, recipientAddress)
      this.getOffersFromDB(true)
      this.notify(false, payedOutTransactionHash)

    }).on('error', (error) => {
      console.error(error)
    })
  }

  notify = (error, payedOutTransactionHash) => {
    !error ?
      toast.success(`🦄 Transaction Successfull ! ${payedOutTransactionHash}`, {position: toast.POSITION.TOP_CENTER})
    :
      toast.error(error)
    }

  openModal = (e, index) => {
    this.setState({showModal: true, openModalIndex: index})
  }

  hideModal = () => {
    this.setState({showModal: false})
  }

  render() {
    if (!this.state.offersData)
      return (<div> <Preloader size='big'> </Preloader><p>Please install Meta Mask and switch to the RPC Provider http://blockchain.etherswaps.co</p> </div>)

    return (
      <Main type={"market"}>
        <Grid>
          <ToastContainer autoClose={60000}/>
          <MarketOffersGrid
            offers={this.state.offersData}
            openModal={this.openModal}
            offerTxHash={this.props.offerTxHash}
            />
          <MarketOfferModal
            offer={this.state.offersData[this.state.openModalIndex]}
            index={this.state.openModalIndex}
            show={this.state.showModal}
            loading={this.state.loading}
            onHide={this.hideModal}
            redeemTxHash={this.state.redeemTxHash}
            initializePayoutProcess={this.initializePayoutProcess}
            />
        </Grid>
      </Main>
  )
  }
}

export default Market
