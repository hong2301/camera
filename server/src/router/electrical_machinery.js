const express = require('express')
const router = express.Router()

const electricalMachineryHandler = require('../router_handler/electrical_machinery')
const expressJoi = require('@escook/express-joi')
const { reg_btn_schema } = require('../schema/electrical_machinery')

router.post('/btn', expressJoi(reg_btn_schema), electricalMachineryHandler.btn)

module.exports = router