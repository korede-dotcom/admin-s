const routes = require("express").Router()
const expensisControl = require("../controllers/Expensis")
const allowedUser = require("../middleware/Authorization")
const {todoListValidationRules} = require("../middleware/validator")
const {protect} = require("../repos/token-repo")

routes.get("/",protect,allowedUser([1,5,9,2]),expensisControl.getAll)
routes.post("/",protect,allowedUser([1,5,9,2]),expensisControl.create)

    //   .get("/pending",protect,allowedUser([1,5]),todoControl.pendingUsers)
    //   .get("/approve",protect,allowedUser([1]),todoControl.approve)
    //   .post("/create/ceo",validateUser,todoControl.createCEO)
    //   .post("/create",protect,allowedUser([1,2,3,4,5]),validatecreateAnyUser,todoControl.createUsers)


module.exports = routes;