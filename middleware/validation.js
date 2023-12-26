const Ajv = require("ajv")
const ajv = new Ajv({ allErrors: true })
const addFormats = require("ajv-formats")

require("ajv-errors")(ajv /*, {singleError: true} */)


ajv.addFormat("letter", /^[a-zA-ZiİçÇşŞğĞÜüÖö]*$/)
ajv.addFormat("number", /^[0-9]*$/)
ajv.addFormat("spacialpassword", /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

const emailClientMessage = "Geçerli bir e-posta adresi girilmelidir !"
const passwordClientMessage = "Şifre en az 8 en fazla 20 karakter ve en az bir özel karakter içermelidir!"
const requiredClientMessage = "Zorunlu alanlar doldurulmalıdır!"
const additionalPropertiesClientMessage = "Ek alanlar gönderilmemelidir!"
const nameClientMessage = "Ad alanı en az 3 en fazla 20 karakter olmalı, rakam ve özel karakter içermemelidir!"
const surnameClientMessage = "Soyad alanı en az 3 en fazla 20 karakter olmalı, rakam ve özel karakter içermemelidir!"
const mobileClientMessage = "Mobil alanı 10 karakter olmalıdır!"

addFormats(ajv)

const registerSchema = {
    type: "object",
    properties: {
        name: { type: "string", format: "letter", maxLength: 20, minLength: 3 },
        surname: { type: "string", format: "letter", maxLength: 20, minLength: 3 },
        mobile: { type: "string", format: "number", maxLength: 10, minLength: 10 },
        email: { type: "string", format: "email" },
        password: { type: "string", format: "spacialpassword", minLength: 8, maxLength: 20 },
    },
    required: ["name", "surname", "mobile", "email", "password"],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: additionalPropertiesClientMessage,
        properties: {
            name: nameClientMessage,
            surname: surnameClientMessage,
            mobile: mobileClientMessage,
            email: emailClientMessage,
            password: passwordClientMessage,
        },
        required: requiredClientMessage,

    },
}


//VALIDATION
const loginSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", format: "spacialpassword", minLength: 8, maxLength: 20 },
    },
    required: ["email", "password"],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: additionalPropertiesClientMessage,
        properties: {
            email: emailClientMessage,
            password: passwordClientMessage
        },
        required: requiredClientMessage

    },
}

module.exports = { registerSchema, loginSchema, ajv }
