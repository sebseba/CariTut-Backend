const mongoose = require('mongoose')

const CheckingAccountTransactionsSchema = new mongoose.Schema({
    checking_account_id: {
        type: String,
        required: true,
        ref: 'Checkingaccounts'
    },
    checking_account_transaction_type: {
        type: String,
    },
    checking_account_transaction_amount: {
        type: String,
    },
    checking_account_transaction_description: {
        type: String,
    },
    date:{
        type:Date,
        default: new Date()
    }
});



var CheckingAccountTransactions = mongoose.model('Checkingaccounttransactions', CheckingAccountTransactionsSchema);
module.exports = CheckingAccountTransactions;