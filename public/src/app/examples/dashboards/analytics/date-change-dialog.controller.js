(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardAnalyticsDateChangeDialogController', DateChangeDialogController);

    /* @ngInject */
    function DateChangeDialogController($mdDialog, start, end) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;

        ////////////////

        function okClick() {
            start = new moment(vm.start);
            end = new moment(vm.end);
            $mdDialog.hide({
                start: start,
                end: end
            });
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        // init

        vm.start = start.toDate();
        vm.end = end.toDate();
    }
})();
