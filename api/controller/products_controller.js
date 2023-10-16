const products = require("../../products.json");

// GET all products
const getProductAll = (req, res) => {
    res.status(200).json(products);
};

// GET a single product by ID
const getProductbyID = (req, res) => {
    const product = products.find(object => object.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.status(200).json(product);
};

// POST a new product
const addProduct = (req, res) => {
    let body = {
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        stock : req.body.stock
    };

    if(!body.price){
        return res.status(400).send("Please fill product price");
    } else if(isNaN(parseInt(body.price))){
        return res.status(400).send("Price must be number");
    } 
    if(!body.stock){
        return res.status(400).send("Please fill product stock");
    } else if(isNaN(parseInt(body.stock))){
        return res.status(400).send("Stock must be number");
    } 
    if(!body.name){
        return res.status(400).send("Please fill product name");
    }
    if(!body.category){
        return res.status(400).send("Please fill product category");
    }

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

//PUT edit product
const editProdoct = (req, res) => {
    const product = products.find(object => object.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    let body = {
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        stock : req.body.stock
    };

    if(body.name) {
        product.name = req.body.name;
    }
    if(body.category) {
        product.category = req.body.category;
    }
    if(body.price) {
        if(isNaN(parseInt(body.price))){
            return res.status(400).send("Price must be number");
        } 
        product.price = req.body.price;
    }
    if(body.stock) {
        if(isNaN(parseInt(body.stock))){
            return res.status(400).send("Stock must be number");
        }
        product.stock = req.body.stock;
    }
    res.status(200).json(product);
};

//DELETE delete product
const deleteProduct = (req, res) => {
    const productIndex = products.findIndex(object => object.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');
    const productDelete = products.find(object => object.id === parseInt(req.params.id));
    products.splice(productIndex, 1);
    res.status(200).send(`Delete product name ${productDelete.name} successfully.`);
};

module.exports = { getProductAll, getProductbyID, addProduct, editProdoct, deleteProduct };
