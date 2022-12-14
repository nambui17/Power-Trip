const express = require('express');
const router = express.Router();
const { Image, User, Trip, Destination} = require('../models');
const { Op, Sequelize } = require('sequelize');


router.get('/', async (req, res) => {
  try {
    const imageData = await Image.findAll({
      attributes: ['image_url'],
      order: [Sequelize.fn('RAND'),],
      limit: 5
    });
    const randImages = imageData.map((image) => image.get({ plain: true }));
    let renderObj;
    if (req.session.logged_in) {
      const userData = await User.findOne({
        where: {
          id: req.session.user_id
        }
      });
      const user = userData.get({plain: true});
      renderObj = {
        logged_in: req.session.logged_in,
        randImages,
        user
      };
    } else {
      renderObj = {
        logged_in: req.session.logged_in,
        randImages
      };
    }
    res.render('homepage', renderObj);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to the login page
router.get('/login', (req, res) => {
  res.render('login', {
    logged_in: req.session.logged_in
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    logged_in: req.session.logged_in
  });
});

router.get('/trip:id', async (req,res) => {
  try {
    const tripData = await Trip.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: Destination},
        {model: Image, attributes: ['image_url']}
      ]
    });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
