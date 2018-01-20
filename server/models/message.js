'use strict'
const db = require('../db');
const Sequelize = require('sequelize');

const Message = db.define('Message',{
    message: {
        type: Sequelize.TEXT,
        allowNull: false ,
    },
   
})

module.exports = Message