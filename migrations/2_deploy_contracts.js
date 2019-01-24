var EthereumSwap = artifacts.require("./EthereumSwap.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumSwap, "0x5def2f6bbfe3defbfdee0a2c64b81506347633b0");
};
