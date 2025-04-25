var mongoose = require('mongoose')

var productSchema = mongoose.Schema({
    pname : String,
    price : Number,
    description : String,
    stock : Number,
    images:[String]
})

var productModel = mongoose.model("product",productSchema);

module.exports = productModel;