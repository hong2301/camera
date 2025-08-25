const joi = require('joi')

const value = joi.string()

exports.reg_btn_schema = {
    body: {
        value,
    },
}
