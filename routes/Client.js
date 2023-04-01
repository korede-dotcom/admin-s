const routes = require("express").Router()
const managerControl = require("../controllers/Eventmanager")
const Gym = require("../controllers/Gymmanager")
const Hotel = require("../controllers/Hotelmanager")


routes.get("/event/pkg",managerControl.active)
        .get("/gym/pkg",Gym.getactivePkgs)
        .get("/hotel/pkg",Hotel.getActivePkgs)

module.exports = routes