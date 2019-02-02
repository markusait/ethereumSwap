const path = require("path");
// const HDWalletProvider = require("truffle-hdwallet-provider");
// const mnemonic = require('./config.js').mnemonic;
// const infuraAPIKey = require('./config.js').infuraAPIKey;

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, //using local ganach blockchain
      network_id: "*" // Match any network id
    }
    //for Ropsten add the mnemonic and Infura API key to config file
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infuraAPIKey}`)
    //   },
    //   network_id: 3
    // }
  },
  compilers: {
    solc: {
      version: "0.4.25",
    }
  },
  // webpckConfig see  <http://truffleframework.com/docs/advanced/configuration>
  // build: "webpack",
  contracts_build_directory: path.join(__dirname, "client/src/contractInterface")
};
