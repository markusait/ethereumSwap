const express = require('express');
const router = express.Router();

// Offer Model
const Offer = require('../../models/Offer');

// @route   GET api/offers
// @desc    Get All Offers
// @access  Public
router.get('/', (req, res) => {
  // res.json({"hi":"hi"})
  Offer.find()
    .sort({ date: -1 })
    .then(offers => res.json(offers));
});

// @route   POST api/offers
// @desc    Create An Offer
// @access  Public
router.post('/', (req, res) => {
  const newOffer = new Offer({
    contractAddress: req.body.contractAddress,
    contractNetworkId: req.body.contractNetworkId,
    ownerAddress: req.body.ownerAddress,
    amountEth: req.body.amountEth,
    bitcoinAddress: req.body.bitcoinAddress,
    bitcoinAmount: req.body.bitcoinAmount,
    offerTxHash: req.body.offerTxHash,
    date: req.body.date
  });

  newOffer.save()
  .then(offer => res.json(offer))
  .catch(e => {
    res.json(e)
    console.error(e)
  });
});

// @route   DELETE api/offers/:id
// @desc    Delete A Offer
// @access  Public
// router.delete('/:id', (req, res) => {
//   Offer.findById(req.params.id)
//     .then(offer => offer.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
