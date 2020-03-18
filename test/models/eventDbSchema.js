const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true,
            unique: true
        },
        place: {
            type: String,
            default: "true"
        },
        descirption: {
            type: String,
            required: true
        },



    },
    {
        collection: "event"
    }
);


const Event = mongoose.model("Event", EventSchema);
module.exports = Event;