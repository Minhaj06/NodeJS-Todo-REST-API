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