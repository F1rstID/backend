'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizLike extends Model {
    
    static associate(models) {
      
      this.belongsTo(models.Quiz, {
        targetKey: 'quizIndex',
        foreignKey: 'quizIndex',
      });
    }
  }
  QuizLike.init({
    quizLikeIndex: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    }
  }, {
    sequelize,
    modelName: 'QuizLike',
  });
  return QuizLike;
};