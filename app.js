const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const database = require('./config/database')
const authRouter = require('./routes/auth.js')
const checkingAccountRouter = require('./routes/checkingaccount.js')
const checkingAccountTransactionsRouter = require('./routes/checkingaccounttransactions.js')



dotenv.config()



const port = process.env.PORT


database()
const app = express()
app.use(cors())
app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use('/', authRouter)
app.use('/', checkingAccountRouter)
app.use('/', checkingAccountTransactionsRouter)


app.listen(port, () => {
    console.log('listening', port)
})
