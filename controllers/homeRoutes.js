const express = require('express');
const router = express.Router();
const { Image } = require('../models');
const withAuth = require('../utils/auth');
const { Op, Sequelize } = require('sequelize');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  try {
    const imageData = await Image.findAll({
      attributes: ['image_url'],
      order: [Sequelize.fn('RAND'),],
      limit: 5
    });
    const randImages = imageData.map((image) => image.get({ plain: true }));
    res.render('homepage', {
      logged_in: req.session.logged_in,
      randImages
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to the login page
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
