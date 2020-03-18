const Event = require("../models/eventDbSchema.js");
const EventController = {};
EventController.create = function (req, res) {


    Event.create(
        {
            eventName: req.body.eventName,
            category: req.body.category,
            date: req.body.date,
            place: req.body.place,
            descirption: req.body.descirption

        },
        function (error, response) {
            if (error) {
                return res.send({
                    status: false,
                    message: "failed to create",
                    error: error
                });
            }
            res.redirect("/");
        }
    );
};

EventController.get = function (req, res) {
    console
    Event.find({}, function (err, event) {
        var events = event.map(event => event.toJSON())
        console.log(events);
        return res.render("eventList", {
            events: events

        });
    });
}
module.exports = EventController;