(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('customerDialogController', customerDialogController);

    /* @ngInject */
    function customerDialogController($rootScope ,$scope,$http, $filter,$window, $mdDialog,Data, customer,API_CONFIG) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.customer = customer;
        vm.printClick = printClick;
        function okClick() {
            $mdDialog.hide();
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function printClick() {
            $window.print();
        }

    }
})();
