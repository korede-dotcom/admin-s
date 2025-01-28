const routes = require("express").Router()
const hotemanagerControl = require("../controllers/Hotelmanager")
const {createHotelConfigValidator} = require("../middleware/validator")
const {protect} = require("../repos/token-repo")
const allowedUser = require("../middleware/Authorization")
const {checkHotelStatus} = require("../utils/Checkservicestatus")
const cloudinaryRepo = require("../repos/cloudinary")


    routes.post("/create",protect ,allowedUser([1,4,5]),checkHotelStatus,cloudinaryRepo._parser,createHotelConfigValidator,hotemanagerControl.createhotelpkg)
        .put("/update",protect ,allowedUser([1,4,5]),checkHotelStatus,createHotelConfigValidator,hotemanagerControl.updatehotelmpkg)
        .put("/booking",protect ,allowedUser([1,4,5]),checkHotelStatus,createHotelConfigValidator,hotemanagerControl.updatehotelmpkg)
        .get("/pkg",protect ,allowedUser([1,4,5,7]),checkHotelStatus,hotemanagerControl.getActivePkgs)
        .get("/pkg/available",protect ,allowedUser([1,4,5,7]),checkHotelStatus,hotemanagerControl.getAavailableRoom)
        .get("/pending/pkg",protect ,allowedUser([1,5,4]),checkHotelStatus,hotemanagerControl.getPendingPkgs)
        .get("/approve/pkg",protect ,allowedUser([1]),checkHotelStatus,hotemanagerControl.approve)
        .get("/bookings",protect ,allowedUser([1,4,5,7]),checkHotelStatus,hotemanagerControl.getBookings)
    routes.post("/bookroom",protect ,allowedUser([1,4,5,7]),checkHotelStatus,hotemanagerControl.bookRoom)

module.exports = routes