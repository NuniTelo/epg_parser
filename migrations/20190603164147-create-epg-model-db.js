'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('epg_model_dbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.STRING
      },
      stop: {
        type: Sequelize.STRING
      },
      channel_name: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      rating_system: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('epg_model_dbs');
  }
};