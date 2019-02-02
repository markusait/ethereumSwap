const EthereumSwap = artifacts.require("./EthereumSwap.sol");
const oraclizeConnectorAddress = require('../config.js').oraclizeConnectorAddress;

module.exports = function(deployer) {
  deployer.deploy(EthereumSwap, oraclizeConnectorAddress);
};
