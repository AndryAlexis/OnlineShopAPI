const express = require('express')
const {getAll, getByDepartment, getByRangeOfPrice, getById, post, put, del} = require('../../controllers/api/products.controller.js')

const router = express.Router()

// /api
router.get('/', getAll)
router.get('/dpt/:department', getByDepartment)
router.get('/price', getByRangeOfPrice)
router.get('/:productId', getById)

router.post('/', post)
router.put('/:productId', put)
router.delete('/:productId', del)

module.exports = router