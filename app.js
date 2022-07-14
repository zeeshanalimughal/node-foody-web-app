require("dotenv").config()
const express = require('express');
const db = require('./config/db')
const app = express()
const User = require('./models/user.model')
const PORT = process.env.PORT || 5000
const router = require('./routes/index')
 const path = require('path')
 const bodyParser = require('body-parser')
// const user = new User({
//     name: 'zeeshan',
//     email: 'zeeshan@example.com',
//     password: '123'
// });


// user.save().then(function(user){
//     console.log(user)
// }).catch(err => console.log(err));


// User.find({name:"zeeshan"}).then(function(user){
//     console.log(user)
// }).catch(err => console.log(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

app.listen(PORT,()=>{
    console.log("Listen on port http://localhost:"+PORT);
})

