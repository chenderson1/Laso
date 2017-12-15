const model = require('../models/support-request')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: _readAll,
    readById: _readById,
    create: _create,
    update:_update,
    delete: _delete
}

function _readAll() {
    return conn.db().collection('supportRequests').find({dateDeactivated:null}).toArray()
        .then(supportRequests => {
            for (var i = 0; i < supportRequests.length; i++) {
                supportRequests[i]._id = supportRequests[i]._id.toString()
                supportRequests[i].fromProfileId = supportRequests[i].fromProfileId.toString()
            }
            return supportRequests
        })
}

function _create(model) {
    return conn.db().collection('supportRequests').insert({
            status: 'New',
            name: model.name,
            email: model.email,
            content: model.content,
            thread:[],
            dateCreated:new Date(),
            dateModified: null,
            fromProfileId: ObjectId(model.fromProfileId),
            dateDeactivated: null
    })
        .then(supportRequest => {
            console.log("inserted from services")
            supportRequest.insertedIds[0].toString()
        })
}
function _readById(id) {
    return conn.db().collection('supportRequests').findOne({ _id: ObjectId(id), dateDeactivated: null})
        .then(supportRequest => {
            console.log(supportRequest.id);
            return supportRequest
        })
}
function _update(id, doc) {
    return conn.db().collection('supportRequests').updateOne( 
        { _id: ObjectId(id)}, 
        {
            $set:{
                name: doc.name,
                email: doc.email,
                content: doc.content,
                dateModified: new Date()
            }

        })
        .then(result => {
            console.log("updated from service bruh");
            Promise.resolve();
        }) // "return" nothing
}
function _delete(id) {
    return conn.db().collection('supportRequests').update({ _id: ObjectId(id)}, {$set:{dateDeactivated: new Date(), dateModified: new Date()}})
        .then(result => Promise.resolve()) // "return" nothing
}