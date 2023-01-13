'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuizLikes.init({
    quizeIndex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizLikes',
  });
  return QuizLikes;
};