require("dotenv").config()
const mongoose = require('mongoose')

const db = mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("CONNECTED TO DB")
}).catch((err) => {
    console.log("ERROR: "+ err.message)
})


module.exports = db

