const express = require('express');
const app = express();


// All routes
app.use(require('./customer.routes'));


// Exporting all routes
module.exports = app;