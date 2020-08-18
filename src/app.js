// Require config file
require('./config/config');

// Express
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

// Replace of body parser with included in express package
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Loading routes
app.use(require('./routes/index.routes'));


app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});