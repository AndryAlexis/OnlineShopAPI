const User = require('../../models/api/users.model')
const bcrypt = require('bcryptjs')
const { createToken } = require('../../utils/helper')

const register = async (req, res, next) => {
    const {body} = req

    try {
        //We encrypt password
        body.password = await bcrypt.hash(body.password, 10)

        //We insert the document

        const newUser = await User.create(body)

        res.json(newUser)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({ email })

        const passwordsAreEquals = await bcrypt.compare(password, user.password)
        if (!passwordsAreEquals) {
            return res.status(400).json({
                message : 'The email or password are incorrect.'
            })
        }

        res.json({
            message : 'Correct login',
            toke : createToken(user)
        })
    } catch (error) {
        next(error)
    }
}

const addProductCart = async (req, res, next) => {
    const {productId} = req.params

    try {
        req.user.cart.push(productId)
        await req.user.save()
    
        res.json(req.user)
    } catch (error) {
        next(error)
    }
}

const getProfile = async (req, res, next) => {
    try {
        res.json(req.user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
    addProductCart,
    getProfile
}