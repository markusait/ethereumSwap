import Web3 from "web3";
import EthereumSwap from "../contractInterface/EthereumSwap.json";
import EthereumSwapRopsten from "../contractInterface/EthereumSwapRopsten.json";

// IMPORTANT:
// omitted window event listener here see here for more:
// https://stackoverflow.com/questions/53366103/await-keeps-on-waiting-react-react-router

const getWeb3 = () =>
  new Promise( async(resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        resolve(web3);
      }

  });

const getNetwork = (netId) => {
    switch (netId.toString()) {
      case "1":
        return 'Mainnet'
      case "2":
        return 'Morden'
      case "3":
        return 'Ropsten'
      case "4":
        return 'Rinkeby'
      case "42":
        return 'Kovan'
      case "5777":
        return 'Local Blockchain'
      case "1548680914004":
        return 'Etherswaps Blockchain'
      default:
        return 'an unknown network.'
    }
  }

// const getContractInterface = (contractNetworkId) => {
//   return contractNetworkId === 3 ? EthereumSwapRopsten : EthereumSwap
// }


const getWeb3Data = async () => {
  const web3 = await getWeb3()
  // Use web3 to get the user's accounts.
  // const accounts = await window.ethereum.enable()
  const account = (await web3.eth.getAccounts())[0];
  // for ganach networkId should be  5777
  const contractNetworkId = await web3.eth.net.getId();

  //checking which contract should be used and getting write json interface
  // const contractNetwork = getNetwork(contractNetworkId)
  // const EthereumSwap =  getContractInterface(contractNetworkId)

  const contractNetworkObject = EthereumSwap.networks[contractNetworkId];

  const contractAddress = contractNetworkObject.address

  const contract = new web3.eth.Contract(EthereumSwap.abi, contractNetworkObject && contractAddress)

  return {
  web3,
  account,
  contract,
  contractNetworkId,
  contractAddress,
  contractNetwork,
}

}

export default getWeb3Data;







