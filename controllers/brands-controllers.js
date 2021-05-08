const HttpError = require("../error-handle/http-error"); //dùng để giải quyết error
// const models = require("../models"); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const Brand = require("../models/brand");
const { validationResult } = require("express-validator"); //lấy dc lỗi từ body validate
const { getAlias, decodeAlias } = require("../middleware/utilities");

const getAllBrand = async (req, res, next) => {
    let brands;
    try {
        brands = await Brand.find();
    } catch (err) {
        const error = new HttpError(
            "System goes wrong, coud not find any Brand",
            500
        );
        return next(error);
    }
    if (!brands) {
        const error = new HttpError("Could not find any Brand", 204);

        return next(error);
    }
    res.status(200).json({
        success: true,
        brands
    });
};

const createBrand = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next({error});
    }
    
    const createdBrand = {
        name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
    };
    let brands;
    brands = await Brand.create(createdBrand);
     res.status(201).json({
        success: true,
        brands,
     });
};

const getBrandById = async (req, res, next) => {
    const brandId = req.params.brandId;
    let brands;
    try {
        brands = await Brand.findById(brandId);
    } catch (err) {
        const error = new HttpError(
            "System went wrong, coud not find any Brand",
            500
        );
        return next(error);
    }

    if (!brands) {
        const error = new HttpError("Could not find any Brand", 204);
        return next(error);
    }
    res.status(200).json({
        success: true,
        brands,
    });
};

const deleteBrandById = async (req, res, next) => {
    const brandId = req.params.brandId;
    let brands;
    try {
        brands = await Brand.findByIdAndDelete({ id: brandId});
    } catch (err) {
        const error = new HttpError("Something went wrong, can not delete", 500);
        return next(error);
    }

    if (!brands) {
        const error = new HttpError("Could not find any Brand", 204);
        return next(error);
    }
    res.status(200).json({ success: true ,message: "Deleted Brand:" });
};

const updateBrandById = async (req, res, next) => {
    const brandId = req.params.brandId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next(error);
    }
    
    const updatedBrand = {
        name: req.body.name,
        summary: req.body.summary,
        imagePath: req.body.imagePath,
    };
    let brands;
    brands = await Brand.updateOne(updatedBrand,{ id: brandId });
    res.status(200).json({ success: true ,brands: updatedBrand });
};

module.exports = {
    getAllBrand,
    createBrand,
    updateBrandById,
    deleteBrandById,
    getBrandById
};
