var EthereumSwap = artifacts.require("./EthereumSwap.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumSwap, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475");
};
