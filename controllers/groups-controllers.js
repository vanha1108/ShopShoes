const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const Group = require('../models/group');
const { validationResult } = require('express-validator'); //lấy dc lỗi từ body validate
const Sequelize = require('sequelize');
const { getAlias, decodeAlias } = require("../middleware/utilities");

const getAllGroup = async (req, res, next) => {
    let Groups;
    try {
        Groups = await Group.findAll();
    } catch (err) {
        const error = new HttpError(
            "System goes wrong, coud not find any Group",
            500
        );
        return next(error);
    }
    if (!Groups) {
        const error = new HttpError("Could not find any Group", 204);
        return next(error);
    }
    res.status(200).json({
        success: true,
        Groups,
    });
};

//
const createGroup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next(errors);
    }
    let image;
    if (typeof req.file !== "undefined") {
        image = req.file.path;
    } else image = null;

    if (image === null) {
        const createdGroup = {
            name: req.body.name,
            summary: req.body.summary,
            alias: getAlias(req.body.name)
        };
        let Groups;
        Groups = await Group.create(createdGroup);
        res.status(201).json({
            success: true,
            Groups,
        });
    } else {
        const createdGroup = {
            name: req.body.name,
            imagePath: req.file.path,
            summary: req.body.summary,
            alias: getAlias(req.body.name)
        };
        let Groups;
        Groups = await Group.create(createdGroup);
        res.status(201).json({
            success: true,
            Groups,
        });
    }
};

//
const getGroupByAlias = async (req, res, next) => {
    const GroupAlias = req.params.alias;
    let Groups;
    try {
        Groups = await Group.findOne({ alias: GroupAlias });
    } catch (err) {
        const error = new HttpError(
            "System went wrong, coud not find any Group",
            500
        );

        return next(error);
    }

    if (!Groups) {
        const error = new HttpError("Could not find any Group", 204);

        return next(error);
    }
    res.status(200).json({
        success: true,
        Groups,
    });
};

//
const getGroupById = async (req, res, next) => {
    const groupId = req.params.groupId;
    let Groups;
    try {
        Groups = await Group.findById(groupId);
    } catch (err) {
        const error = new HttpError(
            "System went wrong, coud not find any Group",
            500
        );
        let errReturn;
        errReturn = {
            fail: "SYSF01",
            error,
        };
        return next(errReturn);
    }

    if (!Groups) {
        const error = new HttpError("Could not find any Group", 204);
        let errReturn;
        errReturn = {
            fail: "USERF01",
            error,
        };
        return next(errReturn);
    }
    res.status(200).json({
        success: true,
        Groups,
    });
};

//
const deleteGroupById = async (req, res, next) => {
    const groupId = req.params.groupId;
    let Groups;
    try {
        Groups = await Group.findByIdAndDelete({ id: groupId });
    } catch (err) {
        const error = new HttpError("System went wrong, can not delete", 500);
        return next(error);
    }

    if (!Groups) {
        const error = new HttpError("Could not find any Group for delete", 204);
        return next(error);
    }
    res.status(200).json({ success: true ,message: "Deleted Group:" });
};

const updateGroupById = async (req, res, next) => {
    const groupId = req.params.groupId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError("Invalid Input! Pls check your data", 400);

        return next(error);
    }
    //Kiểm tra có chèn ảnh ko
    let image;
    if (typeof req.file !== "undefined") {
        image = req.file.path;
    } else image = null;

    if (image === null) {
        const updatedGroup = {
            name: req.body.name,
            summary: req.body.summary,
            alias: getAlias(req.body.name)
        };
        let Groups;
        Groups = await Group.updateOne(updatedGroup, { alias: GroupAlias });
        res.status(200).json({ success: true ,Groups: updatedGroup });
    } else {
        const updatedGroup = {
            name: req.body.name,
            imagePath: req.file.path,
            summary: req.body.summary,
            alias: getAlias(req.body.name)
        };
        let Groups;
        Groups = await Group.updateOne(updatedGroup, { alias: GroupAlias });
        res.status(200).json({success: true ,Groups: updatedGroup });
    }
};

module.exports = { getAllGroup, getGroupByAlias, getGroupById, createGroup, updateGroupById, deleteGroupById};