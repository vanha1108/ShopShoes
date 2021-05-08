const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const Size = require('../models/size');
const { validationResult } = require('express-validator'); //lấy dc lỗi từ body validate

const getAllSize = async (req, res, next) => {
    let sizes;
    try{
        sizes = await Size.findAll();
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any Size', 500);
        return next(error);
    }

    if(!sizes)
    {
        const error =  new HttpError('Could not find any Size', 404);
        return next(error);
    }
    res.status(200).json({sizes});

};


const getAllSizeByType = async (req, res, next) => {
    const sizeTypeName = req.params.sizeTypeName;
    console.log(sizeTypeName)
    let listSize;
    try{
        listSize = await Size.findAll({ sizeType: sizeTypeName });
    }
    catch(err)
    {
        const error = new HttpError('Something went wrong, coud not find any Size', 500);
        return next(error);
    }
    if(!listSize)
    {
        const error =  new HttpError('Could not find any Size', 404);
        return next(error);
    }
    res.status(200).json({listSize});
}

const createSize = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Invalid Input! Pls use numeric for size', 400);
        return next(error);
    }
    const createdSize = {
        sizeName: req.body.sizeName,
        sizeType: req.body.sizeType
      };
    let sizes
    sizes = await Size.create(createdSize);
    res.status(200).json({sizes});
};



const deleteSizeById = async (req, res, next) => {
    const sizeId = req.params.sizeId;
    let sizes;
    try{
        sizes = await Size.findById({id: sizeId});
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);
        return next(error);
    }
    if(!sizes)
    {
        const error =  new HttpError('Could not find any Size', 404);
        return next(error);
    }
    res.status(200).json({message: 'Deleted Size:'});
    
}

const updateSize = async (req, res, next) => {
    const sizeId = req.params.sizeId;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls use numeric for size', 400);
        return next(error);
    }
    const updatedSize = {
        sizeName: req.body.sizeName,
        sizeType: req.body.sizeType
      };
    let sizes;
    sizes = await Size.updateOne(updatedSize, {id: sizeId});
    res.status(200).json({size: updatedSize}); 
}

module.exports = { getAllSize, createSize, deleteSizeById, updateSize, getAllSizeByType};