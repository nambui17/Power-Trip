const User = require('./User');
const Trip = require('./Trip');
const Destination = require('./Destination');
const Companion = require('./Companion');

User.hasMany(Trip, {
  foreignKey: 'user_id',
});

User.belongsToMany(Trip, {
  through: Companion,
  foreignKey: 'user_id',
});

Trip.belongsToMany(User, {
  through: Companion,
  foreignKey: 'trip_id',
});

Trip.hasMany(Destination, {
  foreignKey: 'destination_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Trip,
  Destination,
  Companion,
};
