(function () {
    "use strict";

    angular
        .module('client.crud')
        .controller('modifyController', ModifyController);

    ModifyController.$inject = ['supportRequestsService', 'supportRequests', '$log', '$stateParams', '$state', '$window']

    function ModifyController(supportRequestsService, supportRequests, $log, $stateParams, $state, $window) {
        const vm = this;

        //form actions
        vm.formObj = null
        vm.resetForm = _resetForm
        vm.update = _update
        vm.clearForm = _clearForm
        vm.create = _create
        vm.validateForm = _validateForm
        //Current state
        vm.stateName = $state.current.name
        //local variables
        let dataMaster = null
        let cleanForm = null



        init()

        function init() {

            vm.formObj = angular.copy(cleanForm)
            if ($stateParams.id) {
                supportRequestsService.readById($stateParams.id)
                    .then(data => {
                        dataMaster = data
                        vm.formObj = angular.copy(dataMaster)
                    })
                    .catch(data => $log.log(`Error: ${data.errors}`))
            }
        }
        function _validateForm(inputName) {
            let conditional;
            if (vm.myForm.$submitted || inputName.$touched) {
                conditional = true
            }
            else {
                conditional = false
            }
            return conditional
        }
        
        function _create() {
            supportRequestsService.create(vm.formObj)
                .then(data => {
                    vm.formObj._id = data
                    vm.formObj = null
                    $window.alert('Successfully Submitted Support Request');
                    $state.go('site.support-requests.list', {}, { reload: true })
                })
                .catch(data => $log.log(`Error: ${data.errors}`))
        }
        function _update() {
            supportRequestsService.update(vm.formObj)
                .then(data => {
                    vm.formObj = null;
                    $window.alert('Successfully Updated Support Request');
                    $state.go('site.support-requests.list', {}, { reload: true })
                })
                .catch(data => $log.log(`Error: ${data.errors}`))
        }
        function _resetForm() {
            vm.formObj = angular.copy(dataMaster);
        }
        function _clearForm() {
            vm.myForm.$setPristine(true)
            vm.myForm.$setUntouched(true)
            vm.formObj = {}
        }


    }

})();