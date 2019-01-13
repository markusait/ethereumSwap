import axios from 'axios';


// export const getOffers = async () => {
//   try {
//     console.log(response);
//     axios.get('/api/items').then(res =>
//       dispatch({
//         type: GET_ITEMS,
//         payload: res.data
//       })
//     );
//
//   } catch (e) {
//     console.error(e)
//   }
// };

export const addOffer = async (offer) => {
  try {
    console.log(offer);
    const response = await axios.post('/api/items', offer)
    console.log(response);
  } catch (e) {
    console.error(e)
  }
}
