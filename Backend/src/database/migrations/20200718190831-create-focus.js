'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Focus', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    StudentID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total_points: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    points_acquired: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    rules_video_link: {
      type: Sequelize.STRING,
      allowNull: false
    },
    focus_local: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    focus_local_optional: {
      type: Sequelize.STRING,
      allowNull: true
    },
    focus_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    focus_type_optional: {
      type: Sequelize.STRING,
      allowNull: true
    },
    solution: {
      type: Sequelize.STRING,
      allowNull: false
    },
    commentary: {
      type: Sequelize.STRING,
      allowNull: true
    },
    GPS_coordinates:{
      type: Sequelize.STRING,
      allowNull: false
    },
    feedback: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    }
  }),
  down: queryInterface => queryInterface.dropTable('Focus'),
};