const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const EthereumSwap = require('./client/src/contractInterface/EthereumSwap.json');
const cryptoAddress="lol"
const cryptoAmount = 5
const stellar = false
const ethAmount = 100000000
const test = async () => {
  console.log(web3.version)

  const accounts = await web3.eth.getAccounts();
  console.log(web3.version);

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  // for ganach networkId should be  5777
  const deployedNetwork = EthereumSwap.networks[networkId];

  const deployedContractAddress = deployedNetwork.address
  // console.log(deployedNetwork.address);
  const deployedContract = new web3.eth.Contract(EthereumSwap.abi, deployedNetwork && deployedContractAddress)
  console.log(cryptoAddress,cryptoAmount);
  const response = await deployedContract.methods.depositEther(cryptoAddress, cryptoAmount.toString(), ~~stellar).send({
    from: accounts[0],
    value: ethAmount,
    gas: 1500000
  })
  console.log(response);
}
test()
