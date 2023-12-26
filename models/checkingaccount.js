const mongoose = require('mongoose')

const CheckingAccountSchema = new mongoose.Schema({
    checking_account_title: {
        type: String,
        required: true,
    },
    checking_account_number: {
        type: String,
    },
    checking_account_email: {
        type: String,
    },
    checking_account_phone_number: {
        type: String,
    },
    checking_account_description: {
        type: String,
    },
    checking_account_balance: {
        type: Number,
    },
    date:{
        type:Date,
        default: new Date()
    }
});



var CheckingAccount = mongoose.model('Checkingaccounts', CheckingAccountSchema);
module.exports = CheckingAccount;