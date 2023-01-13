'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quizzes', {
      quizIndex: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberIndex: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : "Members",
          key : "memberId",
        }
      },
      title: {
        allowNull : false,
        type: Sequelize.STRING
      },
      content: {
        allowNull : false,
        type: Sequelize.STRING,
      },
      answer: {
        allowNull : false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quizzes');
  }
};