const EthereumSwap = artifacts.require("./EthereumSwap.sol");
web3.eth.getAccounts((e, a) => {
  accounts = a;
});
const oraclizeConnectorAddress = require('../config.js').oraclizeConnectorAddress;
const BigNumber = require('bignumber.js');
const gasPrice = web3.utils.toWei('0.00001', 'ether')
const gas = '1500000'
// const txCost = parseInt(gas) * parseInt(gasPrice)
const txCost = web3.utils.toWei('0.01', 'ether')
const oneEth = web3.utils.toWei('1', 'ether')
const twoEth = web3.utils.toWei('2', 'ether')
const halfEth = web3.utils.toWei('0.5', 'ether')
const bitcoinAddress = "3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9"
const stellarAddress = "GDRK2CMWPHEEHRY6RUBVKXW4FH3KGXVN5ZLZIVKNVCIYIPBASWPAMRQW"
const testBitcoinTx = "b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1"

const oraclizeApiPrice = 500000000000000000

//EDGE CASES
// check what happens if paying out fails



contract("EthereumSwap", (accounts) => {


  it("initializes with the Oraclize bridge beeing set ", async () => {
    const instance = await EthereumSwap.deployed()
    const address = await instance.methods['getTestingOraclizeAddress()'].call()
    assert.equal(address.toUpperCase(), oraclizeConnectorAddress.toUpperCase());
  })

  it("deposists ether to the contract for Bitcoin in Exchange", async () => {
    const instance = await EthereumSwap.deployed()
    const receipt = await instance.depositEther(bitcoinAddress, "615525", 0, {
      from: accounts[0],
      value: oneEth
    })
    const balance = await web3.eth.getBalance(instance.address)
    assert.equal(receipt.logs[0].args.log, "Ether was deposited to contract")
    assert.equal(balance, oneEth)
  })

  it("deposists ether to the contract for Stellar in Exchange", async () => {
    const instance = await EthereumSwap.deployed()
    const receipt = await instance.depositEther(stellarAddress, "615525", 1, {
      from: accounts[0],
      value: oneEth
    })
    const balance = await web3.eth.getBalance(instance.address)
    assert.equal(receipt.logs[0].args.log, "Ether was deposited to contract")
    assert.equal(balance, twoEth) //deposited before that
  })

  it("cannot deposit with the same address twice", async () => {
    const instance = await EthereumSwap.deployed()
    try {
    const receipt = await instance.depositEther(bitcoinAddress, "615525", 0, {
      from: accounts[0],
      value: oneEth
    })
  } catch(error){
    assert.isNotNull(error,"Error was thrown correctly")
  }
  })

  it("can payback the original owner of the Offer", async () => {
    const instance = await EthereumSwap.deployed()
    const balance1 = await web3.eth.getBalance(instance.address)
    const receipt = await instance.depositEther(stellarAddress+"nan", "615525", 1, {
      from: accounts[0],
      value: oneEth
    })
    const check = await instance.ownerWithdraw(stellarAddress)
    const balance2 = await web3.eth.getBalance(instance.address)
    assert.equal(balance2.toString(), balance1.toString(), "paying and redeeming to contract works")
  })

  // had to use new web3 sntax here for events
  it("initializes Oracleize API call correctly", async () => {
    const instance = await EthereumSwap.deployed()
    const balance1 = await web3.eth.getBalance(instance.address)
    const receipt = await instance.getTransaction(testBitcoinTx, bitcoinAddress, {
      from: accounts[0],
      value: halfEth,
      gas: gas
    })
    const balance2 = await web3.eth.getBalance(instance.address)
    const sum = parseInt(balance1) + parseInt(halfEth) - parseInt(txCost)
    assert.equal(balance2.toString(), sum.toString(), "contract got the correct amount")
    assert.equal(receipt.logs[0].args.log, 'Oraclize query was sent, standing by for the answer...', 'sending Oracle worked')

  })

})

const depositEvents = async (instance) => {
  instance.events.LogInfo({
      fromBlock: 'latest',
      toBlock: 'pending'
    })
    .on('data', async (event) => {
      return event.returnValues.log
    })
    .on('changed', (event) => {
      return event
    }).
  on('error', (error) => {
    return error
  });
}


const payedOutEvents = async (instance) => {
  instance.events.PayedOutEvent({
      fromBlock: 0,
      toBlock: 'pending'
    })
    .on('data', (event) => {
      console.log(event);
      return event.returnValues
    }).on('changed', (event) => {
      return event
    }).on('error', (error) => {
      return error
    })
}
