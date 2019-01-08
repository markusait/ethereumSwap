//Compile Contract
truffle migrate --reset
//open truffle console in same project dir
truffle console
//Getting a copy of the smart contract asynchronously (app = LendingClub.deploy() does not work )
LendingClub.deployed().then((instance) => {app = instance})
//Using web3!!! in truffle console
web3.eth.getAccounts(function(e,a) { accounts=a; });

app.setContractDetails([accounts[0],accounts[1]],100000,1).then((instance) => {console.log(instance)}).catch(e => console.log(e))

//getting state vars from the getter function
app.amountPerPerson().then((amount) => {value = amount.toString()})
//Start here for new round
//depositing from participant address
app.deposit({from: accounts[0],value: value,gasPrice: '30',gas: 6063911}).then((instance) => {console.log(instance)}).catch(e => console.log(e))
app.deposit({from: accounts[1],value: value,gasPrice: '30',gas: 6063911}).then((instance) => {console.log(instance)}).catch(e => console.log(e))


//checking
app.numParticipantsPayed().then((amount) => {console.log(amount.toString())}).then((res) => {console.log(res)}).catch(e => console.log(e))


// initializing payment process
app.initializePayoutProcess().then((instance) => {console.log(instance)}).catch(e => console.log(e))

//getting balance
web3.eth.getBalance(app.address, function(err,res) {console.log(res.toString(10))});

//see if there are less winners 1 should lead to error if 2 addresses defined
app.potentialWinners(1)
// see if new round was set effectively
app.amountPayed(accounts[0])



---
//Addtional



//address
app.address

//getting candidates cause mapping getter func requires id
app.contractParticipants(1)


// because EVM cannot deal with struct we have to access it like this (and also truffle console no var store)
 //getting name
app.candidates(1).then(function(c) {console.log(c[1])})
//getting vote count
app.candidates(1).then(function(c) {console.log(c[2].toNumber())})
