#  Ethereum Swap - [http:/etherswaps.co](http://etherswaps.co)
---
A smart contract decentralized Exchange build with React
![Market](/client/src/assets/EtherswapsMarketGrid.png)

## Quickstart

### Install prerequisites

1. Install the Truffle framework, Ganache CLI and Ethereum Bridge

       npm install -g truffle ganache-cli ethereum-bridge

2. Install the [MetaMask plugin](https://metamask.io/) for your web browser

### Install dependencies:

Finally you can install the dependencies

    npm run full-install

Then create a `config.js` file with a [`mongoURI`](https://mlab.com/) & `oraclizeConnectorAddress` like this

    module.exports = {
      mongoURI: "",
      oraclizeConnectorAddress: ""
    }


(if you want to deploy to ropsten or mainnet also put your `mnemonic` and `infuraAPIKey` in there )

## Testing

The app uses two development servers. A backend server for the API which will also serve the static pages. And a react-development server based on webpack which is why the client folder has its own node_modules

ethereumSwap

    ├── client
    │   ├── public
    │   └── src
    │       ├── assets
    │       ├── components
    │       ├── node_modules
    │       ├── styles
    │       └── utils
    ├── contracts
    ├── migrations
    ├── models
    ├── node_modules
    ├── routes
    │   └── api
    └── test

You can skip step 1 to 3 by using the blockchain instance at http://ethblockchain.digitpay.de with this Private Key: d60984ec931d45517e170c1a1e48a9ca041a6b9803e4d7cebc1704d8f478b5d0.
Make sure to the correct host in the truffle.js when doing so.

1. Create a blockchain instance by using Ganache

        ganache-cli --accounts 10 --port 7545


2. Spin up the Ethereum Bridge for local testing with oraclize. Open a terminal window and run the following command. Then copy the OAR address in the `config.js` file as such: `oraclizeConnectorAddress: 0xyourOARAddress`. You can also run the command with the `--oar` flag to use the same connector contract each time. More about ethreum-bridge [here](https://github.com/oraclize/ethereum-bridge)

        ethereum-bridge -a 9 -H 127.0.0.1 -p 7545 --dev
        #or if not installed globally
        node bridge -a 9 -H 127.0.0.1 -p 7545 --dev

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

        upstream example.com {
                server 127.0.0.1:8080;
                keepalive 8;
        }
        server {
                listen 80;
                server_name example.com;

        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;
                proxy_pass http://example.com;
                proxy_redirect off;
                }
        }
---
## Overview

![Overview](/client/src/assets/overview.png)

As you can see the way this exchange works is that Bob locks up his Ether in a smart contract. Alice sees that Offer in the Marketplace and pays the equivalent amount to Bob's Bitcoin address. After that she submits the transaction hash to the smart contract which conducts and [Oraclize](http://www.oraclize.it/) API call to check if the transaction is valid. If the submitted amount is >= Bob's minimum value (of 1 BTC here) the smart contract sends the funds to Alice.

The very principle is that **users can proof to the smart contract** that they have conducted the right form of payment which entitles them to receive the locked up Ether. Theoretically, one could also swap real world currencies for Ether or any other ERC20 Token. Any public API can be used for this lookup but one should be aware that any form of JSON Parsing will cost alot of gas and hence will be expensive.

__Who users need to trust__

Of cause this service is also not completely trust less. There are 4 parties a user who exchanges value has to trust:
1. Oraclize services to display the data correctly, you can find out more about them [here](https://ethereum.stackexchange.com/questions/2/how-can-an-ethereum-contract-get-data-from-a-website/2336#2336)
2. The Blockexplorer API, the contract is currently using Blockchain.info API (please note that downtime is not a problem because proof of TX can be submitted at anytime)
3. The smart contract itself, since it has not underwent security audits and should not be used in production
4. The application server, to display the data correctly

__Further Development and Features__

- [x] BTC USD preis sync in input field
- [x] Implement redeem option for offer creator in smart contract
- [x] Implement prior transaction lookup
- [ ] Implement redeem option for offer creator in front-end
- [ ] Using ipfs to store the smart contract data
- [ ] Enhance Security
  - [ ] Apply Open zepplin audit tools
  - [ ] More detailed Tests
  - [ ] Guaranteeing Atomicity and Real Time data to avoid that a contracts are payed out too early
