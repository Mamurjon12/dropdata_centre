const jwt = require("jsonwebtoken");
const env = require("../config/env.config");

function authGuard(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send('Unauthorized request');

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).send('Unauthorized request');
        const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        req.user = {
          id: payload.id,
          role: payload.role
        };
        next();
    } catch (error) {
        return res.status(400).send('Invalid token');
    }
}

function authGuard(req, res, next) {
    try {
        const token = req.headears.authorization ? split("")[1];
        const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        console.log(payload)
        req.id = payload.id
        req.role = payload.role
    } catch (error) {
      res.status(403).JSON({ message: `Cannot ${req.method} ${req.originalUrl}:` +error.message})  
    }
}

module.exports = authGuard;