const jwt = require('jsonwebtoken')

exports.createToken = (user) => {
    const data = {
        userId: user.id,
        username : user.username
    }
    const token = jwt.sign(data, 'TOKEN KEY')

    return token
}