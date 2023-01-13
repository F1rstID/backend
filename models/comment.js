'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {

      this.belongsTo(models.Member, {
        targetKey: 'memberIndex',
        foreignKey: 'memberIndex',
      });

      this.hasOne(models.QuizLike, {
        targetKey: 'quizIndex',
        foreignKey: 'quizIndex',
      });

      this.hasOne(models.QuizDislike, {
        targetKey: 'quizIndex',
        foreignKey: 'quizIndex',
      });


    }
  }
  Comment.init({

    commentIndex : {
      allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },

    memberIndex: {
      allowNull : false,
      type: DataTypes.INTEGER,
    },

    quizeIndex: {
      allowNull : false,
      type: DataTypes.INTEGER, 
    },

    comment: {
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
    modelName: 'Comment',
  });
  return Comment;
};