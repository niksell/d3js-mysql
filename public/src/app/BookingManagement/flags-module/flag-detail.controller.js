(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('flagDialogController', flagDialogController);

    /* @ngInject */
    function flagDialogController($window, $mdDialog, flag) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.flag = flag;
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
