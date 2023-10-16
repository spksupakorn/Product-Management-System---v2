const express = require('express');
const app = express();
const port = 9000;

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Middleware for parsing JSON
app.use(express.json());

//Import router
const product_router = require("./api/routes/products_route");

//Use router
app.use(product_router);

app.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}/`);
});