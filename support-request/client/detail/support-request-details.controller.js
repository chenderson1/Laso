(function () {
    "use strict";

    angular
        .module('client.crud')
        .controller('srDetailsController', SrDetailsController);

    SrDetailsController.$inject = ['supportRequestsService', '$stateParams', '$log', 'supportRequests', 'supportRequestsModalService', '$state']

    function SrDetailsController(supportRequestsService, $stateParams, $log, supportRequests, supportRequestsModalService, $state) {
        var vm = this;
        vm.update = _update
        // vm.delete = _delete
        vm.formObj = null;
        vm.openModal = _openModal

        init()


        function init() {

            if ($stateParams.id) {
                supportRequestsService.readById($stateParams.id)
                    .then(data => { vm.formObj = data })
                    .catch(data => $log.log(`Error: ${data.errors}`))
            }
        }
        function _update() {
            supportRequestsService.update(vm.formObj)
                .then(data => { })
                .catch(data => $log.log(`Error: ${data.errors}`))
        }

        function _openModal(formObj) {
            let index = supportRequests.findIndex(data => data._id === formObj._id)
            supportRequestsModalService.openModal(formObj, index)
                .then((selectedItem) => {
                    supportRequestsService.delete(formObj)
                    supportRequests.splice(index, 1)
                    $state.go('site.support-requests.list', {}, { reload: true })})
                .catch( () => {
                    $log.log('Modal dismissed at: ' + new Date())})
        }
    }

})();