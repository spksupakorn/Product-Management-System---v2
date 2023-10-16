const client = require('../../db');

// GET all products
const getProductAll = async (req, res) => {
    await client.connect();
    const products = await client.db('dev_init').collection('products').find({}).toArray();
    await client.close();
    res.status(200).send(products);
};

// GET a single product by ID
const getProductbyID = async (req, res) => {
    const id = parseInt(req.params.id);
    await client.connect();
    const product = await client.db('dev_init').collection('products').findOne({"id": id});
    await client.close();
    if(!product) {
        res.status(404).send({
            "status": "not_found",
            "product": product
        });
    } else {
        res.status(200).send({
            "status": "ok",
            "product": product
        });
    }
};

// POST a new product
const addProduct = async (req, res) => {
    let product = req.body;

    if(!product.id){
        return res.status(400).send("Please fill product id");
    } else if(isNaN(parseInt(product.id))){
        return res.status(400).send("ID must be number");
    } 
    if(!product.price){
        return res.status(400).send("Please fill product price");
    } else if(isNaN(parseInt(product.price))){
        return res.status(400).send("Price must be number");
    } 
    if(!product.stock){
        return res.status(400).send("Please fill product stock");
    } else if(isNaN(parseInt(product.stock))){
        return res.status(400).send("Stock must be number");
    } 
    if(!product.name){
        return res.status(400).send("Please fill product name");
    }
    if(!product.category){
        return res.status(400).send("Please fill product category");
    }

    await client.connect();
    await client.db('dev_init').collection('products').insertOne({
        id: parseInt(product.id),
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
    });
    await client.close();
    res.status(201).send({
        "status": "ok",
        "message": "Product with ID = "+product.id+" is created",
        "product": product
    });
};

//PUT edit product
const editProduct = async (req, res) => {
    const product = req.body;
    const id = parseInt(product.id);
    await client.connect();
    const findProduct = await client.db('dev_init').collection('products').findOne({"id": id});
    if (!findProduct) {
        await client.close();
        res.status(404).send('Product not found');
    } else {
        await client.db('dev_init').collection('products').updateOne({'id': id}, {"$set": {
            id: parseInt(product.id),
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
        }});
        await client.close();
        res.status(200).send({
        "status": "ok",
        "message": "Product with ID = "+id+" is updated",
        "product": product
        });
    }
};

//DELETE delete product
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    await client.connect();
    const findProduct = await client.db('dev_init').collection('products').findOne({"id": id});
    if (!findProduct) {
        await client.close();
        res.status(404).send('Product not found');
    } else {
        await client.db('dev_init').collection('products').deleteOne({'id': id});
        await client.close();
        res.status(200).send({
            "status": "ok",
            "message": "Product with ID = "+id+" is deleted"
        });
    }
};

module.exports = { getProductAll, getProductbyID, addProduct, editProduct, deleteProduct };
