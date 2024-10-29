const express = require('express')
const { register, login, addProductCart, getProfile } = require('../../controllers/api/users.controller.js')
const { checkToken } = require('../../utils/middleware.js')

const router = express.Router()

// /api
router.get('/profile', checkToken, getProfile)
router.post('/register', register)
router.post('/login', login)

router.put('/add/:productId', checkToken, addProductCart)

module.exports = router