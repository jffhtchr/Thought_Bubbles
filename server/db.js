const Sequelize = require('sequelize'); 

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:3000/jeff_a_thon', {
  logging: false 
});

module.exports = db;