'use strict';
const Sequelize = require('sequelize')
const db = require('../config/database')

const epg_model_db = db.define('epg_model_db', {
    start: Sequelize.STRING,
    stop: Sequelize.STRING,
    channel_name: Sequelize.STRING,
    title: Sequelize.STRING,
    subtitle: Sequelize.STRING,
    category: Sequelize.STRING,
    rating_system: Sequelize.STRING,
    value: Sequelize.ARRAY(Sequelize.STRING)
  }, {
    timestamps: false
});
  epg_model_db.associate = function(models) {
    // associations can be defined here
  };

  module.exports = epg_model_db;
