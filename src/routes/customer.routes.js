const express = require('express');
const CustomerController = require('../controllers/customers.controller');

const app = express();

// ROUTES HERE
app.get("/customers", CustomerController.getCustomers);
app.get("/customer", CustomerController.getCustomer);
app.post("/addCustomer", CustomerController.postCustomer);
app.post("/updateCustomer", CustomerController.updateCustomer);


module.exports = app;