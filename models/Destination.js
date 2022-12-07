const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Destination extends Model {}

Destination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true,
        min: 0,
        max: 5
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'destination'
  }
);

module.exports = Destination;
