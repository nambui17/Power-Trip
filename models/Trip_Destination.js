const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TripDestination extends Model {}

TripDestination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trip',
        key: 'id',
      },
    },
    destination_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'destination',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip_destination',
  }
);

module.exports = TripDestination;
