(function () {
    "use strict";
  
    angular
      .module('client.crud')
      .controller('supportRequestsHeaderController', SupportRequestsHeaderController)
  
      SupportRequestsHeaderController.$inject = ['$state']
  
    function SupportRequestsHeaderController($state) {
      const vm = this
      vm.disableCreate = _disableCreate
  
      init()
  
      function init() {
  
      }
  
      function _disableCreate() {
        let condition;
        if ($state.current.name === 'site.support-requests.create') {
          condition = true;
        }
        else {
          condition = false
        }
        return condition
      }
  
    }
  })();