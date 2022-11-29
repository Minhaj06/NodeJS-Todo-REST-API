const mongoose = require("mongoose");

const toDoListSchema = mongoose.Schema({
    email: { type: String },
    toDoSubject: {
        type: String,
        required: [true, "ToDo subject required"],
    },
    toDoDescription: {
        type: String,
        required: [true, "ToDo description required"]
    },
    toDoStatus: { type: String, default: "new" },
}, {
    timestamps: true,
    versionKey: false
});


const toDoListModel = mongoose.model("toDoLists", toDoListSchema);
module.exports = toDoListModel;