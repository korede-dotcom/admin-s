const routes = require("express").Router()
const hotemanagerControl = require("../controllers/Hotelmanager")
const {createHotelConfigValidator} = require("../middleware/validator")
const {protect} = require("../repos/token-repo")
const allowedUser = require("../middleware/Authorization")
const {checkHotelStatus} = require("../utils/Checkservicestatus")

routes.post("/create",protect ,allowedUser([1,4,5]),checkHotelStatus,createHotelConfigValidator,hotemanagerControl.createhotelpkg)
        .put("/update",protect ,allowedUser([1,4,5]),checkHotelStatus,createHotelConfigValidator,hotemanagerControl.updatehotelmpkg)
        .get("/pkg",protect ,allowedUser([1,4,5]),checkHotelStatus,hotemanagerControl.getPkgs)
        .get("/pending/pkg",protect ,allowedUser([1,5,4]),checkHotelStatus,hotemanagerControl.getPendingPkgs)
        .get("/approve/pkg",protect ,allowedUser([1]),checkHotelStatus,hotemanagerControl.approve)

module.exports = routes