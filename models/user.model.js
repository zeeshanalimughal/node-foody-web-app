const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
    name:{type: 'string',required: true},
    email:{type: 'string',required: true},
    password:{type: 'string',required: true}
},
{timestamp:true,}
)

const User = mongoose.model('User',UserSchema)

module.exports = User