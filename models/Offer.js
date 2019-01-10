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
    ownerAddress: {
      type: String,
      required: false
    },
    amountEth: {
      type: Number,
      required: false
    },
    bitcoinAddress: {
      type: String,
      required: false
    },
    bitcoinAmount:{
      type: Number,
      required: false
    },
    offerTxHash:{
      type: String,
      required: false
    },
    payedOut:{
      type: Boolean,
      default: false,
      required: false
    },
    date : {
      type: Date,
      default: Date.now,
      required: false
    }
});

module.exports = Offer = mongoose.model('offer', offerSchema);
