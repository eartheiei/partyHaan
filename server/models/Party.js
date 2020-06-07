const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "parties",
  {
    pid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    limit: {
      type: Sequelize.INTEGER
    },
    ownerId: {
      type: Sequelize.INTEGER
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);
