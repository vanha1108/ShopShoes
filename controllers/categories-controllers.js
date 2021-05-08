const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const Category = require('../models/category');
const Group = require('../models/group');
const { getAlias, decodeAlias } = require("../middleware/utilities");
const { validationResult } = require('express-validator'); //lấy dc lỗi từ body validate
const Sequelize = require('sequelize');


const getAllCategory = async (req, res, next) => {
    let categories;
    try{
        categories = await Category.findAll(
            {
                include: [
                    {
                        model: models.Group
                    }
                ] 
            }
        );
        
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any category', 500);
        let errReturn;
        errReturn = {
            fail: "SYSFF",
            error,
        };
        return next(errReturn);
    }
    console.log(categories)
    if(!categories)
    {
        const error =  new HttpError('Could not find any category', 404);
        let errReturn;
        errReturn = {
            fail: "USERNR",
            error,
        };
        return next(errReturn);
    }
    res.status(200).json({
        success: true,
        categories,
    });

};

const createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        let errReturn;
        errReturn = {
            fail: "SYSF02",
            error,
        };
        return next(errReturn);
    }
    let image;
    if(typeof (req.file) !== "undefined")
    {
        image = req.file.path;
        
    }
    else image = null;
    if(image === null)
    {
        const createdCategory = {
            name: req.body.name,
            summary: req.body.summary,
            groupId: req.body.groupId,
            alias: getAlias(req.body.name)
          };
        let categories
        categories = await Category.create(createdCategory);
        res.status(201).json({
            success: true,
            categories,
        });
    }
    else 
    {
        const createdCategory = {
            name: req.body.name,
            imagePath: image,
            description: req.body.description,
            groupId: req.body.groupId,
            alias: getAlias(req.body.name)
          };
        let categories
        categories = await Category.create(createdCategory);
        res.status(201).json({
            success: true,
            categories,
        });
    }
};

const getCategoryByAlias = async (req, res, next) => {
    const alias = req.params.alias;
    let categories;
    try{
        categories = await Category.findOne({ alias: alias });
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any category', 500);
        let errReturn;
        errReturn = {
            fail: "SYSF01",
            error,
        };
        return next(errReturn);
    }

    if(!categories)
    {
        const error =  new HttpError('Could not find any category', 404);
        let errReturn;
        errReturn = {
            fail: "USERF01",
            error,
        };
        return next(errReturn);
    }
    res.status(200).json({
        success: true,
        categories,
    });

};

const getCategoryById = async (req, res, next) => {
    const cateId = req.params.cateId;
    let categories;
    try{
        categories = await Category.findById(cateId);
        
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any category', 500);
        let errReturn;
        errReturn = {
            fail: "SYSF01",
            error,
        };
        return next(errReturn);
    }
    console.log(categories)
    if(!categories)
    {
        const error =  new HttpError('Could not find any category', 404);
        let errReturn;
        errReturn = {
            fail: "USERF01",
            error,
        };
    }
    res.status(200).json({
        success: true,
        categories,
    });

};

const deleteCategoryById = async (req, res, next) => {
    const cateId = req.params.cateId;
    let categories;
    try{
        categories = await Category.findByIdAndDelete({id: cateId});
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);

        return next(error);
    }
    if(!categories)
    {
        const error =  new HttpError('Could not find any category', 404);
        return next(error);
    }
    res.status(200).json({success: true,message: 'Deleted category:'});
    
}

const updateCategoryById = async (req, res, next) => {
    const cateId = req.params.cateId;
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
        const updatedCategory = {
            name: req.body.name,
            description: req.body.description,
            groupId: req.body.groupId,
            alias: getAlias(req.body.name)
          };
        let categories
        categories = await Category.updateOne(updatedCategory,{id: cateId});
        res.status(200).json({success: true,categories: updatedCategory});
    }
    else 
    {
        const updatedCategory = {
            name: req.body.name,
            imagePath: image,
            description: req.body.description,
            alias: getAlias(req.body.name)
          };
          console.log(req.file);
        let categories
        categories = await Category.updateOne(updatedCategory, {alias: alias});
        res.status(200).json({success: true,categories: updatedCategory});
    }
}

module.exports = { getAllCategory, getCategoryById, getCategoryByAlias, createCategory, deleteCategoryById, updateCategoryById};