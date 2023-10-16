const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const { MongoClient } = require("mongodb");
const uri = 'mongodb://myUserAdmin:myUserAdmin@127.0.0.1:27017';
global.client = new MongoClient(uri);

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

//Middleware for cors
app.use(cors());
// Middleware for parsing JSON
app.use(express.json());

//Import router
const product_router = require("./api/routes/products_route");

//Use router
app.use(product_router);

app.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}/`);
});