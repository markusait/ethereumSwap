const path = require("path");
let HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = require('./config.js').mnemonic;

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, //using local ganach blockchain
      network_id: "*", // Match any network id
      from: "0xe87f722A65c55b7b625884c61d3B95030B6bef27"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/3cad50878c924727bcc2cc0fb99cf3960")
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.4.25",
    }
  },
  //not sure if needed
  // build: "webpack",
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contractInterface")
};
