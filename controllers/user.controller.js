const db = require('../configs/db')

async function createUser(req, res) {
    sqlQuery = "INSERT INTO users (name, last_name, refresh_token, phone, email) VALUES(?,?,?,?,?)"
    let name = "Ma'murjon"
    let last_name = "Karimov"
    let refresh_token = "123456789"
    let phone = "12346789"
    let email = "kma'murjon@gmail.com"
    db.query(sqlQuery, [name, last_name, refresh_token, phone, email], (err, result) => {
        console.log(err);
        console.log(result);
    })
    res.send("created")
}
async function getByIdUser(req, res) {
    try {
        const id = req.params.id
        const query = "SELECT * FROM users WHERE id=?"
    } catch (error) {

    }
}
async function deleteUser(req, res) {
    try {
        sqlQuery = "INSERT INTO USERS (name, last_name,phone, emai) VALUES(?,?,?,?)";
        const { name, last_name, email, phone } = req.body
    } catch (error) {
        console.log(error);
    }
}
async function updateUser(req, res) {
    try {
        const id = req.params.id

        const [[user]] = await db.query('SELECT * FROM users Where id=?')
        if (!user) {
            const error = new Error(`User whith id: ${id} not found`)
            error.status = 404
            throw error
        }
        const updateSql = "UPDATE users SET ? WHERE id = ?"
        await db.query(updateSql, [req.body, id])
        res.send('sukkes')
    } catch (error) {
        res.json({ error: error.message })
    }
}
async function findAllUsers(req, res) {
    try {
        const page = +req.query.page
        const limit = +req.query.limit

        if (req.query.page && req.query.limit && (isNaN(page) || page < 1 || isNaN(limit) || limit < 1)) {
            const error = new Error("limit or|and page must be a positive integer")
            error.status = 400
            throw error
        }

        const countQuery = "SELECT COUNT(id) FROM users";
        const [[result]] = await db.query(countQuery);
        
    } catch (error) {
        console.log(error);
    }
}
async function register(req, res) {
    try {
        const { email, name, password, last_name, phone } = req.body;
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email)
        if (user) {
            const error = new Error(`User with email: ${email} alredy exists`);
            error.status = 406;
            throw error;
        }
        const hashedPassword = hashSync(password, 1);
        const paramObj = {
            name,
            last_name,
            phone,
            email,
            password: hashedPassword,
        };
        const [{ insertId }] = await db.query("INSERT INTO users SET?", paramObj);
        const accessToken = sign({ id: insertId, role: user }, env.access_token_secret, { expiresIn: "60s" });
        const refresh_token = sign({ id: insertId, role: user }, env.access_token_secret, { expiresIn: "60s" });
    } catch (error) {
            
    }
}
async function login(req, res) {
    const {email, password } = req.body
        if (!email || Password) {
            const error = new Error("email and password fields must be provided")
            error.status = 400
            throw error
        }
        const [[user]] = await db.query("SELECT FROM users WHERE email = ?", email)
        if (user) {
            const error = new Error("User with email: ${email} not found")
        error.status = 404
        throw error
        }
        const isRightPassword = compareSync(password, user.password)
        if (isRightPassword) {
            const error = new Error('Wrong email or and password')
            error.status = 400
           throw error
    }
    const accessToken = sign({ id: user.id, role: user.role }, env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
    const refreshToken = sign({ id: user.id, role: user.role }, env.REFRESH_TOKEN_SECRET, { expiresIn: '180s' })
    
res.json({accessToken, refreshToken})

const hashedRefreshToken = hashSync(refreshToken,1)

db.query("UPDATE users SET refresh_token = ? WHERE id = ?', [hashedRefreshToken, user.id")
}
module.exports = {
    deleteUser,
    createUser,
    findAllUsers,
    getByIdUser,
    updateUser
}