const Product = require('../models/product');
const ProductSize = require('../models/productsize');
const Util = require('../utils/generateCode');
const Size = require('../models/size');

const getAllProduct = async (req, res, next) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any product!"});
    }

    if(!products)
    {
        return res.status(404).json({code: 404, success: false, message: "Could not find any product!"});
    }
    return res.status(200).json({success: true ,products});
}

const getProductByCode = async (req, res, next) => {
    const code = req.params.code;
    let product;
    try {
        product = await Product.findOne({ code });
    }
    catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any product!"});
    }
    if (!product) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any product!"});
    }
    return res.status(200).json({success: true, product});
}

const createProduct = async (req, res, next) => {
    const {productCode, name, categoryCode, brandCode, description, color, image, thumbnail, promotion, importPrice, sellPrice} = req.body;

    if (productCode == "", name == "" || categoryCode == "" || color == "" || importPrice == null || brandCode == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    let product = await Product.findOne({productCode});
    if(product != null) {
        return res.status(409).json({code: 409, success: false, message: "Code of product is already exist!"});
    }

    var code = Util.getCode();
    while(!Product.findOne({code})) {
        code = Util.getCode();
    };
    
    const createdProduct = {
        code: code,
        productCode: productCode,
        name: name,
        status: "Available",
        image: image,
        thumbnail: thumbnail,
        description: description,
        color: color,
        sellPrice: sellPrice,
        importPrice: importPrice,
        categoryCode: categoryCode,
        brandCode: brandCode,
        promotion: promotion
    };
    let products = await Product.create(createdProduct);
    return res.status(200).json({ code: 200, success: true, products});
}

const updateProductByCode = async (req, res, next) => {
    const code = req.params.code;
    const {name, categoryCode, brandCode, description, color, image, thumbnail, promotion, importPrice, sellPrice} = req.body;
    
    if (name == "" || categoryCode == "" || status == "" || color == "" || importPrice == null || brandCode == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    var product = await Product.findOne({code});
    if (product == null ) {
         return res.status(409).json({code: 409, success: false, message: "Code of productsize already exist!"});
    }

    product.name = name;
    product.categoryCode = categoryCode;
    product.brandCode =brandCode;
    product.description = description;
    product.image = image;
    product.thumbnail = thumbnail;
    product.importPrice = importPrice;
    product.sellPrice = sellPrice;
    product.color = color;
    product.promotion = promotion;

    await Product.updateOne(product, { code: code });
    return res.status(200).json({ code: 200, success: true , product });
};

const createProductSize = async (req, res, next) => {
    const {productCode, sizeCode, productCount} = req.body;
    let product;
    let size;

    if (productCode == "", sizeCode == "", productCount == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    try{
        product = await Product.findOne({code: productCode});
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any product!"});
    }

    try{
        size = await Size.findOne({code: sizeCode});
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any size!"});
    }

    if (product == null ) {
        return res.status(404).json({code: 404, success: false, message: "Coud not find any product!"});
    }

    if (size == null) {
        return res.status(404).json({code: 404, success: false, message: "Coud not find any size!"});
    }

    var code = Util.getCode();
    while(!Product.findOne({code})) {
        code = Util.getCode();
    };

    const createdProductSize = {
        code: code,
        productCode: productCode,
        sizeCode: sizeCode,
        productCount: productCount
    }
    let productSize = await ProductSize.create(createdProductSize);
    return res.status(200).json({ code: 200, success: true, productSize});
} 

const getProductSizeByProductCode = async (req, res, next) => {
    const productCode = req.params.productCode;
    let product = await Product.findOne({code: productCode})
    if (product == null) {
        return res.status(404).json({code: 404, success: false, message: "Coud not find any product!"});
    }
    try {
        let productSizes = await ProductSize.find({productCode});
        if (productSizes == null) {
            return res.status(404).json({code: 404, success: false, message: "Coud not find any productSize!"});
        }
        productSizes.map(item => {
            let size = await Size.find ({code: item.sizeCode});
            if (size == null) {
                return res.status(404).json({code: 404, success: false, message: "Coud not find any size!"});
            }
            item.sizeName = size.sizeName;
        });
        return res.status(200).json({ code: 200, success: true, productSizes});
    } catch(error) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any productSize!"});
    } 
}

module.exports = { getAllProduct, getProductByCode, createProduct, createProductSize, updateProductByCode, getProductSizeByProductCode };