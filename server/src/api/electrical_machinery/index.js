const express = require('express')
const router = express.Router()
const electricalMachineryHandler = require('./handler')
const { reg_btn_schema } = require('./schema')
const expressJoi = require('@escook/express-joi')

router.post('/btn', expressJoi(reg_btn_schema), electricalMachineryHandler.btn)

module.exports = router