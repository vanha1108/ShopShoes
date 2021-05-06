const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const {getAlias,decodeAlias} = require('../middleware/utilities')
const Product = require('../models/product');
const ProductSize = require('../models/productsize');
const ProductImage = require('../models/productimage');
const Group = require('../models/group');
const Brand = require('../models/brand');
const Category = require('../models/category');
const Size = require('../models/size');
const { validationResult } = require('express-validator'); //lấy dc lỗi từ body validate
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op; 

//
const getAllProduct = async (req, res, next) => {
    let products;
    try {
        products = await Product.findAll(
            {
                include: [
                    {
                        model: Brand,                     
                    },
                    {
                        model: Category,
                        include:[{
                            model: Group
                        }]
                    },
                    {
                        model: ProductSize,
                        include:[{
                            model: Size
                        }]
                    },
                    {
                        model: ProductImage
                    }
                ]
            }
        );
        console.log(products)
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any product', 500);
        return next(error);
    }

    if(!products)
    {
        const error =  new HttpError('Could not find any category', 404);
       
        return next(error);
    }
    res.status(200).json({success: "SYSS01",products});
}

const getProductById = async (req, res, next) => {
    const productId = req.params.productId;
    let product;
    try {
        product = await Product.findOne({
            where: {
                id: productId
            },
            include: [
                {
                    model: Brand,
                    
                    
                },
                {
                    model: Category,
                    include:[{
                        model: Group
                    }]
                },
                {
                    model: ProductSize,
                    include:[{
                        model: Size
                    }]
                },
                {
                    model: ProductImage
                }
            ]
        });
    }
    catch (err) {
        const error = new HttpError('Something went wrong, coud not find any product', 500);
        
        return next(error);
    }
    if (!product) {
        const error = new HttpError("Could not find any product", 204);
       
        return next(error);
    }
    res.status(200).json({success: "SYSS01",product});
}

const getProductImageByProductId = async (req,res,next) => {
    const productId = req.params.productId;
    let productImage;
    try {
        productImage = await ProductImage.findAll({
            where: {
                productId: productId
            }
        })
    } catch (err)
    {
        const error = new HttpError('Something went wrong, coud not find any image', 500);
      
        return next(error);
    }
    if (!productImage) {
        const error = new HttpError("Could not find any image", 204);
       
        return next(error);
    }
    res.status(200).json({success: "SYSS01",productImage});
}

const getProductByAlias = async (req, res, next) => {
    const productAlias = req.params.productAlias;
    let product;
    try {
        product = await Product.findOne({
            where: {
                alias:  productAlias
            },
            include: [
                {
                    model: Brand,
                    
                    
                },
                {
                    model: Category,
                    include:[{
                        model: Group
                    }]
                },
                {
                    model: ProductSize,
                    include:[{
                        model: Size
                    }]
                }
            ]
        });
    }
    catch (err) {
        const error = new HttpError('Something went wrong, coud not find any product', 500);
        
        return next(error);
    }
    console.log(product)
    if (!product) {
        const error = new HttpError("Could not find any product", 204);
       
        return next(error);
    }
    res.status(200).json({success: "SYSS01",product});
}

const createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    let image;
    if(typeof (req.file) !== "undefined")
    {
        image = req.file.path;
        
    }
    else image = null;
    if(image === null)
    {
        const createdProduct = {
            name: req.body.name,
            productCode: req.body.productCode,
            status: "Available",
            description: req.body.description,
            color: req.body.color,
            sellPrice: req.body.sellPrice,
            importPrice: req.body.importPrice,
            alias: getAlias(req.body.name),
            brandId: req.body.brandId,
            categoryId: req.body.categoryId,
            promotion: req.body.promotion
          };
        let products;
        products = await Product.create(createdProduct);
        res.status(200).json({ success: "SYSS02",products});
    }
    else{
        const createdProduct = {
            name: req.body.name,
            productCode: req.body.productCode,
            imagePath: image,
            status: "Available",
            description: req.body.description,
            color: req.body.color,
            alias: getAlias(req.body.name),
            brandId: req.body.brandId,
            categoryId: req.body.categoryId,
            promotion: req.body.promotion
          };
        let products;
        products = await Product.create(createdProduct);
        res.status(200).json({ success: "SYSS02",products});
    }
    
}

