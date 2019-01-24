//Compile Contract
truffle migrate --reset
//open truffle console in same project dir
truffle console
//Getting a copy of the smart contract asynchronously (app = EthereumBridge.deploy() does not work )
EthereumSwap.deployed().then((instance) => {app = instance})
const instance = new web3.eth.Contract(JSON.parse(JSON.stringify(app.abi),app.address));
//Using web3!!! in truffle console
web3.eth.getAccounts(function(e,a) { accounts=a; });
//sending amount to contract
instance.options.address = app.address

offer = {tx: "d04f8780b597a5e2630d2fdcb954446d546d3a5a2df881d11237abde0f1dd4ee",
      address: "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX",
      amount: 143500
}

instance.methods.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9",615525).send({from:accounts[0],value: 1000000000000000000, gas: 1500000}).then((res) => {console.log(res.events)}).catch(e => console.log(e))

instance.methods.getOraclizePrice().call()



instance.methods.getTransaction("b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1","3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9").send({from:accounts[0],value: 500000000000000000, gas: 1500000}).then((res) => {console.log(res.events)}).catch(e => console.log(e))




// listen for events
instance.events.LogInfo({fromBlock: 0, toBlock: 'latest'}).on('data', (event) => {console.log(event)}).on('changed', (event) =>{console.log(event)}).on('error', (error) =>{ console.error(error)});

instance.events.PayedOutEvent({fromBlock: 0, toBlock: 'latest'}).on('data', (event) => {console.log(event)}).on('changed', (event) =>{console.log(event)}).on('error', (error) =>{ console.error(error)});

//pure truffle web3 (old version )
app.depositEther("3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9","615525", {from:accounts[0],value: 1000000000000000000, gas: 1500000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))

app.getTransaction("b1ddc46ad47f6f95d75129281b22636d5b19a06bcf534305b018fd8e688265e1","3GZSJ47MPBw3swTZtCTSK8XeZNPed25bf9", {from:accounts[0],value: 500000000000000000}).then((instance) => {console.log(instance)}).catch(e => console.log(e))






web3.eth.getBalance(app.address)
web3.eth.getBalance("0x75d79a33B620f1769631E66A3021fDdF34B45DfD")

// app.methods.getTestingOraclizeId().call(function(err, res){console.log(res)})

app.methods['getTestingOraclizeAddress()'].call()
app.methods['getTest()'].call()
app.methods['getOraclizePrice()'].call()

app.methods['getOraclizePrice()'].call().then(res=>console.log(res.toString()))



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
