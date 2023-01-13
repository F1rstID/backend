'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    
    static associate(models) {
      
      this.belongsTo(models.Member, {
        targetKey: 'memberIdex', 
        foreignKey: 'memberIdex', 
      });

      this.hasOne(models.QuizDislike, {
        sourceKey: 'quizIndex', 
        foreignKey: 'quizIndex', 
      });

      this.hasOne(models.QuizLike, {
        sourceKey: 'quizIndex', 
        foreignKey: 'quizIndex', 
      });

    }
  }
  Quiz.init({
    quizIndex: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    memberIndex: {
      allowNull : false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull : false,
      type: DataTypes.STRING
    },
    content: {
      allowNull : false,
      type: DataTypes.STRING,
    },
    answer: {
      allowNull : false,
      type: DataTypes.STRING,
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
    modelName: 'Quiz',
  });
  return Quiz;
};