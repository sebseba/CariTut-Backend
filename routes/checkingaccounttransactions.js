const express = require('express')
const {checkingAccountTransactions, checkingAccountTransactionsDetail, checkingAccountTransactionsCreate, checkingAccountTransactionsDelete} = require('../controllers/checkingaccounttransactions.js')
const {userVerification} = require('../middleware/AuthMiddleware.js')

const router = express.Router()

router.get('/checkingaccounttransactions', userVerification, checkingAccountTransactions)
router.get('/checkingaccounttransactions/:id', checkingAccountTransactionsDetail)

router.post('/checkingaccounttransactions/create', checkingAccountTransactionsCreate)
router.delete('/checkingaccounttransactions/delete/:id', checkingAccountTransactionsDelete)

module.exports = router