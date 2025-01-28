const routes = require("express").Router()
const managerControl = require("../controllers/Eventmanager")
const Gym = require("../controllers/Gymmanager")
const client = require("../controllers/Client")
const Hotel = require("../controllers/Hotelmanager")
const {bookEvent} = require("../middleware/validator")

routes.get("/event/pkg",managerControl.active)
        .get("/gym/pkg",Gym.getactivePkgs)
        .get("/hotel/pkg",Hotel.clientHotelRoom)
        .get("/validate/date",client.validatedate)
        .post("/book/event",managerControl.bookForClient)

module.exports = routes