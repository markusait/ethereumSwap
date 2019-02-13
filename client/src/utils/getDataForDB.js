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


export default getDataForDB