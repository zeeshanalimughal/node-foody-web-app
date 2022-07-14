const Product = require('../models/produc.model')
const Category = require('../models/category.model')
const path = require('path')
const express = require('express')
const app = express()
var multer  =   require('multer');  




exports.addCategory = async (req, res) => {
    if (!req.body.name) {
        return res.status(403).json({ message: "All fields are required", status: false });
    }
    const category = new Category({ category_name: req.body.name })

    await category.save().then(function (category) {
        // return res.redirect('/admin/add-category.html')
        return res.send({ message: "Category Added successfully", status: true });
    }).catch(err => {
        return res.status(500).json({ message: "INTERNAL ERROR", error: err });
    })
}


exports.getCategory = async (req, res) => {

    let categories = await Category.find({});

    return res.send({ data: categories, status: true });

}

exports.deleteCategory = async (req, res) => {

    if (req.params && !req.params.id) {
        return res.status(403).json({ message: "Id is required", status: false });
    }

    let category = await Category.findOne({ _id: req.params.id });
    console.log(category)
    if (category) {
        Category.findByIdAndRemove({ _id: req.params.id }, function () {
            return res.status(200).json({ message: " Deleted successfully", status: true });
        })
    }
    else {
        return res.status(404).json({ message: "Category Not Found...", status: false });

    }
}





exports.addProduct = async (req, res) => {

    app.use(express.static(path.join(__dirname,'../public')))
    // console.log(req.body)

    const uploadPath = path.join(__dirname,'../public/uploads')
    var storage = multer.diskStorage({
        destination:function (req, file, cb){
            cb(null,uploadPath)
        },
        filename:function (req, file, cb){
            cb(null,(Math.floor(Math.random() * (1000 - 0) + 1)+'-'+Date.now()+file.originalname))
        }
    })

    var upload = multer({storage:storage}).single('image')

    upload(req,res,function(err){
        if(err){
            return res.status(403).json({ message: "Image Error: "+err.message, status: false });
        }
        console.log(req.body);

        const { name, description, price, quantity, category, image } = req.body;

    if (!name || !description || !price || !quantity || !category) {
        return res.status(403).json({ message: "All fields are requiredaskljdkls", status: false });
    }


        let imageName = req.file.filename;
        let product = new Product({
            name,
            description,
            price,
            image:imageName,
            quantity,
            category
        })
    
         product.save().then(function (product) {
            return res.send({ message: "Product Added successfully", status: true });
        }).catch(err => {
            return res.status(500).json({ message: "INTERNAL ERROR", error: err });
        })


    })

   
}


exports.getAllProducts = async function (req, res) {
    let products = await Product.find({});
    return res.send({ data: products, status: true });

}


exports.deleteProduct = async (req, res) => {
    if (req.params && !req.params.id) {
        return res.status(403).json({ message: "Id is required", status: false });
    }
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
        Product.findByIdAndRemove({ _id: req.params.id }, function () {
            return res.status(200).json({ message: "Product Deleted successfully", status: true });
        })
    }
    else {
        return res.status(404).json({ message: "Product Not Found...", status: false });

    }
}



exports.getSingleProduct =async (req, res) => {
    let productId = req.params.id;
    let product = await Product.findOne({_id:productId});
    let category = await Category.findOne({_id:product.category})
    return res.send({ data: [product, category!==null ? category.category_name : ''], status: true });

}

exports.getRelatedProduct = async (req, res) => {
    let productId = req.params.id
    console.log(productId)
    let product = await Product.findOne({_id:productId});

    let otherRelatedProducts = await Product.find({category:product.category});

    let filteredRelatedProducts = otherRelatedProducts.filter((relatedProduct) => {
        return relatedProduct.name!==product.name
    })
    return res.send({ data: filteredRelatedProducts, status: true });

}