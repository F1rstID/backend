'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizDislike extends Model {
    static associate(models) {
      this.belongsTo(models.Quiz, {
        targetKey: 'qId',
        foreignKey: 'qId',
      });
    }
  }
  QuizDislike.init(
    {
      qDId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      qId: {
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
      modelName: 'QuizDislike',
    }
  );
  return QuizDislike;
};
