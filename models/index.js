const User = require('./User');
const Trip = require('./Trip');
const Destination = require('./Destination');
const Companion = require('./Companion');
const TripDestination = require('./Trip_Destination');
const TripImage = require('./TripImage');
const Image = require('./Image');

User.belongsToMany(Trip, {
  through: Companion,
  foreignKey: 'user_id',
});

Trip.belongsToMany(User, {
  through: Companion,
  foreignKey: 'trip_id',
});

Destination.belongsToMany(Trip, {
  through: TripDestination,
  foreignKey: 'destination_id',
});

Trip.belongsToMany(Destination, {
  through: TripDestination,
  foreignKey: 'trip_id'
});

Image.belongsToMany(Trip, {
  through: TripImage,
  foreignKey: 'image_id'
});

Trip.belongsToMany(Image, {
  through: TripImage,
  foreignKey: 'trip_id'
});

module.exports = {
  User,
  Trip,
  Destination,
  Companion,
  TripDestination,
  Image,
  TripImage,
};
