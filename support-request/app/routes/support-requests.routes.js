const router = require('express').Router()
const supportRequestsController = require('../controllers/support-requests.controller.js')
const validateBody = require('../filters/validate.body')
const SupportRequest = require('../models/support-request')
const requireId = require('../filters/crud.filters').requireId
const validateIdMatch = require('../filters/crud.filters').validateIdMatch
const disallowId = require('../filters/crud.filters').disallowId


module.exports= router

/// api routes =======================

router.get('/', supportRequestsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', supportRequestsController.readById)
router.post('/', validateBody(SupportRequest), disallowId, supportRequestsController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(SupportRequest), validateIdMatch,requireId, supportRequestsController.update)
router.delete('/:id([0-9a-fA-F]{24})',supportRequestsController.delete)