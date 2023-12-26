const CompaniesSchema = require('../models/companies.js')

const companies = async(req,res) => {

    try {
        const list = await CompaniesSchema.find().sort({"_id": -1})

        res.status(200).json({
            list
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}



const companiesDetail = async(req,res) => {

    try {
        const {id} = req.params
        const detail = await CompaniesSchema.findById(id)
        res.status(200).json({
            detail
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}


const companiesCreate = async(req,res) => {

    try {
        const newPost = await CompaniesSchema.create(req.body)
        res.status(201).json({
            message: "Kaydedildi!",
            newPost
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

const companiesUpdate = async(req,res) => {

    try {
        const {id} = req.params
        const updatePost = await CompaniesSchema.findByIdAndUpdate(id, req.body, {new:true})

        res.status(201).json({
            updatePost
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

const companiesDelete = async(req,res) => {

    try {
        const {id} = req.params
        const deletePost = await CompaniesSchema.findByIdAndRemove(id)


        res.status(201).json({
            message: "Silme işlemi başarılı !",
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

module.exports = {companies, companiesDetail, companiesCreate, companiesUpdate, companiesDelete}