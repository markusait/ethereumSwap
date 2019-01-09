pragma solidity ^0.4.0;//please import oraclizeAPI_pre0.4.sol when solidity < 0.4.0

contract OraclizeI {
    address public cbAddress;
    function query(uint _timestamp, string _datasource, string _arg) payable returns (bytes32 _id);
    function query_withGasLimit(uint _timestamp, string _datasource, string _arg, uint _gaslimit) payable returns (bytes32 _id);
    function query2(uint _timestamp, string _datasource, string _arg1, string _arg2) payable returns (bytes32 _id);
    function query2_withGasLimit(uint _timestamp, string _datasource, string _arg1, string _arg2, uint _gaslimit) payable returns (bytes32 _id);
    function getPrice(string _datasource) returns (uint _dsprice);
    function getPrice(string _datasource, uint gaslimit) returns (uint _dsprice);
    function useCoupon(string _coupon);
    function setProofType(byte _proofType);
    function setConfig(bytes32 _config);
    function setCustomGasPrice(uint _gasPrice);
}
contract OraclizeAddrResolverI {
    function getAddress() returns (address _addr);
}
contract usingOraclize {
    uint constant day = 60*60*24;
    uint constant week = 60*60*24*7;
    uint constant month = 60*60*24*30;
    byte constant proofType_NONE = 0x00;
    byte constant proofType_TLSNotary = 0x10;
    byte constant proofStorage_IPFS = 0x01;
    uint8 constant networkID_auto = 0;
    uint8 constant networkID_mainnet = 1;
    uint8 constant networkID_testnet = 2;
    uint8 constant networkID_morden = 2;
    uint8 constant networkID_consensys = 161;

    OraclizeAddrResolverI OAR;

    OraclizeI oraclize;
    modifier oraclizeAPI {
        if(address(OAR)==0) oraclize_setNetwork(networkID_auto);
        oraclize = OraclizeI(OAR.getAddress());
        _;
    }
    modifier coupon(string code){
        oraclize = OraclizeI(OAR.getAddress());
        oraclize.useCoupon(code);
        _;
    }

    function oraclize_setNetwork(uint8 networkID) internal returns(bool){
        if (getCodeSize(0x1d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed)>0){ //mainnet
            OAR = OraclizeAddrResolverI(0x1d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed);
            return true;
        }
        if (getCodeSize(0xc03a2615d5efaf5f49f60b7bb6583eaec212fdf1)>0){ //ropsten testnet
            OAR = OraclizeAddrResolverI(0xc03a2615d5efaf5f49f60b7bb6583eaec212fdf1);
            return true;
        }
        if (getCodeSize(0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf)>0){ //ether.camp ide
            OAR = OraclizeAddrResolverI(0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf);
            return true;
        }
        if (getCodeSize(0x93bbbe5ce77034e3095f0479919962a903f898ad)>0){ //norsborg testnet
            OAR = OraclizeAddrResolverI(0x93bbbe5ce77034e3095f0479919962a903f898ad);
            return true;
        }
        if (getCodeSize(0x51efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa)>0){ //browser-solidity
            OAR = OraclizeAddrResolverI(0x51efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa);
            return true;
        }
        return false;
    }

    function __callback(bytes32 myid, string result) {
        __callback(myid, result, new bytes(0));
    }
    function __callback(bytes32 myid, string result, bytes proof) {
    }

    function oraclize_getPrice(string datasource) oraclizeAPI internal returns (uint){
        return oraclize.getPrice(datasource);
    }
    function oraclize_getPrice(string datasource, uint gaslimit) oraclizeAPI internal returns (uint){
        return oraclize.getPrice(datasource, gaslimit);
    }

    function oraclize_query(string datasource, string arg) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource);
        if (price > 1 ether + tx.gasprice*200000) return 0; // unexpectedly high price
        return oraclize.query.value(price)(0, datasource, arg);
    }
    function oraclize_query(uint timestamp, string datasource, string arg) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource);
        if (price > 1 ether + tx.gasprice*200000) return 0; // unexpectedly high price
        return oraclize.query.value(price)(timestamp, datasource, arg);
    }
    function oraclize_query(uint timestamp, string datasource, string arg, uint gaslimit) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource, gaslimit);
        if (price > 1 ether + tx.gasprice*gaslimit) return 0; // unexpectedly high price
        return oraclize.query_withGasLimit.value(price)(timestamp, datasource, arg, gaslimit);
    }
    function oraclize_query(string datasource, string arg, uint gaslimit) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource, gaslimit);
        if (price > 1 ether + tx.gasprice*gaslimit) return 0; // unexpectedly high price
        return oraclize.query_withGasLimit.value(price)(0, datasource, arg, gaslimit);
    }
    function oraclize_query(string datasource, string arg1, string arg2) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource);
        if (price > 1 ether + tx.gasprice*200000) return 0; // unexpectedly high price
        return oraclize.query2.value(price)(0, datasource, arg1, arg2);
    }
    function oraclize_query(uint timestamp, string datasource, string arg1, string arg2) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource);
        if (price > 1 ether + tx.gasprice*200000) return 0; // unexpectedly high price
        return oraclize.query2.value(price)(timestamp, datasource, arg1, arg2);
    }
    function oraclize_query(uint timestamp, string datasource, string arg1, string arg2, uint gaslimit) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource, gaslimit);
        if (price > 1 ether + tx.gasprice*gaslimit) return 0; // unexpectedly high price
        return oraclize.query2_withGasLimit.value(price)(timestamp, datasource, arg1, arg2, gaslimit);
    }
    function oraclize_query(string datasource, string arg1, string arg2, uint gaslimit) oraclizeAPI internal returns (bytes32 id){
        uint price = oraclize.getPrice(datasource, gaslimit);
        if (price > 1 ether + tx.gasprice*gaslimit) return 0; // unexpectedly high price
        return oraclize.query2_withGasLimit.value(price)(0, datasource, arg1, arg2, gaslimit);
    }
    function oraclize_cbAddress() oraclizeAPI internal returns (address){
        return oraclize.cbAddress();
    }
    function oraclize_setProof(byte proofP) oraclizeAPI internal {
        return oraclize.setProofType(proofP);
    }
    function oraclize_setCustomGasPrice(uint gasPrice) oraclizeAPI internal {
        return oraclize.setCustomGasPrice(gasPrice);
    }
    function oraclize_setConfig(bytes32 config) oraclizeAPI internal {
        return oraclize.setConfig(config);
    }

    function getCodeSize(address _addr) constant internal returns(uint _size) {
        assembly {
            _size := extcodesize(_addr)
        }
    }


    function parseAddr(string _a) internal returns (address){
        bytes memory tmp = bytes(_a);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint i=2; i<2+2*20; i+=2){
            iaddr *= 256;
            b1 = uint160(tmp[i]);
            b2 = uint160(tmp[i+1]);
            if ((b1 >= 97)&&(b1 <= 102)) b1 -= 87;
            else if ((b1 >= 48)&&(b1 <= 57)) b1 -= 48;
            if ((b2 >= 97)&&(b2 <= 102)) b2 -= 87;
            else if ((b2 >= 48)&&(b2 <= 57)) b2 -= 48;
            iaddr += (b1*16+b2);
        }
        return address(iaddr);
    }


    function strCompare(string _a, string _b) internal returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
   }

    function indexOf(string _haystack, string _needle) internal returns (int)
    {
        bytes memory h = bytes(_haystack);
        bytes memory n = bytes(_needle);
        if(h.length < 1 || n.length < 1 || (n.length > h.length))
            return -1;
        else if(h.length > (2**128 -1))
            return -1;
        else
        {
            uint subindex = 0;
            for (uint i = 0; i < h.length; i ++)
            {
                if (h[i] == n[0])
                {
                    subindex = 1;
                    while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex])
                    {
                        subindex++;
                    }
                    if(subindex == n.length)
                        return int(i);
                }
            }
            return -1;
        }
    }

    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string _a, string _b, string _c) internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string _a, string _b) internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }

    // parseInt
    function parseInt(string _a) internal returns (uint) {
        return parseInt(_a, 0);
    }

    // parseInt(parseFloat*10^_b)
    function parseInt(string _a, uint _b) internal returns (uint) {
        bytes memory bresult = bytes(_a);
        uint mint = 0;
        bool decimals = false;
        for (uint i=0; i<bresult.length; i++){
            if ((bresult[i] >= 48)&&(bresult[i] <= 57)){
                if (decimals){
                   if (_b == 0) break;
                    else _b--;
                }
                mint *= 10;
                mint += uint(bresult[i]) - 48;
            } else if (bresult[i] == 46) decimals = true;
        }
        if (_b > 0) mint *= 10**_b;
        return mint;
    }

    function uint2str(uint i) internal returns (string){
        if (i == 0) return "0";
        uint j = i;
        uint len;
        while (j != 0){
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (i != 0){
            bstr[k--] = byte(48 + i % 10);
            i /= 10;
        }
        return string(bstr);
    }



}
// </ORACLIZE_API>
//   for (uint i=0; i< 10; i++) {
//         uint goalsHT = parseInt(goalsHT_string)
//         if(output[i].value === 100000 && output[i].addresses[0] === ){
//         console.log('found')
//         }
//         console.log('nope')
// })

//they are using uints to store the necessary info strConcat
//https://github.com/oraclize/ethereum-examples/blob/master/solidity/truffle-examples/bitcoin-balance/contracts/BitcoinAddressExample.sol
//


contract EthereumBridge is usingOraclize {

  // uint public bitcoinWithdrawAmount;
  // string public bitcoinWithdrawAddress;
  struct Offer {
      bool exsists;
      string ethDepositInWei;
      string bitcoinWithdrawAmount;
      address potentialPayoutAddress;
      bytes32 oraclizeID;
    }
  //checking payout with the string bitcoinAddress as key (solidity uses a sha3 hashmap)
  mapping(string => Offer) deposit;
  //checking oraclize
  mapping(bytes32 => string) oraclizeLookup;

  //oraclize ID?
  // event payedOutEvent(
  //       address indexed _winner,
  //       uint indexed _winnerId
  // );
  // Constructor only used in testing for Oraclize Bridge
  function EthereumBridge() public {
        // owner = msg.sender;
        // emit LogUpdate(owner, address(this).balance);
        // Replace the next line with your version:
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        // oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        // update();
      }

  // Deposited by sender of the bitcoin assigning the contract values
  // depositing eth in contract with outputAddress and the needed amount in Satoshi for which eth can withdrawed
  function depositEther(string _bitcoinAddress, string _bitcoinAmountinSatoshi) payable public {
      // checking for duplicate key in mapping
      // Omit this when developing for better testing
      // require(!deposit[_bitcoinAddress].exsists);
      Offer memory paymentStruct = Offer({
                                  exsists:true,
                                  ethDepositInWei:uint2str(msg.value),
                                  bitcoinWithdrawAmount:_bitcoinAmountinSatoshi,
                                  potentialPayoutAddress: None,
                                  oraclizeID: stringToBytes32("0")}); //fix this
      deposit[_bitcoinAddress] = paymentStruct;
  }

  //Bitcoin sender calls this function with his tx_hash and ricipientAddress which will invoke call back function
  // make sure you take a new bitcoin address that does not have any past transactions so far
  //payable because oraclize call
  function getTransaction(string _txHash, string _bitcoinAddress) payable {
    //should require tx.hash.length == 64 or bytes(str).length ==
    //require that it has been created or not payed out yet
    require(deposit[_bitcoinAddress].exsists);
    //calling Oraclize API and assiging the right ID
    // if (oraclize_getPrice("URL") > address(this).balance) {
    //   // emit LogInfo("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
    // } else {
      // emit LogInfo("Oraclize query was sent, standing by for the answer..");
      string memory query = strConcat("https://blockchain.info/q/txresult/", _txHash, "/", _bitcoinAddress);
      bytes32 oraclizeID = oraclize_query("URL", query, 500000);
      // assigning the message sender as potential payout
      deposit[_bitcoinAddress].potentialPayoutAddress = msg.sender;
      //could use for double checking
      deposit[_bitcoinAddress].oraclizeID = oraclizeID;
      //making sure it can be looked up
      oraclizeLookup[oraclizeID] = _bitcoinAddress;
    // }
  }

  //Oraclize call back function invoking payout process
  //change result to payed Amount
  function __callback(bytes32 _oraclizeID, string _result) {
    string memory bitcoinAddress = oraclizeLookup[_oraclizeID];
    // address recipientAddress = deposit[bitcoinAddress].potentialPayoutAddress;
    //testing
    address recipientAddress = 0xc68598cd56FAf5896b7D7bAb0DE5545D1E9bd90E;
    uint amount = stringToUint(deposit[bitcoinAddress].ethDepositInWei);
    //only Oraclize allowed
    require(msg.sender == oraclize_cbAddress());
    //check if correct
    // require(_checkCallback(_oraclizeID, _result));
    require(stringToUint(_result) >= stringToUint(deposit[bitcoinAddress].bitcoinWithdrawAmount));
    //initialize payout
    recipientAddress.transfer(amount);
    // _withdrawToRecipient(deposit[bitcoinAddress].ethDepositInWei, deposit[bitcoinAddress].potentialPayoutAddress);
    //emit event here
  }

  //@edit maybe include in __callback function to save gas
  //if API Result is correct payout the Bitcoin sender
  // function _checkCallback(bytes32 _oraclizeID, string _payedAmount) internal returns (bool){
  //   string memory bitcoinAddress = oraclizeLookup[_oraclizeID];
  //   // can be omitted:  require(deposit[bitcoinAddress].exsists);
  //   //checking the amount payed which oracle got from API is at least the requested minimum payout Amount
  //   require(stringToUint(_payedAmount) >= stringToUint(deposit[bitcoinAddress].bitcoinWithdrawAmount));
  //   // deposit[bitcoinAddress].exsists == false; would make reusable but leaving out for now
  //
  //   //payout will be initialized
  //   // _withdrawToRecipient(deposit[bitcoinAddress].ethDepositInWei, deposit[bitcoinAddress].potentialPayoutAddress);
  //   return true;
  // }
  //
  // //Finally withdrawing the right amount
  // function _withdrawToRecipient(string _amount, address _recipientAddress) internal {
  //   _recipientAddress.transfer(stringToUint(_amount));
  // }

  /* HELPER FUNCTIONS */
  uint80 constant None = uint80(0);

  //setter and getter for mapping
  function stringToBytes32(string memory source) returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
}

  function stringToUint(string s) constant returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }
  //oraclize json
  // string memory query = strConcat("json(https://api.blockcypher.com/v1/btc/main/txs/", txHash, ").confidence");
}
