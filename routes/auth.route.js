const express =require("express")

const {register,refresh,login,logout}=require('../controllers/auth.controller.js')
const authRoute = express.Router()


authRoute.post("/register", register)
authRoute.post("/login", login)
authRoute.post("/logout", logout)
authRoute.post("/refresh", refresh)






module.exports = authRoute