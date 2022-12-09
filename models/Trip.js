const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        min: 0,
        max: 5,
      },
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip',
  }
);

module.exports = Trip;
