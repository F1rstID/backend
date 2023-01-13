'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentLike extends Model {
    
    static associate(models) {

      this.belongsTo(models.Comment, {
        targetKey: 'commentIndex',
        foreignKey: 'commentIndex',
      });
    }
  }
  CommentLike.init({

    commentLikeIndex: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    commentIndex: {
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
    modelName: 'CommentLike',
  });
  return CommentLike;
};