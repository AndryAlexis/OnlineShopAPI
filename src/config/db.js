const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
// mongoose.connect(`mongodb+srv://root:mongodbpassword@cluster1.cc8gu.mongodb.net/`)