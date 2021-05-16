const Group = require('../models/group');
const Util = require('../utils/generateCode');

const getAllGroup = async (req, res, next) => {
    let Groups;
    try {
        Groups = await Group.find();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any group!"});
    }
    if (!Groups) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any Group!"});
    }
    return res.status(200).json({code: 200, success: true, Groups});
};

const createGroup = async (req, res, next) => {
    const {name, summary} = req.body;

    if (name == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }

    let group = await Group.findOne({name});
    if(group != null) {
        return res.status(409).json({code: 409, success: false, message: "Name of group is already exist!"});
    }

    var code = Util.getCode();
    while(!Group.findOne({code})) {
        code = Util.getCode();
    };
    const createdGroup = {
        code: code,
        name: name,
        summary: summary,
    };

    let groups = await Group.create(createdGroup);
    return res.status(200).json({ code: 200, success: true, groups })
};

const getGroupByCode = async (req, res, next) => {
    const code = req.params.code;
    let Groups;

    try {
        Groups = await Group.findOne({code});
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any group!"});
    }

    if (!Groups) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any Group!"})
    }
    return res.status(200).json({code: 200, success: true, Groups});
};

const deleteGroupByCode = async (req, res, next) => {
    const code = req.params.code;
    let Groups;
    try {
        Groups = await Group.findOneAndDelete({ code });
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not delete any group!"});
    }

    if (!Groups) {
        return res.status(404).json({code: 404, success: false, message: "Coud not find any group!"});
    }
    return res.status(200).json({ code: 200, success: true , message: "Deleted Group:" });
};

const updateGroupByCode = async (req, res, next) => {
    const code = req.params.code;
    const {name, summary} = req.body;

    if (name == "") {
        return res.status(400).json({code: 400, success: false, message: "Invalid Input! Pls check your data"});
    }
    
    var updatedGroup = await Group.findOne({code});
    if (updatedGroup == null) {
        return res.status(404).json({code: 404, success: false, message: "Group not found"});
    }
    updatedGroup.name = name;
    updatedGroup.summary = summary;

    await updatedGroup.save();
    return res.status(200).json({ code: 200, success: true , group: updatedGroup });
};

module.exports = { getAllGroup, getGroupByCode, createGroup, updateGroupByCode, deleteGroupByCode};