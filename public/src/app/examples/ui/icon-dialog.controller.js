(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('IconDialogController', IconDialogController);

    /* @ngInject */
    function IconDialogController($mdDialog) {
        var vm = this;
        vm.closeDialog = closeDialog;

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();
