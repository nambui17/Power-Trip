const express = require('express');
const router = express.Router();
const { Destination } = require('../../models');

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinationData = await Destination.findAll();
    res.status(200).json(destinationData);
    // const destinations = destinationData.map((destination) => destination.get({plain: true}));
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single destination
router.get('/:id', async (req, res) => {
  try {
    const destinationData = await Destination.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(destinationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create destination
router.post('/:id', async (req, res) => {
  try {
    const destinationData = await Destination.create(req.body);
    res.status(200).json(destinationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update destination rating
router.put('/:id', async (req, res) => {
  try {
    const destinationData = await Destination.update(
      {
        rating: req.body.rating,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(destinationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete destination
router.delete('/:id', async (req, res) => {
  try {
    const destinationData = await Destination.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(destinationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
