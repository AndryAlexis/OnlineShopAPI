const Product = require('../../models/api/products.model.js')

const getAll = async (req, res, next) => {
    try {
        const products = await 
            Product
                .find()
        res.json(products)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    const {productId} = req.params
    try {
        const product = await Product.findById(productId)

        res.json(product)
    } catch (error) {
        next(error)
    }
}

const getByDepartment = async (req, res, next) => {
    const {department} = req.params
    try {
        const products = await Product.find({ department })

        res.json(products)
    } catch (error) {
        next(error)
    }
}

const getByRangeOfPrice = async (req, res, next) => {
    const {min, max} = req.query
    try {
        const products = await Product.find({
            price : {
                $gte : min,
                $lte : max
            }
        })

        res.json(products)
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        req.body.owner = req.user._id
        const product = await (await Product.create(req.body)).populate('owner', 'username email')
        res.status(201).json(product)
    } catch (error) {
        return next(next)
    }
}

const put = async (req, res, next) => {
    const {productId} = req.params

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })

        res.json(updatedProduct)
    } catch (error) {
        return next(error)
    }
}

const del = async (req, res, next) => {
    const {productId} = req.params
    try {
        const product = await Product.findByIdAndDelete(productId)
        res.json(product)
    } catch (error) {
        return next(error)
    }
}

module.exports = { 
    getAll,
    getById,
    getByDepartment,
    getByRangeOfPrice,
    post: createProduct,
    put,
    del
}