const express = require('express');
const router = express.Router();
const {
  User,
  Destination,
  Trip,
  Companion,
  TripDestination,
  Image,
} = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');



router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      include: [{ model: Trip, include: Destination }],
    });
    const user = userData.get({ plain: true });
    //Gets all users except for the one logged in.
    const allUserData = await User.findAll({
      where: {
        id: {
          [Op.ne]: req.session.user_id,
        },
      },
    });
    const allUsers = allUserData.map((u) => u.get({ plain: true }));
    const destinationData = await Destination.findAll();
    const allDest = destinationData.map((destination) =>
      destination.get({ plain: true })
    );
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

router.get('/trip/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: Destination },
        { model: Image, limit: 9 },
        { model: User, attributes: ['username']}
      ],
    });
    const trip = tripData.get({ plain: true });
    const allUserData = await User.findAll({
      where: {
        id: {
          [Op.ne]: req.session.user_id,
        },
      },
    });
    const destinationData = await Destination.findAll();
    const allDest = destinationData.map((destination) =>
      destination.get({ plain: true })
    );
    const allUsers = allUserData.map((u) => u.get({ plain: true }));
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      include: [{ model: Trip, include: Destination }],
    });
    const u = userData.get({ plain: true });
    res.render('profiletrip', {
      trip,
      logged_in: true,
      allDest,
      allUsers,
      u
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
