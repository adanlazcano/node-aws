const { Sequelize } = require('sequelize');

const db =  new Sequelize(
  process.env.DBNAME, 
  process.env.USERDB, 
  process.env.PASSDB , {
    
  host:'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = db;
