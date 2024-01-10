
const express = require('express')
const env = require("./configs/env.config")
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route.js')


const app = express()
app.use(express.json())
app.use('/user', userRoute)
app.use('/auth',authRoute)

const port = env.PORT

app.listen(port, () => console.log(`Server is listening on port ${port}`))
