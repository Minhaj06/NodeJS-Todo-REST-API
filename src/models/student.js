const mongoose = require("mongoose");
const validator = require("validator");


const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: [true, "Email already exists"],
        required: [true, "Email address is required"]
    },
    mobile: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid mobile number"],
        required: [true, "Mobile number is required"],
    },
    department: {
        type: String,
        enum: ["computer", "civil", "electrical", "electronics", "mechatronics"],
        required: [true, "Please select your department"],
    },
    shift: {
        type: String,
        enum: ["first", "second"],
        required: [true, "Please select your shift"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            message: "Password {VALUE} is not strong enough.",
        },
    }

}, {
    timestamps: true,
    versionKey: false
});


const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;