const Import = require('../models/import');
const ImportDetail = require('../models/importdetail');
const ProductSize = require('../models/productsize');
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
    const {productSizeCode, importCode, amount, importPrice} = req.body;
    let product = await ProductSize.findOne({code: productSizeCode});
    if (product == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any productSize!"});
    }

    let checkImport = await Import.findOne({code: importCode});
    if (checkImport == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any import!"});
    }

    var code = Util.getCode();
    while(!Import.findOne({code})) {
        code = Util.getCode();
    };
    
    const importItem = {
        code: code,
        importCode: importCode,
        productSizeCode: productSizeCode,
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

const getImportDetailByImportCode = async (req, res, next) => {
    const importCode = req.params.importCode;
    let importDetail = await ImportDetail.find({importCode});
    if (importDetail == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any importDetail!"});
    }
    return res.status(200).json({code: 200, success: true, importDetail});
}

const getAllImportDetail = async(req, res, next) => {
    const importDetails = ImportDetail.find();
    return res.status(200).json({code: 200, success: true, importDetails});
}

module.exports = {
    addImport, addImportDetail, getAllImport, getImportDetailByImportCode, getAllImportDetail
}