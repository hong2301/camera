const joi = require('joi')

const value = joi.number()

exports.reg_btn_schema = {
    body: {
        value,
    },
}
