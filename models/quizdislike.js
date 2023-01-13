'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizDislike extends Model {
    static associate(models) {
      this.belongsTo(models.Quiz, {
        targetKey: 'quizIndex',
        foreignKey: 'quizIndex',
      });
    }
  }
  QuizDislike.init(
    {
      quizDislikeIndex: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quizIndex: {
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
