var EthereumSwap = artifacts.require("./EthereumSwap.sol");
web3.eth.getAccounts((e,a) => { accounts=a; });

contract("EthereumSwap", function(accounts) {
  var EthereumSwapInstance;

  it("initializes with the Oraclize bridge beeing set ", () => {
    return EthereumSwap.deployed().then((instance) => {
      return instance.methods['getTestingOraclizeAddress()'].call()
    }).then((address) => {
      assert.equal(address, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475");
    });
  })

// app.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525", {from:accounts[0],value: 1000000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))


  // it("deposists ether to the contract", () => {
  //   return EthereumSwap.deployed().then((instance) => {
  //     instance.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525", {from:accounts[0],value: 1000000000000000000})
  //     // .then((instance) => {console.log(instance)}).catch(e => console.log(e))
  //     return instance
  //   }).then((instance) => {
  //       web3.eth.getBalance(instance.address).then((balance) => {
  //       assert.equal(balance, 1000000000000000000))
  //       })
  //   })
  // });


  it("deposists ether to the contract", async () => {
    const instance = await EthereumSwap.deployed()
    const tx = await instance.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525", {from:accounts[0],value: 1000000000000000000})
    const balance = await web3.eth.getBalance(instance.address)
    assert.equal(balance, 1000000000000000000)
    })

  it("initializes Oracleize API call correctly", async () => {
    const instance = await EthereumSwap.deployed()
    const balance = await web3.eth.getBalance(instance.address)
    const tx = await instance.getTransaction("b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1","3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9", {from:accounts[0],value: 500000000000000000})
    const balance2 = await web3.eth.getBalance(instance.address)
    return balance > balance2

  })





});
