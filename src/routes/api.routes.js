const express = require('express')
const productRoutes = require('./api/products.routes')
const usersRoutes = require('./api/users.routes.js')
const {checkToken} = require('../utils/middleware.js')

const router = express.Router()

// /api
router.use('/products', checkToken, productRoutes)
router.use('/users', usersRoutes)

module.exports = router