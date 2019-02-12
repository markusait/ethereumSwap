const getCurrency = (code) => {
  switch(code){
    case 0:
      return "Bitcoin"
    case 1:
      return "Lumens"
    default:
      return "Unkonwn Currency"
  }
}

export default getCurrency;
