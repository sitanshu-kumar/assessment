const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        emailId: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
    },
    {
        collection: "userevent"
    }
);

const Userevent = mongoose.model("Userevent", UserSchema);
module.exports = Userevent;