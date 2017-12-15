const responses = require('../models/responses')
const supportRequestService = require('../services/support-request.service')
const apiPrefix = '/api/support-requests'

module.exports = {
    readAll: _readAll,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}


function _readAll(req, res) {
    supportRequestService.readAll()
        .then(supportRequests => {
            console.log(supportRequests);
            res.send(supportRequests);})
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))})
}
function _readById(req, res) {
    supportRequestService.readById(req.params.id)
        .then(supportRequest => {
            console.log(supportRequest)
            res.send(supportRequest)})
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))})
}
function _create(req, res) {
    req.model.status = 'New'
    req.model.thread = []

    supportRequestService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = id
            res.status(201)
                .location(`${apiPrefix}/${id}`)
                .json(responseModel) })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err)) })
}
function _update(req, res) {
    supportRequestService
        .update(req.params.id, req.model)
        .then(supportRequest => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)})
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))})
}
function _delete(req, res) {
    supportRequestService
        .delete(req.params.id)
        .then((supportRequest) => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)})
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))})
}