import Web3 from "web3";
import EthereumSwap from "../contractInterface/EthereumSwap.json";

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
          console.log('no erro');
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
        console.log("why");
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        resolve(web3);
      }

  });


const getWeb3Data = async () => {
  const web3 = await getWeb3()
  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  // for ganach networkId should be  5777
  const deployedNetwork = EthereumSwap.networks[networkId];

  const deployedContractAddress = deployedNetwork.address
  // console.log(deployedNetwork.address);
  const deployedContract = new web3.eth.Contract(EthereumSwap.abi, deployedNetwork && deployedContractAddress)
  console.log(deployedContract);
  // const deployedContract = await instance.deployed()
  return {web3, accounts, networkId, deployedNetwork, deployedContract, deployedContractAddress }

}

export default getWeb3Data;
