const express = require('express');
const productRoute = express.Router();
const { findALLProduct, updateProduct, findByidProduct, deleteProduct, createProduct } = require("../controllers/product.cntroller");
const authGuard = require('../middlewares/auth.guard');
const roleGuard = require('../middlewares/role.guard');

productRoute.use(authGuard);
productRoute.post("/",roleGuard("user", "admin"), createProduct);
productRoute.get("/", findALLProduct);
productRoute.patch("/:id", updateProduct);
productRoute.delete("/:id",roleGuard("admin"), deleteProduct);
productRoute.get("/:id", findByidProduct);


module.exports = productRoute;