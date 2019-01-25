const EthereumSwap = artifacts.require("./EthereumSwap.sol");
web3.eth.getAccounts((e,a) => { accounts=a; });
const oraclizeConnectorAddress = require('../config.js').oraclizeConnectorAddress;
const BigNumber = require('bignumber.js');
const gasPrice = web3.utils.toWei('0.00001','ether')
const gas = '1500000'
const txCost = parseInt(gas) * parseInt(gasPrice)
const oneEth = web3.utils.toWei('1','ether')
const twoEth = web3.utils.toWei('2','ether')
const halfEth =  web3.utils.toWei('0.5','ether')
const bitcoinAddress = "3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9"
const testBitcoinTx = "b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1"

contract("EthereumSwap", (accounts) => {
  let EthereumSwapInstance;

  /// IMPORTANT: add the oraclize address in the config folder after initializing the bridge
  it("initializes with the Oraclize bridge beeing set ", () => {
    return EthereumSwap.deployed().then((instance) => {
      return instance.methods['getTestingOraclizeAddress()'].call()
    }).then((address) => {
      assert.equal(address, oraclizeConnectorAddress);
    });
  })

// app.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525", {from:accounts[0],value: 1000000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))

  it("deposists ether to the contract", async () => {
    const instance = await EthereumSwap.deployed()
    const tx = await instance.depositEther(bitcoinAddress,"615525", {from:accounts[0],value: oneEth})
    const balance = await web3.eth.getBalance(instance.address)
    assert.equal(balance, oneEth)
    })

  it("initializes Oracleize API call correctly", async () => {
    const instance = await EthereumSwap.deployed()
    const balance1 = await web3.eth.getBalance(instance.address)
    const tx = await instance.getTransaction(testBitcoinTx,bitcoinAddress, {from:accounts[0],value: halfEth, gas:gas, gasPrice:gasPrice})
    const balance2 = await web3.eth.getBalance(instance.address)
    const sum = parseInt(balance1) + parseInt(halfEth) + txCost
    console.log(sum);
    return assert.equal(balance2.toString(), sum.toString())
  })
});
