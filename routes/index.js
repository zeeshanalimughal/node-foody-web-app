const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/auth')
const {addProduct,addCategory,deleteCategory,getCategory, getAllProducts,deleteProduct,getSingleProduct,getRelatedProduct} = require('../controllers/product.controller')




router.post('/register',registerUser)
router.post('/login',loginUser)


// Categories
router.post('/add-category',addCategory)
router.get('/get-categories',getCategory)
router.get('/delete-category/:id',deleteCategory)

// Products
router.post('/add-product',addProduct)
router.get('/get-products',getAllProducts)
router.get('/get-single-product/:id',getSingleProduct)
router.get('/get-related-products/:id',getRelatedProduct)

router.get('/delete-product/:id',deleteProduct)


module.exports = router;
