function roleguard(...roles) {
    return function (req, res, next) {
        if (roles.includes(req.role)) {
            next()
            return
        }  
        res.status(403).json({ message: `You have no right to ${req.method} to ${req.ordinalUrl}`})    
    }
}

module.exports = roleguard