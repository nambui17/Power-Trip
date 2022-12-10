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

router.get('/', async (req,res) => {
  try {
    res.render('trip');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router;

