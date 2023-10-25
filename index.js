const express = require('express')
require("dotenv").config();
var cors = require('cors')
const fs = require('fs')
const usersRoutes = require('./routes/v1/users.route')


const PORT = process.env.PORT || 5000
const app = express()


app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/user', usersRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})