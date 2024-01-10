const express = require('express')
const { createUser, findAllUsers, getByIdUser, updateUser, deleteUser } = require("../controllers/user.controller");
const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/", findAllUsers);
userRoute.get("/:id", getByIdUser);
userRoute.delete("/:id", deleteUser);
userRoute.patch("/:id", updateUser);

module.exports = userRoute;