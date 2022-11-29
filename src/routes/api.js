const express = require('express');

// const studentController = require("../controllers/student")

const { signup, signin, changePassword, selectProfile, updateProfile } = require('../controllers/student');

const { createToDoList, selectToDoList, updateToDoList, updateToDoStatus, removeToDoList, selectToDoListByStatus, selectToDoListByDate } = require('../controllers/toDoList');

const authVerify = require('../middlewares/authVerify');

const router = express.Router();


// router.post("/signup", studentController.createStudent);
router.post("/signup", signup);
router.post("/signin", signin);
//router.patch("/changePassword", changePassword);


router.get("/profile", authVerify, selectProfile);
router.patch("/updateProfile", authVerify, updateProfile);


router.post("/createToDo", authVerify, createToDoList);
router.get("/toDoLists", authVerify, selectToDoList);
router.patch("/updateToDo", authVerify, updateToDoList);
router.patch("/updateToDoStatus", authVerify, updateToDoStatus);
router.delete("/removeToDo", authVerify, removeToDoList);
router.get("/selectToDoByStatus", authVerify, selectToDoListByStatus);
router.get("/selectToDoByDate", authVerify, selectToDoListByDate);

module.exports = router;