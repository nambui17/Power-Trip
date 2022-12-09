const express = require('express');
const router = express.Router();
const {
  User,
  Destination,
  Trip,
  Companion,
  TripDestination,
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
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

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      include: [{ model: Trip, include: Destination }],
    });
    const user = userData.get({plain: true});
    const trips = user.trips;
    const destinations = trips.destinations;
    res.render('profile', {
      user,
      trips,
      destinations,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
