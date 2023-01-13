'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizDislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuizDislike.init({
    quizeIndex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizDislike',
  });s
  return QuizDislike;
};