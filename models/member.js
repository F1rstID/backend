'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    

    static associate(models) {

      this.hasMany(models.Quiz, {
        sourceKey: 'memberIndex',
        foreignKey: 'memberIndex', 
      });

      this.hasMany(models.Comment, {
        sourceKey: 'memberIndex', 
        foreignKey: 'memberIndex', 
      });
    }
  }
  Member.init({
    memberIndex: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    memberId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING
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
    modelName: 'Member',
  });
  return Member;
};