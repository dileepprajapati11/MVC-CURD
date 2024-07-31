/*
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mynodeshop')

const db = mongoose.connection;
db.on('connected', function() {
    console.log('database is connected successfully');
});

module.exports = db;
*/

import mongoose from "mongoose";
const url = "mongodb://localhost:27017/mynodeshop";
mongoose.connect(url);//connecting of database
console.log("Successfully connected to mongod database");
