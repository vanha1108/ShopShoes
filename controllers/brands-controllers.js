const HttpError = require("../error-handle/http-error"); //dùng để giải quyết error
// const models = require("../models"); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const Brand = require("../models/brand");
const { validationResult } = require("express-validator"); //lấy dc lỗi từ body validate
const { getAlias, decodeAlias } = require("../middleware/utilities");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getAllBrand = async (req, res, next) => {
    let brands;
    try {
        brands = await Brand.findAll();
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
        success: "SYSS01",
        brands
    });
};

const createBrand = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next({error});
    }
    let image;
    if (typeof req.file !== "undefined") {
        image = req.file.path;
    } else image = null;

    if (image === null) {
        const createdBrand = {
            name: req.body.name,
            description: req.body.description,
            alias: getAlias(req.body.name),
        };
        let brands;
        brands = await Brand.create(createdBrand);
        res.status(201).json({
            success: "SYSS02",
            brands,
        });
    } else {
        const createdBrand = {
            name: req.body.name,
            imagePath: req.file.path,
            description: req.body.description,
            alias: getAlias(req.body.name)
        };
        let brands;
        brands = await Brand.create(createdBrand);
        res.status(201).json({
            success: "SYSS02",
            brands,
        });
    }
};

const getBrandByAlias = async (req, res, next) => {
    const brandAlias = req.params.alias;
    let brands;
    try {
        brands = await Brand.findOne({
            where: { alias: brandAlias },
        });
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
        success: "SYSS01",
        brands,
    });
};

const getBrandById = async (req, res, next) => {
    const brandId = req.params.brandId;
    let brands;
    try {
        brands = await Brand.findByPk(brandId);
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
        success: "SYSS01",
        brands,
    });
};

const deleteBrandById = async (req, res, next) => {
    const brandId = req.params.brandId;
    let brands;
    try {
        brands = await Brand.destroy({ where: { id: brandId } });
    } catch (err) {
        const error = new HttpError("Something went wrong, can not delete", 500);
        return next(error);
    }

    if (!brands) {
        const error = new HttpError("Could not find any Brand", 204);
        return next(error);
    }
    res.status(200).json({ success: "SYSS03" ,message: "Deleted Brand:" });
};

const updateBrandById = async (req, res, next) => {
    const brandId = req.params.brandId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next(error);
    }
    //Kiểm tra có chèn ảnh ko
    let image;
    if (typeof req.file !== "undefined") {
        image = req.file.path;
    } else image = null;

    if (image === null) {
        const updatedBrand = {
            name: req.body.name,
            summary: req.body.summary,
            alias: getAlias(req.body.name)
        };
        let brands;
        brands = await Brand.update(updatedBrand, {
            where: { id: brandId },
        });
        res.status(200).json({ success: "SYSS04" ,brands: updatedBrand });
    } else {
        const updatedBrand = {
            name: req.body.name,
            imagePath: req.file.path,
            description: req.body.description,
            alias: getAlias(req.body.name)
        };
        let brands;
        brands = await Brand.update(updatedBrand, {
            where: { id: brandId },
        });
        res.status(200).json({success: "SYSS04" ,brands: updatedBrand });
    }
};

module.exports = {
    getAllBrand,
    getBrandByAlias,
    createBrand,
    updateBrandById,
    deleteBrandById,
    getBrandById
};
