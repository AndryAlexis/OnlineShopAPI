const { Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        username : String,
        password : String,
        email : String,
        role : {
            default : 'regular',
            type : String
        },
        cart : [
            {
                type : Schema.Types.ObjectId,
                ref : 'product'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model('user', userSchema)

module.exports = User