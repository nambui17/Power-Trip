const express = require('express');
const router = express.Router();
const { Image } = require('../../models');

// Get all images
router.get('/', async (req, res) => {
  try {
    const imageData = await Image.findAll();
    res.status(200).json(imageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single image
router.get('/:id', async (req, res) => {
  try {
    const imageData = await Image.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(imageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create image
router.post('/', async (req, res) => {
  try {
    const imageData = await Image.create(req.body);
    res.status(200).json(imageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update image rating
router.put('/:id', async (req, res) => {
  try {
    const imageData = await Image.update(
      {
        image_url: req.body.image_url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(imageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete image
router.delete('/:id', async (req, res) => {
  try {
    const imageData = await image.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(imageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
