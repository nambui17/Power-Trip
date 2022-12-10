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
const { Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

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
    //Gets all users except for the one logged in.
    const allUserData = await User.findAll({
      where: {
        id: {
          [Op.ne]: req.session.user_id
        }
      }
    });
    const allUsers = allUserData.map((u) => u.get({plain:true}));
    const destinationData = await Destination.findAll();
    const allDest = destinationData.map((destination) => destination.get({plain: true}));
    const trips = user.trips;
    const destinations = trips.destinations;
    res.render('profile', {
      user,
      trips,
      destinations,
      allUsers,
      allDest,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
