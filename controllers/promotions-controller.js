const Promotion = require('../models/promotion');
const Util = require('../utils/generateCode');

const getAllPromotion = async (req, res, next) => {
    let promotions;
    try{
        promotions = await Promotion.find();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any promotion!"});
    }

    if(!promotions)
    {
        return res.status(404).json({code: 404, success: false, message: "Could not find any promotion!"});
    }
    return res.status(200).json({code: 200, success: true, promotions});
};

const createPromotion = async (req, res, next) => {
    const {value, startDate, endDate} = req.body;

    var code = Util.getCode();
    while(!Promotion.findOne({code})) {
        code = Util.getCode();
    };

    const createdPromotion = {
        code: code,
        value: value,
        startDate: startDate,
        endDate: endDate
      };
    let promotions = await Promotion.create(createdPromotion);
    return res.status(200).json({code: 200, success: true, promotions});
};

const deletePromotionByCode = async (req, res, next) => {
    const code = req.params.code;
    let promotions;
    try{
        promotions = await Promotion.findByIdAndDelete({code});
    }
    catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any promotion!"});
    }
    if(!promotions)
    {
        return res.status(404).json({code: 404, success: false, message: "Could not find any promotion!"});
    }
    return res.status(200).json({code: 200, success: true, message: 'Deleted Promotion:'});
    
}

const updatePromotion = async (req, res, next) => {
    const code = req.params.code;
    const {value, startDate, endDate} = req.body;

    let promotion = await Promotion.findOne({code});
    if (promotion == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any promotion!"});
    }
    promotion.value = value;
    promotion.startDate = startDate;
    promotion.endDate = endDate;

    await promotion.save();
    return res.status(200).json({code: 200, success: true, promotion: promotion}); 
}

module.exports = { getAllPromotion, createPromotion, deletePromotionByCode, updatePromotion};