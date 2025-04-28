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
router.put('/update/:id',uploads.single("images"),async(req,res)=>{
    try {
        const id = req.params.id;
        const {pname,price,stock,description} = req.body
        const updateProduct = {
            pname,
            price,
            stock,
            description,
        }
        if(req.file){
            updateProduct.images = [req.file.filename];
        }
         const product = await productModel.findByIdAndUpdate(id,updateProduct);
         if(!product){
            res.status(404).send({message:"product not found"})
         }
        res.status(200).send({message:"product updated successfully"})
    } catch (error) {
        console.log(error)
    }
    }
)

router.delete('/delete/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        await productModel.findByIdAndDelete(id)
        res.status(200).send({message:"product deleted successfully"})
    } catch (error) {
        console.log(error)
    }

})

module.exports = router