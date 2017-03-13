(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('MerchantFabController', MerchantFabController);

    /* @ngInject */
    function MerchantFabController($rootScope) {
        var vm = this;
        vm.addMerchant = addMerchant;

        ////////////////

        function addMerchant($event) {
            $rootScope.$broadcast('addMerchant', $event);
        }
    }
})();
