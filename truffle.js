const path = require("path");

module.exports = {

  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,  //using local ganach blockchain
      network_id: "*" // Match any network id
    }
  },
    compilers: {
    solc: {
      version: "0.4.25",
    }
  },
  //not sure if needed
  build: "webpack",
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/contractInterface")
};
