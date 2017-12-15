/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module('client.services')
        .factory('supportRequestsService', SupportRequestsServiceFactory)

    SupportRequestsServiceFactory.$inject = ['$http','$q']


    function SupportRequestsServiceFactory($http, $q) {
        return {
            readAll: readAll,
            readById: readById,
            create: create,
            update: update,
            delete: _delete
        }

        function readAll() {
            return $http.get('/api/support-requests', { cache: false })
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/support-requests/${id}`, { cache: false })
                .then(xhrSuccess)
                .catch(onError)
        }
        function create(supportReqData) {
            return $http.post('/api/support-requests', supportReqData)
                .then(xhrSuccess)
                .catch(onError)
        }
        function update(supportReqData) {
            return $http.put(`/api/support-requests/${supportReqData._id}`, supportReqData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(item) {
            return $http.delete(`/api/support-requests/${item._id}`, item)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data)
            return $q.reject(error.data)
        }

    }
    
})()
