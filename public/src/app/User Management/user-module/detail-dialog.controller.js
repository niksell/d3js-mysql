(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('UserDetailDialogController', UserDetailDialogController);

    /* @ngInject */
    function UserDetailDialogController($window, $mdDialog, employee) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.employee = employee;
        vm.printClick = printClick;


        ////////////////

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
