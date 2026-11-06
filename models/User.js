const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "kunde"],
        default: "kunde",
        required: true
    }
})

const user = mongoose.model("user", userSchema);

module.exports = user;