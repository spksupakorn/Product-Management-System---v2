const express = require('express');
const router = express.Router();

const { 
    getProductAll, 
    getProductbyID, 
    addProduct, 
    editProdoct, 
    deleteProduct 
} = require("../controller/products_controller");

router.get("/products", getProductAll);
router.get("/products/:id", getProductbyID);
router.post("/products", addProduct);
router.put("/products/:id", editProdoct);
router.delete("/products/:id", deleteProduct);

module.exports = router;

