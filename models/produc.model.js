const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
   name:{type: 'string',required: true},
   description:{type: 'string',required: true},
   price:{type: 'number',required: true},
   quantity:{type: 'number',required: true},
   image:{type: 'string'},
   category:{type: mongoose.Schema.Types.ObjectId,ref: 'Categories'},
},
{timestamp:true,}
)

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product