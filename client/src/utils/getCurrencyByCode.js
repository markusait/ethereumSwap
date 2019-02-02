const getCurrency = (code) => {
  switch(code){
    case 0:
      return "Bitcoin"
      break;
    case 1:
      return "Lumens"
      break;
    default:
      return "Unkonwn Currency"
  }
}

export default getCurrency;
