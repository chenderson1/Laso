(function () {
    'use strict'

    angular.module('client.services')
        .factory('supportRequestsModalService', SupportRequestsModalServiceFactory)


    SupportRequestsModalServiceFactory.$inject = ['$uibModal']


    function SupportRequestsModalServiceFactory($uibModal) {
        return {
            openModal: _openModal
        }

        function _openModal(item, index) {
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: '/client/crud/support-requests/modal/modalContent.html',
                controller: 'supportRequestsmodalController as srMC',
                size: 'md',
                resolve: _getItem()
            });

            function _getItem() {
                return { item }
            }
            return modalInstance.result;


        }
    }
})();