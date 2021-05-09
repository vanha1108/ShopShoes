const Brand = require("../models/brand");
const Util = require('../utils/generateCode');


const getAllBrand = async (req, res, next) => {
    let brands;
    try {
        brands = await Brand.find();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any brand!"});
    }
    if (!brands) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any brand!"});
    }
    return res.status(200).json({ code: 200, success: true, brands });
};

const createBrand = async (req, res, next) => {
    const {name, summary, image} = req.body;
    if (name == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    let brand = await Brand.findOne({name});
    if(brand != null) {
        return res.status(409).json({code: 409, success: false, message: "Name of brand is already exist!"});
    }

    var code = Util.getCode();
    while(!Brand.findOne({code})) {
        code = Util.getCode();
    };

    const createdBrand = {
        code: code,
        name: name,
        summary: summary,
        image: image,
    };

    let brands = await Brand.create(createdBrand);
    return res.status(201).json({
        success: true,
        brands,
    });
};

const getBrandByCode = async (req, res, next) => {
    const code = req.params.code;
    let brands;
    try {
        brands = await Brand.findOne({code});
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any Brand!"});
    }

    if (!brands) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any Brand!"});
    }
    return res.status(200).json({
        success: true,
        brands,
    });
};

const deleteBrandByCode = async (req, res, next) => {
    const code = req.params.code;
    let brands;

    try {
        brands = await Brand.findOneAndDelete({code});
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "Something went wrong, can not delete!"});
    }

    if (!brands) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any Brand!"});
    }
    return res.status(200).json({code: 200, success: true , message: "Deleted Brand:"});
};

const updateBrandByCode = async (req, res, next) => {
    const code = req.params.code;
    const {name, summary, image}  = req.body;

    if (name == "") {
        return res.status(204).json({code: 204, success: false, message: "Invalid Input! Pls check your data"});
    }
    
    var updatedBrand = Brand.findOne({code});
    if (updatedBrand == null) {
        return res.status(404).json({code: 404, success: false, message: "Brand not found"});
    }
    updatedBrand.name = name;
    updatedBrand.summary = summary;
    updatedBrand.image = image;

    await Brand.updateOne(updatedBrand,{ code: code });
    return res.status(200).json({ code: 200, success: true , brands: updatedBrand });
};

module.exports = {
    getAllBrand,
    createBrand,
    updateBrandByCode,
    deleteBrandByCode,
    getBrandByCode
};
