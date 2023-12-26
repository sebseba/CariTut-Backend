const mongoose = require('mongoose')

const CompaniesSchema = new mongoose.Schema({
    company_title: {
        type: String,
        required: true,
    },
    company_number: {
        type: String,
    },
    company_email: {
        type: String,
    },
    company_phone_number: {
        type: String,
    },
    company_faks: {
        type: String,
    },
    company_adress: {
        type: String,
    },
    company_country: {
        type: String,
    },
    company_city: {
        type: String,
    },
    company_district: {
        type: String,
    },
    date:{
        type:Date,
        default: new Date()
    }
});



var Companies = mongoose.model('Companies', CompaniesSchema);
module.exports = Companies;