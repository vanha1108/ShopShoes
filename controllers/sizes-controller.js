const Size = require('../models/size');

const getAllSize = async (req, res, next) => {
    let sizes;
    try{
        sizes = await Size.find();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any size!"});
    }

    if(!sizes)
    {
        return res.status(404).json({code: 404, success: false, message: "Could not find any size!"});
    }
    return res.status(200).json({code: 200, success: true, sizes});
};


const getAllSizeByType = async (req, res, next) => {
    const sizeType = req.params.sizeType;
    let listSize;

    try{
        listSize = await Size.findOne({ sizeType });
    }
    catch(err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any size!"});
    }

    if(!listSize)
    {
        return res.status(404).json({code: 404, success: false, message: "Could not find any size!"});
    }
    return res.status(200).json({code: 200, success: true, listSize});
}

const createSize = async (req, res, next) => {
    const {sizeName, sizeType} = req.body;

    if (sizeName == "" || sizeType == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    var code = Util.getCode();
    while(!Size.findOne({code})) {
        code = Util.getCode();
    };

    const createdSize = {
        code: code,
        sizeName: sizeName,
        sizeType: sizeType
      };
    let sizes = await Size.create(createdSize);
    return res.status(200).json({code: 200, sucess: true, sizes});
};


const deleteSizeByCode = async (req, res, next) => {
    const code = req.params.code;
    let sizes;

    try{
        sizes = await Size.findOne({code});
    }
    catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any size!"});
    }

    if(!sizes)
    {
        return res.status(404).json({code: 404, success: false, message: "Could not find any size!"});
    }
    return res.status(200).json({code: 200, sucess: true, message: 'Deleted Size:'}); 
}

const updateSize = async (req, res, next) => {
    const code = req.params.code;
    const {sizeName, sizeType} = req.body;

    if (sizeName == "" || sizeType == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    let size = await Size.findOne({code});
    if (size == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any size!"});
    }

    size.sizeName = sizeName;
    size.sizeType = sizeType;

    await Size.updateOne(size, {code});
    return res.status(200).json({code: 200, sucess: true, size}); 
}

module.exports = { getAllSize, createSize, deleteSizeByCode, updateSize, getAllSizeByType};