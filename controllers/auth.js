const UserSchema = require('../models/user')
const jwt = require('jsonwebtoken')
const validation = require('../middleware/validation')


const register = async (req, res) => {

 
    const validate = validation.ajv.compile(validation.registerSchema)

    const valid = validate(req.body)

    if (!valid) return res.status(500).json({ message: validate.errors[0].message })


    try {

        const { name, surname, mobile, email, password } = req.body


        const user = await UserSchema.findOne({ email })

        if (user) {

            return res.status(500).json(
                {
                    message: "Girilen E-Posta Kayıtlıdır !"
                }
            )

        } else {

            const newUser = await UserSchema.create({ name, surname, mobile, email, password })

            return res.status(200).json(
                {
                    message: "Kullanıcı Kaydedildi !"
                }
            )

        }


    } catch (error) {

        console.log(error)

        return res.status(500).json({ message: error.message })

    }

}

const login = async (req, res) => {

    const validate = validation.ajv.compile(validation.loginSchema)

    const valid = validate(req.body)

    if (!valid) return res.status(500).json({ message: validate.errors[0].message })


    try {

        const { email, password } = req.body

        const user = await UserSchema.findOne({ email, password })

        if (user) {

            var token_ = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    mobile: user.mobile,
                    email: user.email
                }, 
                'BURAYA_SECRET_KEY_YAZILACAK',
                {
                    expiresIn: '1h' // expires in 1 hour
                }
                );

            return res.status(200).json(
                {
                    message: "Kullanıcı Bulundu !",
                    access_token: token_
                }
            )

        } else {

            return res.status(500).json(
                {
                    message: "Kullanıcı Bulunamadı !",
                }
            )

        }


    } catch (error) {

        console.log(error)

        return res.status(500).json({ message: error.message })

    }

}

const userDetail = async (req, res) => {


    try {

        const { email, password } = req.body

        const user = await UserSchema.findOne({ email, password })

        if (user) {

            var token_ = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    mobile: user.mobile,
                    email: user.email
                }
                , 'sptec');

            return res.status(200).json(
                {
                    message: "Kullanıcı Bulundu !",
                    access_token: token_
                }
            )

        } else {

            return res.status(500).json(
                {
                    message: "Kullanıcı Bulunamadı !",
                }
            )

        }


    } catch (error) {

        console.log(error)

        return res.status(500).json({ message: error.message })

    }

}

module.exports = { register, login }