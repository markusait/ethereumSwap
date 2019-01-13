//Compile Contract
truffle migrate --reset
//open truffle console in same project dir
truffle console
//Getting a copy of the smart contract asynchronously (app = EthereumBridge.deploy() does not work )
EthereumSwap.deployed().then((instance) => {app = instance})
//Using web3!!! in truffle console
web3.eth.getAccounts(function(e,a) { accounts=a; });
//sending amount to contract
app.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525", {from:accounts[0],value: 1000000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))

web3.eth.getBalance(app.address)

// app.methods.getTestingOraclizeId().call(function(err, res){console.log(res)})

app.methods['getTestingOraclizeAddress()'].call()
app.methods['getTest()'].call()


app.getTransaction("b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1","3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9", {from:accounts[0],value: 500000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))

//binding event to check bug
let LogInfo = app.LogInfo({_sender: accounts[0]})
LogInfo.watch((err, result) => { console.log(result.args) })
app.contract.events.PayedOutEvent()



app.LogInfo({}, function(error, event){ console.log(event); }).on('data', function(event){console.log(event)}).on('changed', function(event){}).on('error', console.error);










web3.eth.getBalance(app.address)

//testing gas usage
// using the promise
app.myMethod(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.then(function(gasAmount){
    ...
})
.catch(function(error){
    ...
});



//test
app.ping.call(1)

// for big numbers use .toNumber()
