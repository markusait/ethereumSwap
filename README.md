#  Ethereum Swap - [ethswap.digitpay.de](http://ethswap.digitpay.de)

Build your own descentralized market place and swap Ether for any Cryptocurrency you like!
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
