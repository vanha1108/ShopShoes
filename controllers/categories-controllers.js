const Category = require('../models/category');


const getAllCategory = async (req, res, next) => {
    let categories;
    try{
        categories = await Category.findAll();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "Something went wrong, coud not find any category"});
    }
  
    if(!categories) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any category"});
    }
    return res.status(200).json({code: 200, success: true, categories});
};

const createCategory = async (req, res, next) => {
    const {name, summary, groupCode} = req.body;

    if (name == "" || groupCode == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    let category = await Category.findOne({name});
    if (category != null ) {
        return res.status(409).json({code: 409, success: false, message: "Name of category is already exist!"});
    }

    var code = Util.getCode();
    while(!Category.findOne({code})) {
        code = Util.getCode();
    };

    const createdCategory = {
        code: code,
        name: name,
        summary: summary,
        groupCode: groupCode,
    };

    let categories = await Category.create(createdCategory);
    return res.status(200).json({ code: 200, success: true, categories });
};

const getCategoryByCode = async (req, res, next) => {
    const code = req.params.code;
    let categories;

    try{
        categories = await Category.findOne({code});
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any Category!"});
    }

    if(!categories)
    {
        return res.status(404).json({code: 404, success: false, message: "Could not find any category!"});
    }
    return res.status(200).json({ code: 200, success: true, categories});
};

const deleteCategoryByCode = async (req, res, next) => {
    const code = req.params.code;
    let categories;
    try{
        categories = await Category.findOneAndDelete({code});
    }
    catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any Category!"});
    }
    if(!categories) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any category!"});
    }
    return res.status(200).json({success: true,message: 'Deleted category:'});
    
}

const updateCategoryByCode = async (req, res, next) => {
    const code = req.params.code;
    const {name, summary, image, groupCode} = req.body;
     
    if (name == "" || groupCode == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    var updatedCategory = await Category.findOne({code});
    if (updatedCategory == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any category!"});
    }

    updatedCategory.name = name;
    updatedCategory.summary = summary;
    updatedCategory.image = image;
    updatedCategory.groupCode = groupCode;

    await Category.updateOne(updatedCategory, { code: code});
    return res.status(200).json({ code: 200, success: true , category: updatedCategory });
}

module.exports = { getAllCategory, getCategoryByCode, createCategory, deleteCategoryByCode, updateCategoryByCode};