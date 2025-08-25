const joi = require('joi')

const value = joi.string()

// 注册和登录表单的验证规则对象
exports.reg_echo_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        value,
    },
}
