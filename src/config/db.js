const mongoose = require('mongoose')

const IP = '127.0.0.1'
const DB_PORT = '27017'

mongoose.connect(`mongodb://${IP}:${DB_PORT}/online-shop`)
// mongoose.connect(`mongodb+srv://root:mongodbpassword@cluster1.cc8gu.mongodb.net/`)