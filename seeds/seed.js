const sequelize = require('../config/connection');
const {
  User,
  Destination,
  Trip,
  Companion,
  TripDestination,
  Image,

} = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const destinationData = require('./destinationData.json');
const companionData = require('./companionData.json');
const tripDestinationData = require('./tripDestinationData.json');
const imageData = require('./imageData.json');

async function seedDatabase() {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const destinations = await Destination.bulkCreate(destinationData, {
    individualHooks: true,
    returning: true,
  });
  const trips = await Trip.bulkCreate(tripData, {
    individualHooks: true,
    returning: true,
  });
  const companions = await Companion.bulkCreate(companionData, {
    individualHooks: true,
    returning: true,
  });
  const tripDestinations = await TripDestination.bulkCreate(
    tripDestinationData,
    {
      individualHooks: true,
      returning: true,
    }
  );
  const images = await Image.bulkCreate(
    imageData,
    {
      individualHooks: true,
      returning: true,
    }
  );

  process.exit(0);
}

seedDatabase();
