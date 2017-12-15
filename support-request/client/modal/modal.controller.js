(function () {
    "use strict";

    angular.module('client.crud')
        .controller('supportRequestsmodalController', SupportRequestsmodalController);

    SupportRequestsmodalController.$inject = ['$scope', '$uibModalInstance', 'item']

    function SupportRequestsmodalController($scope, $uibModalInstance, item) {
        var vm = this;
        vm.modalItem = item;

        init()

        function init() {
            vm.ok = function () {
                $uibModalInstance.close();
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    }
})();