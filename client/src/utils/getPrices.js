import axios from 'axios';
const weiDenomination = 1000000000000000000
const satoshiDenomination = 100000000
const stroopsDenomination = 10000000
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

export {
        getPrices,
        weiDenomination,
        satoshiDenomination,
        stroopsDenomination,
    }
