const EthereumSwap = artifacts.require("./EthereumSwap.sol");
const oraclizeConnectorAddress = require('../config.js').oraclizeConnectorAddress;

module.exports = function(deployer, network) {
  if (network === 'ropsten') {
          deployer.deploy(EthereumSwap);
  } else {
      deployer.deploy(EthereumSwap, oraclizeConnectorAddress);
  }
};




