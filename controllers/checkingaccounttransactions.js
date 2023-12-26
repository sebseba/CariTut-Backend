const CheckingAccountTransactionsSchema = require('../models/checkingaccounttransactions.js')
const CheckingAccountSchema = require('../models/checkingaccount.js')

const checkingAccountTransactions = async(req,res) => {

    let query = {}

    if(req.query.checking_account_transaction_type){
        query = 
        {
            checking_account_transaction_type: req.query.checking_account_transaction_type
        }
    }

    

    try {
        const list = await CheckingAccountTransactionsSchema.find(query).populate('checking_account_id').sort({"_id": -1})

        res.status(200).json({
            list
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}



const checkingAccountTransactionsDetail = async(req,res) => {

    try {
        const {id} = req.params
        const detail = await CheckingAccountTransactionsSchema.findById(id)
        res.status(200).json({
            detail
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}


const checkingAccountTransactionsCreate = async(req,res) => {

    try {
        const detail = await CheckingAccountSchema.findById(req.body.checking_account_id)

        if(req.body.checking_account_transaction_type === "1"){
            detail.checking_account_balance += +req.body.checking_account_transaction_amount
        }

        if(req.body.checking_account_transaction_type === "2"){
            detail.checking_account_balance -= req.body.checking_account_transaction_amount
        }

        console.log('Title:', detail.checking_account_title)
        console.log('Balance', detail.checking_account_balance)

        const updatePost = await CheckingAccountSchema.findByIdAndUpdate(req.body.checking_account_id, {"checking_account_balance": detail.checking_account_balance}, {new:false})
        
        const newPost = await CheckingAccountTransactionsSchema.create(req.body)
        res.status(201).json({
            message: "Kaydedildi!",
            newPost
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})

    }


}



const checkingAccountTransactionsDelete = async(req,res) => {

    try {

        const {id} = req.params

        const detailCheckingAccountTransaction = await CheckingAccountTransactionsSchema.findById(id)

        const detailCheckingAccount = await CheckingAccountSchema.findById(detailCheckingAccountTransaction.checking_account_id)


        if(detailCheckingAccountTransaction.checking_account_transaction_type === "1"){
            detailCheckingAccount.checking_account_balance -= detailCheckingAccountTransaction.checking_account_transaction_amount
        }

        if(detailCheckingAccountTransaction.checking_account_transaction_type === "2"){
            detailCheckingAccount.checking_account_balance += +detailCheckingAccountTransaction.checking_account_transaction_amount
        }

        console.log('Action-Delete:', detailCheckingAccount.checking_account_title)
        console.log('Title:', detailCheckingAccount.checking_account_title)
        console.log('New Balance:', detailCheckingAccount.checking_account_balance)

        const updatePost = await CheckingAccountSchema.findByIdAndUpdate(detailCheckingAccountTransaction.checking_account_id, {"checking_account_balance": detailCheckingAccount.checking_account_balance}, {new:false})

        const deletePost = await CheckingAccountTransactionsSchema.findByIdAndRemove(id)

        res.status(201).json({
            message: "Silme işlemi başarılı !",
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

module.exports = {checkingAccountTransactions, checkingAccountTransactionsDetail, checkingAccountTransactionsCreate, checkingAccountTransactionsDelete}