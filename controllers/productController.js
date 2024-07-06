const db = require('../models')

// create main Model
const Product = db.products
const Review = db.reviews

// main work

//1. create Product
const addProduct = async (req, res) => {
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }
    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
}

//2. get All Products
const getAllProducts = async (req, res) => {
    let products = await Product.findAll({})
    res.status(200).send(products)
}

//3. get single Product
const getOneProduct = async (req, res) => {
    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)
}

//4. update Product
const updateProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.update(req.body, { where: { id: id }})
    res.status(200).send(product)
}

//5. delete Product
const deleteProduct = async (req, res) => {
    let id = req.params.id
    await Product.destory({ where: { id: id }} )
    res.status(200).send('Product is deleted !')   
}

//6. get published Product
const getPublishedProduct = async (req, res) => {
    const products = await Product.findAll({ where: { published: true }} )
    res.status(200).send(products)
}

//7. connect one to many relation Product and Reviews
const getProductReviews = async (req, res) => {
    const data = await Product.findAll({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: 1 }
    })
    res.status(200).send(data)
}

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews
}