const updateProductById = async (req, res, next) => {
    const productId = req.params.productId;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next(error)
    }
    //Kiểm tra có chèn ảnh ko
    let image;
    // if (typeof req.file !== "undefined") {
    //     image = req.file.path;
    // } else image = null;
    if(typeof (req.file) !== "undefined")
    {
        image = req.file.path;
    }
    else image = null;
    console.log(image)
    if (image === null) {
        const updatedProduct = {
            name: req.body.name,
            productCode: req.body.productCode,
            status: req.body.status,
            description: req.body.description,
            color: req.body.color,
            // alias: getAlias(req.body.name),
            brandId: req.body.brandId,
            categoryId: req.body.categoryId,
            sellPrice: req.body.sellPrice,
            importPrice: req.body.importPrice,
            promotion: req.body.promotion
        };
        let products;
        products = await Product.update(updatedProduct, {
            where: { id: productId },
        });
        res.status(200).json({ success: "SYSS04" ,products: updatedProduct });
    } else {
        const updatedProduct = {
            name: req.body.name,
            productCode: req.body.productCode,
            imagePath: image,
            status: req.body.status,
            description: req.body.description,
            color: req.body.color,
            // alias: getAlias(req.body.name),
            brandId: req.body.brandId,
            categoryId: req.body.categoryId,
            sellPrice: req.body.sellPrice,
            importPrice: req.body.importPrice,
            promotion: req.body.promotion
        };
        let products;
        products = await Product.update(updatedProduct, {
            where: { id: productId },
        });
        res.status(200).json({ success: "SYSS04" ,products: updatedProduct });
    }
};


//
const createProductSize = async (req, res, next) => {
    let products;
    try{
        products = await Product.findByPk(req.body.productId);
    } catch (err) {
        const error = new HttpError('Could not find any Product', 404);
        return next(error);
    }
    const createdProductSize = {
        productCount: req.body.productCount,
        productId: req.body.productId,
        sizeId: req.body.sizeId
    }
    let productSize;
    productSize = await ProductSize.create(createdProductSize);
    res.status(200).json({productSize});
} 

//
const createProductImage = async (req, res, next) => {
    const createdProductImage = {
        productId: req.body.productId,
        imagePath: req.file.path
    }
    let productImage;
    productImage = await ProductImage.create(createdProductImage);
    console.log(productImage)
    
    res.status(200).json({productImage});
}

const updateProductImage = async (req, res, next) => {
    const productImageId = req.params.productImageId;
    const updatedImage = {
        imagePath: req.file.path
      };
    let productImage;
    productImage = await ProductImage.update(updatedImage, {
        where: {id: productImageId}
    });
    res.status(200).json({success: "SYSS04",ProductImage: updatedImage});
}

const deleteProductImage = async (req, res, next) => {
    const productImageId = req.params.productImageId;
    let productImage;
    try{
        productImage = await ProductImage.destroy(
            {where: {id: productImageId} 
        });
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);

        return next(error);
    }
    if(!productImage)
    {
        const error =  new HttpError('Could not find any ProductImage', 404);
        return next(error);
    }
    res.status(200).json({success: "SYSS03",message: 'Deleted ProductImage:'});
}

/* const getProductSizeByProductAndSizeId = async (req, res, next) => {
    let productSize;
    try{
        productSize = await ProductSize.findOne(
            {
                where: {
                    productId: req.body.productId,
                    sizeId: req.body.sizeId
                },
            }
        );
    } catch (err) {
        const error = new HttpError('Could not find any ProductSize', 404);
        return next(error);
    }
    res.status(200).json({success: "SYSS01",productSize});
}
 */


module.exports = {
    getAllProduct, getProductById, createProduct, createProductSize, updateProductById, 
    getProductByAlias, createProductImage, updateProductImage, deleteProductImage, getProductImageByProductId,
};