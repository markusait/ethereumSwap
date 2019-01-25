var EthereumSwap = artifacts.require("./EthereumSwap.sol");
let oraclizeConnectorAddress = require('../config.js').oraclizeConnectorAddress;

module.exports = function(deployer) {
  deployer.deploy(EthereumSwap, oraclizeConnectorAddress);
};
