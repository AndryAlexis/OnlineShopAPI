const { Schema, model} = require('mongoose')

const productShema = new Schema({
    name : String,
    description : String,
    price : Number,
    department : String,
    stock : Number,
    available : Boolean,
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
}, {
    timestamps: true,
    versionKey: false
})

const Product = model('product', productShema)

module.exports = Product