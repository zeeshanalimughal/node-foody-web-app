const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
    {
   category_name:{type: 'string',required: true},
},
{timestamp:true,}
)

const Category = mongoose.model('Category',CategorySchema)

module.exports = Category