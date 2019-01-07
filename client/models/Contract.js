const mongoose = require('mongoose');

// Etherscan URI and others possible 
const contractSchema = mongoose.Schema({
    contractAddress: String,
    ownerAaddress: String,
    amountEth: Number,
    bitcoinAddress: String,
    bitcoinAmount:Number
});

module.exports = postSchema;
