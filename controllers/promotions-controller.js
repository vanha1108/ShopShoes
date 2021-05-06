const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const Promotion = require('../models/promotion');
const { validationResult } = require('express-validator'); //lấy dc lỗi từ body validate
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

const getAllPromotion = async (req, res, next) => {
    let promotions;
    try{
        promotions = await Promotion.findAll();
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any Promotion', 500);
        return next(error);
    }

    if(!promotions)
    {
        const error =  new HttpError('Could not find any Promotion', 204);
        return next(error);
    }
    res.status(200).json({promotions});

};



const createPromotion = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Invalid Input! Pls use numeric for Promotion', 400);
        return next(error);
    }
    const createdPromotion = {
        promotionCode: req.body.promotionCode,
        promotionValue: req.body.promotionValue,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      };
    let promotions
    promotions = await Promotion.create(createdPromotion);
    res.status(200).json({promotions});
};



const deletePromotionById = async (req, res, next) => {
    const promotionId = req.params.promotionId;
    let promotions;
    try{
        promotions = await Promotion.destroy(
            {where: {id: promotionId} 
        });
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);
        return next(error);
    }
    if(!promotions)
    {
        const error =  new HttpError('Could not find any Promotion', 404);
        return next(error);
    }
    res.status(200).json({message: 'Deleted Promotion:'});
    
}

const updatePromotion = async (req, res, next) => {
    const promotionId = req.params.promotionId;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls use numeric for Promotion', 400);
        return next(error);
    }
    const updatedPromotion = {
        promotionCode: req.body.promotionCode,
        promotionValue: req.body.promotionValue,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      };
    let promotions;
    promotions = await Promotion.update(updatedPromotion, {
        where: {id: promotionId}
    });
    res.status(200).json({promotion: updatedPromotion});
    
}

module.exports = { getAllPromotion, createPromotion, deletePromotionById, updatePromotion};