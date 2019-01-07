module.exports = {

  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,  //using local ganach blockchain
      network_id: "*" // Match any network id
    }
  }
  //not sure if needed
   build: "webpack",
  //not sure if needd
  //  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};
