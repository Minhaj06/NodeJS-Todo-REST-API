const toDoListModel = require("../models/toDoList");


// Create ToDoList
exports.createToDoList = (req, res) => {

    let email = req.headers['email'];
    let reqBody = req.body;
    reqBody.email = email;

    toDoListModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// Select ToDo List
exports.selectToDoList = (req, res) => {
    let email = req.headers['email'];

    toDoListModel.find({ email: email }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// Update ToDo List
exports.updateToDoList = (req, res) => {
    let _id = req.body['_id'];

    toDoListModel.updateOne({ _id: _id }, { $set: req.body }, { upsert: true }, (err, data) => {

        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// Update ToDo Status
exports.updateToDoStatus = (req, res) => {
    let _id = req.body['_id'];
    let toDoStatus = req.body['toDoStatus'];

    toDoListModel.updateOne({ _id: _id }, { $set: { 'toDoStatus': toDoStatus } }, { upsert: true }, (err, data) => {

        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// Remove ToDo
exports.removeToDoList = (req, res) => {
    let _id = req.body['_id'];

    toDoListModel.remove({ _id: _id }, (err, data) => {

        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// Select ToDo By Status
exports.selectToDoListByStatus = (req, res) => {
    let email = req.headers['email'];
    let toDoStatus = req.body['toDoStatus'];

    toDoListModel.find({ email: email, toDoStatus: toDoStatus }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// Select ToDo By Date
exports.selectToDoListByDate = (req, res) => {
    let email = req.headers['email'];
    let fromDate = req.body['fromDate'];
    let toDate = req.body['toDate'];

    toDoListModel.find({ email: email, createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) } }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};