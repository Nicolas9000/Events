const route = require("express").Router()
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller")

// api/user/*

route.post("/", authController.signIn)
route.get("/logout", authController.logOut)


route.get("/", userController.getUserInfo)
route.put("/description", userController.updateUser)


module.exports = route