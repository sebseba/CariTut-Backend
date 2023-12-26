const CheckingAccountSchema = require('../models/checkingaccount.js')
const CheckingAccountTransactionsSchema = require('../models/checkingaccounttransactions.js')

const checkingAccounts = async(req,res) => {

    let query = {}

    if(req.query.checking_account_balance === '1'){
        query = 
        {
            checking_account_balance: { $gt: 0 },
        }
    }

    if(req.query.checking_account_balance === '2'){
        query = 
        {
            checking_account_balance: { $lt: 0 },
        }
    }
   

    try {
        const list = await CheckingAccountSchema.find(query).sort({"_id": -1})

        res.status(200).json({
            list
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}



const checkingAccountsDetail = async(req,res) => {

    try {
        const {id} = req.params
        const detail = await CheckingAccountSchema.findById(id)
        res.status(200).json({
            detail
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}


const checkingAccountsCreate = async(req,res) => {

    try {
        const newPost = await CheckingAccountSchema.create(req.body)
        res.status(201).json({
            message: "Kaydedildi!",
            newPost
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

const checkingAccountsUpdate = async(req,res) => {

    try {
        const {id} = req.params
        const updatePost = await CheckingAccountSchema.findByIdAndUpdate(id, req.body, {new:true})
        console.log('update', req.body)

        res.status(201).json(
            updatePost
        )
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

const checkingAccountsDelete = async(req,res) => {

    try {
        const {id} = req.params
        const deletePost = await CheckingAccountSchema.findByIdAndRemove(id)
        const deleteTransactions = await CheckingAccountTransactionsSchema.deleteMany({ checking_account_id: id })


        res.status(201).json({
            message: "Silme işlemi başarılı !",
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

module.exports = {checkingAccounts, checkingAccountsDetail, checkingAccountsCreate, checkingAccountsUpdate, checkingAccountsDelete}