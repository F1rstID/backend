'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentDislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommentDislike.init({
    commentIndex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentDislike',
  });
  return CommentDislike;
};