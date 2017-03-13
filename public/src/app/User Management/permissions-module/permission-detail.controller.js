(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('PermissionDialogController', PermissionDialogController);

    /* @ngInject */
    function PermissionDialogController($window, $mdDialog, permission) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.permission = permission;
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
