const Import = require('../models/import');
const ImportDetail = require('../models/importdetail');
const product = require('../models/product');
const Util = require('../utils/generateCode');

const getAllImport = async (req, res, next) => {
    let imports;
    try {
        imports = await Import.find();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any import!"});
    }

    if (!imports) {
          return res.status(404).json({code: 404, success: false, message: "Could not find any import!"});
    }
    return res.status(200).json({code: 200, success: true, imports});
}

const addImport = async (req, res, next) => {
    const {publisherName} = req.body;
    var code = Util.getCode();
    while(!Import.findOne({code})) {
        code = Util.getCode();
    };

    const importCreated = {
        code: code,
        publisherName: publisherName
    }
    let createImport = await Import.create(importCreated);
    return res.status(200).json({code: 200, success: true, createImport});
}

const addImportDetail = async (req, res, next) => {
    const {productSizeCode, importDetailCode, amount, importPrice} = req.body;

    let product = ProductSize.findOne({code: productSizeCode});
    if (product == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any productSize!"});
    }

    var code = Util.getCode();
    while(!Import.findOne({code})) {
        code = Util.getCode();
    };
    
    const importItem = {
        code: code,
        productSizeCode: productSizeCode,
        importDetailCode: importDetailCode,
        amount : amount,
        importPrice: importPrice,
    };
    let importDetail;
    try{
        importDetail = await ImportDetail.create(importItem)
    } catch(err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any importDetail!"});
    }
    return res.status(200).json({code: 200, success: true, importDetail});
}


module.exports = {
    addImport, addImportDetail, getAllImport
}