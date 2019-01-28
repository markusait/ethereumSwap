#  Ethereum Swap - [ethswap.digitpay.de](http://ethswap.digitpay.de)
---
Build your own decentralized market place and swap Ether for any Cryptocurrency you like!

This App uses a Ethereum Smart Escrow Contract and Blockexplorer API lookups to exchange ether for Bitcoin and potentially to other currencies. The Offers displayed by this App are managed by an that uses [Oraclize](http://www.oraclize.it/) to make API calls.

The very principle is that users can proof to the smart contract that they have conducted the right form of payment which entitles them to receive the locked up Ether.

**Who you need to trust:**
- The smart contract itself, since it has not underwent security audits and should not be used in production
- The application server, to display the data correctly
- Oraclize services, you can find out more about them [here](http://www.oraclize.it/)
- Blockexplorer API, currently using Blockchain.info API (please note that downtime is not a problem because proof of tx can be submitted each time )

As of now the only possible option is to use the [Blockchain](https://blockchain.info/q/txresult/b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1/3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9) info API, which allows to look up the exact amount of a given Transaction to a Bitcoin Address. Please note that this is one major constrain of this approach. You should only use Addresses with no prior transactions and you should only use APIs that output the amount transfered as a single string or number. Any form of JSON Parsing will be expensive.


Theoretically, one could also swap real world currencies for Ether if buyer and seller agree upon a certain
Swap ETH for BTC

## Installation:

- `npm run client-install  && npm install`


- `cd client\ && npm run build `  This will clean the project, compile the contracts, compile the Typescript, lint, run tests, then bundle everything into the dist folder
run server and client

-`ǹpm start` should start the express Server on port 8080 and front end client on port 3020


Should spin up the Ethereum Bridge for local testing with oraclize
- `npm start`
- Set up Metamask to run against your preferred network in the browser (if using ganache or truffle develop, configure custom RPC)
- open [http://localhost:3000](http://localhost:3000) in your Browser

To run contract via local testnet (Ganache):

1. In one terminal window: `npm run start:ganache`
2. In second terminal window: `ethereum-bridge -a 9 -H 127.0.0.1 -p 7545 --dev`
3. It will mention to put this line in the constructor of your smart contract
`OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);`
instead put the ethereum address `0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475` (which will be a different one each time) into the config.js folder as `oraclizeConnectorAddress: 0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475` which is used in `2_deploy_contracts.js` for the constructor which truffle uses to migrate.
4. run `truffle migrate --reset` to deploy the contract to the blockchain

  (you can also install it globally and run it npm install -g ethereum-bridge)
  more [info](https://github.com/oraclize/ethereum-bridge)
- In another terminal window: `npm run deploy:truffle` (truffle migrate --reset)

## Local Testing

- Get ganache running as directed above
- Without the debugger from the console, `truffle test --network ganache`

## Deploying to server

build the client folder with `cd client && npm run build` using pm2 and nginx you can do
`pm2 start server.js` which will start both back and front end on Port 8080 or proccess.env port.

nginx config:
