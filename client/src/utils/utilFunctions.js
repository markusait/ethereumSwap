import axios from 'axios';
const weiDenomination = 1000000000000000000
const satoshiDenomination = 100000000
const stroopsDenomination = 10000000

const getCurrency = (code) => {
    code = ~~code
    switch (code) {
        case 0:
            return "Bitcoin"
        case 1:
            return "Lumens"
        default:
            return "Unkonwn Currency"
    }
}

const getDataForDB = (offerData) => {
    offerData.offerCurrency = getCurrency(offerData.stellar)
    offerData.offerOwnerAddress = offerData.account
    delete offerData.stellar
    delete offerData.contract
    delete offerData.account
    delete offerData.web3
    return offerData
}

const getPrices = async (currency, vsCurrency) => {
    const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${vsCurrency}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    let price = response['data'][currency][vsCurrency]
    if (currency === 'ethereum') price /= weiDenomination
    if (currency === 'stellar') price /= stroopsDenomination
    if (currency === 'bitcoin') price /= satoshiDenomination
    return price
}

const hasPriorTransactions = async (cryptoaddress, currency) => {
    let response
    switch(currency){
        case 'bitcoin':
            response = await axios.get(
                `https://api.blockcypher.com/v1/btc/main/addrs/${cryptoaddress}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            //Debug
            console.log(response['data']['n_tx'] >= '1')
            return false

            case 'stellar':
            response = await axios.get(
                `https://horizon.stellar.org/accounts/${cryptoaddress}/transactions`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            //Debug
            console.log(response['_embedded']['records'].length > 1)
            return false;
        default:
            return false
    }
}

export {
    getPrices,
    weiDenomination,
    satoshiDenomination,
    stroopsDenomination,
    getDataForDB,
    hasPriorTransactions
}
