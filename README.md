#  Ethereum Swap - [http://ethswap-backend.digitpay.de](http://ethswap-backend.digitpay.de)
---
## Quickstart

### Install prerequisites

1. Install the Truffle framework:

       npm install -g truffle

2. Install the Ganache CLI:

       npm install -g ganache-cli

3. Install Node

       npm install -g nodemon

4. Install the Ethereum bridge for testing

       npm install -g ethereum-bridge

5. Install the [MetaMask plugin](https://metamask.io/) for your web browser

### Install dependencies:

Finally you can install the dependencies

    npm run client-install  && npm install

Then create a `config.js` file with a [`mongoURI`](https://mlab.com/) & `oraclizeConnectorAddress`

(if you want to deploy to ropsten or mainnet also put your `mnemonic` and `infuraAPIKey` in there )

## Testing

You can skip step 1 to 3 by using the blockchain instance at http://ethblockchain.digitpay.de with this Private Key: d60984ec931d45517e170c1a1e48a9ca041a6b9803e4d7cebc1704d8f478b5d0.
Make sure to the correct host in the truffle.js when doing so.

1. Create a blockchain instance by using Ganache

        ganache-cli --accounts 10 --port 7545


2. Spin up the Ethereum Bridge for local testing with oraclize. Open a terminal window and run

        ethereum-bridge -a 9 -H 127.0.0.1 -p 7545 --dev


  It will mention to put this line in the constructor of your smart contract
  instead put the ethereum address (which will be a different one each time) into the config.js folder as `oraclizeConnectorAddress: 0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475` which is used in `2_deploy_contracts.js` for the constructor which truffle uses to migrate. You can also run the command with the `--oar` flag to use the same contract each time. More about ethreum-bridge [here](https://github.com/oraclize/ethereum-bridge)


3. Compile and deploy the contract to the blockchain. More info  [here](https://github.com/oraclize/ethereum-bridge)  

        truffle migrate --reset

4. Start the express API Server on port 8080 and the React front end client concurrently then open [http://localhost:3020](http://localhost:3000) in your Browser

        npm run dev

5. Set up Metamask to run against your preferred network in the browser (if using ganache or truffle develop, configure custom RPC)


## Deploying to server

- run tests with

          truffle test
- build the client folder with

      cd client && npm run build

- using pm2 and nginx you can start both back and front end on Port 8080 or proccess.env port with

      pm2 start server.js

nginx config:

---
##Description

This App uses a Ethereum Smart Escrow Contract and Blockexplorer API lookups to exchange ether for Bitcoin and potentially to other currencies. The Offers displayed by this App are managed by an that uses [Oraclize](http://www.oraclize.it/) to make API calls.

The very principle is that users can proof to the smart contract that they have conducted the right form of payment which entitles them to receive the locked up Ether.

**Who you need to trust:**
- The smart contract itself, since it has not underwent security audits and should not be used in production
- The application server, to display the data correctly
- Oraclize services, you can find out more about them [here](http://www.oraclize.it/)
- Blockexplorer API, currently using Blockchain.info API (please note that downtime is not a problem because proof of tx can be submitted each time )

The smart contract uses the  [Blockchain Info APi](https://blockchain.info/q/txresult/b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1/3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9) which allows to look up the exact amount of a given Transaction to a Bitcoin Address as a String. But any public API can be used but be aware that any form of JSON Parsing will cost alot of gas and hence be expensive.

Theoretically, one could also swap real world currencies for Ether if buyer and seller agree upon a certain way to proof this to the contract.
