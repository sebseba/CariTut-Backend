const express = require('express')
const {companies, companiesDetail, companiesCreate, companiesUpdate, companiesDelete} = require('../controllers/companies.js')

const router = express.Router()

router.get('/companies', companies)
router.get('/companies/:id', companiesDetail)

router.post('/companies/create', companiesCreate)
router.patch('/companies/update/:id', companiesUpdate)
router.delete('/companies/delete/:id', companiesDelete)

module.exports = router