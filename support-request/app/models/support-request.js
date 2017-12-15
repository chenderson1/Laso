const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    name: Joi.string().min(2).max(30).allow(null),
    _id: Joi.objectId(),
    email: Joi.string().email().max(64).allow(null),
    fromProfileId: Joi.objectId().allow(null),
    content:Joi.string().max(350),
    thread: Joi.array(),
}

module.exports = Joi.object().keys(schema).options({stripUnknown:true})