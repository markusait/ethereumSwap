var Election = artifacts.require("./EthereumSwap.sol");

contract("EthereumSwap", function(accounts) {
  var EthereumSwapInstance;

  it("initializes with the Oraclize bridge beeing set ", function() {
    return EthereumSwap.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });
