'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.Member, {
        targetKey: 'mId',
        foreignKey: 'mId',
      });
    }
  }
  Cart.init(
    {
      tId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      refreshToken: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    }
  );
  return RefreshToken;
};
