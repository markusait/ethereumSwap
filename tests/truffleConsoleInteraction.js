//Compile Contract
truffle migrate --reset
//open truffle console in same project dir
truffle console
//Getting a copy of the smart contract asynchronously (app = EthereumBridge.deploy() does not work )
EthereumBridge.deployed().then((instance) => {app = instance})
//Using web3!!! in truffle console
web3.eth.getAccounts(function(e,a) { accounts=a; });
//sending amount to contract
app.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525", {from:accounts[0],value: 1000000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))

web3.eth.getBalance(app.address)


app.getTransaction("b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1","3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9", {from:accounts[0],value: 500000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))


//test
app.ping.call(1)

// for big numbers use .toNumber()
