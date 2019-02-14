const express = require('express');
const router = express.Router();
const Offer = require('../../models/Offer');


// @route   GET api/offers
// @desc    Get All Offers
// @access  Public
router.get('/', (req, res) => {
  Offer.find()
    .sort({
      date: -1
    })
    .then(offers => res.json(offers));
});


// @route   POST api/offers
// @desc    Create An Offer
// @access  Public
router.post('/', (req, res) => {
  const newOffer = new Offer(req.body)
  console.log("getting offer")
  console.log(req.body)
  newOffer.save()
    .then(offer => res.json(offer))
    .catch(e => {
      res.json(e)
      console.error(e)
    });
});
// @route   PUT api/offers/:id
// @desc    Update an Offer
// @access  Public
router.put('/:id', function(req, res) {
  const query = {
    '_id': req.params.id
  }
  // const updateData = {
  //   payedOut,
  //   payedOutTransactionHash,
  //   recipientAddress
  // } = req.body
  console.log(req.body);
  Offer.findOneAndUpdate(query, req.body, {
    upsert: true
  }, (err, doc) => {
    if (err) return res.status(404).json({
      success: false
    });
    return res.json({
      success: true
    });
  });
})

// @route   DELETE api/offers/:id
// @desc    Delete A Offer
// @access  Public
router.delete('/', (req, res) => {
  Offer.remove({}, (err) => {
    if(err) console.log(err);
    res.json({success: true})
  })
});


module.exports = router;
