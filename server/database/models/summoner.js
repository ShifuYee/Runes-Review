'use strict';

const db = require('../index');
const Sequelize = require('sequelize');

const Summoner = db.define('summoner', {
  name: {
    type: Sequelize.STRING
  },
  summonerId: {
    type: Sequelize.INTEGER
  },
  accountId: {
    type: Sequelize.INTEGER
  },
  tier: {
    type: Sequelize.STRING
  },
  rank: {
    type: Sequelize.STRING
  }
});

module.exports = Summoner;
