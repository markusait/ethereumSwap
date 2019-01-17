#  Ethereum Swap - [ethswap.digitpay.de](http://ethswap.digitpay.de)

Swap ETH for BTC

## Installation:

- `npm install && npm run client-install`
- `npm run build `  This will clean the project, compile the contracts, compile the Typescript, lint, run tests, then bundle everything into the dist folder

run server and client
```
npm run dev
```
Should spin up the Ethereum Bridge for local testing with oraclize 
- `npm start`
- Set up Metamask to run against your preferred network in the browser (if using ganache or truffle develop, configure custom RPC)
- open [http://localhost:3000](http://localhost:3000) in your Browser

To run contract via local testnet (Ganache):

- In one terminal window: `npm run start:ganache`
- In another terminal window: `npm run deploy:truffle`

Running Unit tests:

- Get ganache running as directed above
- Run `tsc watch` either from a command prompt or from Visual Studio Code
- Without the debugger from the console, `truffle test --network ganache`



## Using the Ethereum bridge for local Testing
```
npm install -g ethereum-bridge
ethereum-bridge -a 9 -H 127.0.0.1 -p 7545 --dev
```
more [info](https://github.com/oraclize/ethereum-bridge)
