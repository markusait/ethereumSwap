#  Ethereum Swap - [ethswap.digitpay.de](http://ethswap.digitpay.de)

Swap ETH for BTC

## Installation:

- `npm install && npm run client-install`


- `npm run build `  This will clean the project, compile the contracts, compile the Typescript, lint, run tests, then bundle everything into the dist folder
run server and client


-`ǹpm start` should start back and front end and ethereum bridge






```
npm run dev
```
Should spin up the Ethereum Bridge for local testing with oraclize
- `npm start`
- Set up Metamask to run against your preferred network in the browser (if using ganache or truffle develop, configure custom RPC)
- open [http://localhost:3000](http://localhost:3000) in your Browser

To run contract via local testnet (Ganache):

- In one terminal window: `npm run start:ganache`
- In second terminal window: `ethereum-bridge -a 9 -H 127.0.0.1 -p 7545 --dev`
  (you can also install it globally and run it npm install -g ethereum-bridge)
  more [info](https://github.com/oraclize/ethereum-bridge)
- In another terminal window: `npm run deploy:truffle` (truffle migrate --reset)

## Local Testing

- Get ganache running as directed above
- Without the debugger from the console, `truffle test --network ganache`


## Deploying to server

using pm2 and nginx

pm2 start server.js

nginx config:
