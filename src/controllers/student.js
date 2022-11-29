const studentModel = require("../models/student");
const jwt = require('jsonwebtoken');


// User Registration
exports.signup = (req, res) => {
    let reqBody = req.body;
    studentModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// User Login
exports.signin = (req, res) => {
    let email = req.body['email'];
    let password = req.body['password'];

    studentModel.find({ email: email, password: password }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            if (data.length > 0) {

                let payload = {
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data: data[0]
                }
                let token = jwt.sign(payload, process.env.SECRET);

                res.status(200).json({ status: "success", token: token, data: data });
            } else {
                res.status(401).json({ status: "unauthorized" });
            }
        }
    });
};


// Change Password
// exports.changePassword = (req, res) => {
//     let email = req.body['email'];
//     let oldPassword = req.body['oldPassword'];
//     let newPassword = req.body['newPassword'];


//     studentModel.updateOne({ email: email, password: oldPassword }, { $set: { password: newPassword } }, (err, data) => {
//         if (err) {
//             res.status(400).json({ status: "fail", data: err })
//         } else {
//             res.status(200).json({ status: "success", data: data });
//         }
//     });
// };


// Select Student Profile
exports.selectProfile = (req, res) => {
    let email = req.headers['email'];

    studentModel.find({ email: email }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};


// Update Student Profile
exports.updateProfile = (req, res) => {
    let email = req.headers['email'];

    studentModel.updateOne({ email: email }, { $set: req.body }, { upsert: true }, (err, data) => {

        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};