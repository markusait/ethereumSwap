var EthereumBridge = artifacts.require("./EthereumBridge.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumBridge);
};
