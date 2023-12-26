const express = require('express')
const {checkingAccounts, checkingAccountsDetail, checkingAccountsCreate, checkingAccountsUpdate, checkingAccountsDelete} = require('../controllers/checkingaccounts.js')
const {userVerification} = require('../middleware/AuthMiddleware.js')

const router = express.Router()

router.get('/checkingaccounts', userVerification, checkingAccounts)
router.get('/checkingaccounts/:id', userVerification, checkingAccountsDetail)

router.post('/checkingaccounts/create', userVerification ,checkingAccountsCreate)
router.patch('/checkingaccounts/update/:id', userVerification, checkingAccountsUpdate)
router.delete('/checkingaccounts/delete/:id', userVerification, checkingAccountsDelete)

module.exports = router