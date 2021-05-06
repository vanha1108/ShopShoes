const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const {getAlias,decodeAlias} = require('../middleware/utilities')
const Product = require('../models/product');
const ProductSize = require('../models/productsize');
const Brand = require('../models/brand');
const ProductImage = require('../models/productimage');
const Size = require('../models/size');
const Import = require('../models/import');
const ImportDetail = require('../models/importdetail');
const { validationResult } = require('express-validator'); //lấy dc lỗi từ body validate
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

const getAllImport = async (req, res, next) => {
    let imports;
    try {
        imports = await Import.findAll(
            {
                include: [
                    {
                        model: ImportDetail,
                        include: [
                            {
                                model: ProductSize,
                                include: [
                                    {
                                        model: Product,
                                        include: [
                                            {model: Brand}
                                        ]
                                    },
                                    {
                                        model: Size
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        );
    } catch (err) {
        const error = new HttpError(
            "System goes wrong, coud not find any Import",
            500
        );
        return next(error);
    }
    if (!imports) {
        const error = new HttpError("Could not find any Import", 204);
        return next(error);
    }
    res.status(200).json({
        success: "SYSS01",
        imports
    });
}

const getImportByProductId = async (req, res, next) => {
    const productId = req.params.productId;
    let imports;
    try {
        imports = await Import.findAll(
            {
                include: [
                    {
                        model: ImportDetail,
                        include: [
                            {
                                where:{
                                    productId: productId
                                },
                                model: ProductSize,
                                
                                include: [     
                                    {
                                        model: Product
                                    },
                                    {
                                        model: Size
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        );
    } catch (err) {
        const error = new HttpError(
            'System goes wrong, coud not find any Import',
            500
        );
        return next(error);
    }
    if (!imports) {
        const error = new HttpError("Could not find any Import", 204);

        return next(error);
    }
    res.status(200).json({
        success: "SYSS01",
        imports
    });
} 

const getImporByPublisherName = async (req, res, next) => {

}

const getImportByDate = async (req, res, next) => {

}

const addImport = async (req, res, next) => {
    const importCreated = {
        importCode: req.body.importCode,
        publisherName: req.body.publisherName
    }
    console.log(importCreated)
    let createImport;
    createImport = await Import.create(importCreated);
    res.status(200).json({createImport});
}

const addImportDetail = async (req, res, next) => {
    const productSizeId = req.body.productSizeId;
    // const importId = req.body.importId;
    
    // Check xem coi  productId vs sizeId có trong ProductSize chưa
    // let findProductSize;
    // findProductSize = await ProductSize.findOne(
    //         {
    //             where: {
    //                 // id: req.body.productSizeId,
    //                 // sizeId: req.body.sizeId
    //             },
    //         }
    //     );
    // if (!findProductSize) {
    //     const createdProductSize = {
    //         productCount: 0,
    //         productId: req.body.productId,
    //         sizeId: req.body.sizeId
    //     }
    //     let createProductSize;
    //     //Tạo productSize theo sizeid and productId
    //     createProductSize = await ProductSize.create(createdProductSize);
        
    //     const importItem = {
    //         importId : req.body.importId,
    //         amount : req.body.amount,
    //         importPrice: req.body.importPrice,
    //         productSizeId : createProductSize.id
    //     };
    //     let importDetail;
    //     try{
    //         importDetail = await ImportDetail.create(importItem)
    //     } catch(err) {
    //         const error = new HttpError('There is system error. Pls try again', 500);
    //         return next(error);
    //     }
    //     let updateProductSize;
    //     updateProductSize = await ProductSize.update({productCount: req.body.amount}, {
    //         where: {
    //             id: createProductSize.id
    //         }
    //     });
        
    //     res.status(200).json({importDetail});
    // }
    // else{
        const importItem = {
            importId : req.body.importId,
            amount : req.body.amount,
            importPrice: req.body.importPrice,
            productSizeId : req.body.productSizeId
        };
        let importDetail;
        try{
            importDetail = await ImportDetail.create(importItem)
        } catch(err) {
            const error = new HttpError('There is system error. Pls try again', 500);
            return next(error);
        }

        // let getProductSize;
        // getProductSize = await ProductSize.findOne({
        //     where: {
        //         id: findProductSize.id
        //     }
        // });
        
        // console.log(getProductSize.productCount);


        // let amountProductSize;
        // amountProductSize = getProductSize.productCount + req.body.amount;
        // let updateProductSize;
        // updateProductSize = await ProductSize.update({productCount: amountProductSize}, {
        //     where: {
        //         id: findProductSize.id
        //     }
        // })
        res.status(200).json({importDetail});
    // }
    
}


module.exports = {
    addImport, addImportDetail, getAllImport, getImportByProductId
}