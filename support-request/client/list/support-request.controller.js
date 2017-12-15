(function () {
    "use strict";

    angular
        .module('client.crud')
        .controller('supportRequestController', SupportRequestController);

    SupportRequestController.$inject = ['supportRequestsService', '$log', 'supportRequests', 'supportRequestsModalService', '$state']

    function SupportRequestController(supportRequestsService, $log, supportRequests, supportRequestsModalService, $state) {
        const vm = this;


        vm.delete = _delete;
        //  modal 
        vm.openModal = _openModal
        //custom filter
        vm.idFilter = _idFilter






        init()

        function init() {

            vm.supportRequests = supportRequests
        }

        function _delete(item, index) {
            supportRequestsService.delete(item)
                .then(data => { supportRequests.splice(index, 1) })
                .catch(data => $log.log(`Error: ${data.errors}`))
        }

        function _openModal(item) {
            let index = supportRequests.findIndex(data => data._id === item._id)
            supportRequestsModalService.openModal(item, index)
                .then((selectedItem) => {
                    supportRequestsService.delete(item)
                    supportRequests.splice(index, 1)
                    $state.go('site.support-requests.list', {}, { reload: true })
                })

                .catch(() => { $log.log('Modal dismissed at: ' + new Date()) })
        }
        function _idFilter(input) {

            return function (input) {
                let condition;
                if ($state.current.name === 'site.support-requests.list.edit') {
                    if (input._id === $state.params.id) {
                        condition = true
                    }
                    else {
                        condition = false
                    }
                }
                else {
                    condition = true
                }
                return condition
            }
        }
    }
})();