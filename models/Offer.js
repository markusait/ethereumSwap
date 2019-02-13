const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Changethis and have etherscan uri auto fill in ?
const offerSchema = new Schema({
  contractAddress: {
    type: String,
    required: false
  },
  contractNetworkId: {
    type: Number,
    required: false
  },
  contractNetwork: {
    type:String,
    required: false
  },
  offerOwnerAddress: {
    type: String,
    required: false
  },
  offerEthAmount: {
    type: Number,
    required: false
  },
  offerCryptoAddress: {
    type: String,
    required: false
  },
  offerCryptoAmount: {
    type: String,
    required: false
  },
  offerCurrency: {
    type: String,
    required: false
  },
  offerTxHash: {
    type: String,
    required: false
  },
  payedOut: {
    type: Boolean,
    default: false,
    required: false
  },
  payedOutTransactionHash: {
    type: String,
    required: false
  },
  payedOutrecipientAddress: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
    required: false
  }
});

module.exports = Offer = mongoose.model('offer', offerSchema);
