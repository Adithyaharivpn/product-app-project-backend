var express = require('express')
var router = express.Router();
var productModel = require('../model/product') 
const uploads = require("../middleware/multer")

router.post('/',uploads.array("images",5),async(req,res)=>{
    
        const imagesPath = req.files.map(file=>file.filename)
        const {pname, price, description, stock} = req.body
        const newProduct = new productModel({
            pname,
            price,
            description,
            stock,
            images: imagesPath// Save file paths in the database
          });
        try {
            await newProduct.save();
            res.status(200).send({message:"product add successfully"})
    } catch (error) {
            res.status(500).send({message:"something went wrong"})
    }
})


router.get('/product',async(req,res)=>{
    try {
        const products = await productModel.find();
        res.status(200).json(products);
        console.log(products)
    } catch (error) {
        console.log(error)
    }
    }
)
module.exports = router