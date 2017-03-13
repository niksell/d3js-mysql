(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('participantDialogController', participantDialogController);

    /* @ngInject */
    function participantDialogController($window, $mdDialog, participant) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.participant = participant;
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
