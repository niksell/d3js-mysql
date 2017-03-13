(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('customersFabController', customersFabController);

    /* @ngInject */
    function customersFabController($rootScope) {
        var vm = this;
        vm.addCustomer = addCustomer;

        ////////////////

        function addCustomer($event) {
            $rootScope.$broadcast('addCustomer', $event);
        }
    }
})();
