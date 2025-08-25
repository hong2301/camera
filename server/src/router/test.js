const express = require('express')
const router = express.Router()

// 导入测试路由处理函数模块
const testHandler = require('../router_handler/test')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_echo_schema } = require('../schema/test')

router.post('/echo', expressJoi(reg_echo_schema), testHandler.echo)

module.exports = router