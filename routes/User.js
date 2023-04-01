const routes = require("express").Router()
const usersControl = require("../controllers/User")
const allowedUser = require("../middleware/Authorization")
const {validateUser,validatecreateUser,validatecreateAnyUser} = require("../middleware/validator")
const {protect} = require("../repos/token-repo")

routes.get("/",protect,allowedUser([1]) ,usersControl.getUsers)
      .get("/pending",protect,allowedUser([1,5]),usersControl.pendingUsers)
      .get("/approve",protect,allowedUser([1]),usersControl.approve)
      .post("/create/ceo",validateUser,usersControl.createCEO)
      .post("/create",protect,allowedUser([1,2,3,4,5]),validatecreateAnyUser,usersControl.createUsers)


module.exports = routes