'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentDislike extends Model {
    static associate(models) {
      this.belongsTo(models.Comment, {
        targetKey: 'cId',
        foreignKey: 'cId',
      });
    }
  }
  CommentDislike.init(
    {
      cDId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      cId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'CommentDislike',
    }
  );
  return CommentDislike;
};
