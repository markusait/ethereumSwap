import * as v from './variables'
import homePageStyles from './homePageStyles'

// const sharedStyles = {
//   container: {
//     flex: 1,
//     backgroundColor: v.bgColor,
//   },
// }

export default EStyleSheet.create({
  ...sharedStyles,
  ...headerStyles,
  ...homeStyles,
  ...typerStyles,
  ...chooserStyles,
  ...qrStyles,
  ...transactionListStyles,
})
