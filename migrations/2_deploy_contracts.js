var EthereumSwap = artifacts.require("./EthereumSwap.sol");
let oraclizeConnectorAddress = require('../config.js').oraclizeResolverAddress;

module.exports = function(deployer) {
  deployer.deploy(EthereumSwap, oraclizeConnectorAddress);
};
