const { hashSync, compareSync } = require('bcrypt')
const db = require("../configs/db")
const { sign } = require('jsonwebtoken')
const env = require("../configs/env.config")
const jwt = require('jsonwebtoken')


async function register(req, res) {
    try {
        const { email, password } = req.body
        const [[user]] = await db.query("SELECT * FROM users WHERE email=?", [email])
        if (user) {
            const error = new Error(`bunday foydalanuvchi mavjud:${email}`)
            error.status = 406
            throw error
        }
        const hashedPassword = hashSync(password, 1)
        const obyektObj = {
            email,
            password: hashedPassword
        }


        const [{ insertId }] = await db.query("INSERT INTO users SET ?", obyektObj);
        const accessToken = sign({ id: insertId, role: 'user' }, env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
        const refreshToken = sign({ id: insertId, role: 'user' }, env.REFRESH_TOKEN_SECRET, { expiresIn: "180s" });
        res.json({refreshToken, accessToken})

    } catch (error) {
        console.error(error.message);
        res.status(error.status || 500).json({ error: 'Foydalanuvchi yaratib bolmadi: ' + error.message });

    }
}




async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email  ||!password) {
            const error = new Error("email va parol kosatilsin")
            error.status = 400
            throw error
        }

        const [[user]] = await db.query("SELECT * FROM users WHERE email=?", email)
        if (!user) {
            const error = new Error(`bunday  ${email}  email bilan foydalanuvchi topilmadi`)
            error.status = 404
            throw error
        }
        const isRightPassword = compareSync(password, user.password)
        if (!isRightPassword) {
            const error = new Error("email yoki parol xato")
            error.status = 400
            throw error
        }
        const accesToken = sign({ id: user.id, role: user.role }, env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" })
        const refreshToken = sign({ id: user.id, role: user.role }, env.REFRESH_TOKEN_SECRET, { expiresIn: "180s" })
        res.json({ refreshToken, accesToken })
        const hashedRefreshToken = hashSync(refreshToken, 1)
        db.query('UPDATE users SET refresh_token=? WHERE id=?', [hashedRefreshToken, user.id]);
    } catch (error) {
        res.send({ error: error.message })
    }
}
function logout(req, res) { }
function refresh(req, res) { }


module.exports = {login,logout,refresh,register}