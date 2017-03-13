(function() {
    'use strict';

    angular
        .module('app.examples.elements')
        .controller('ButtonsController', ButtonsController);

    /* @ngInject */
    function ButtonsController($interval) {
        var vm = this;
        vm.buttonClass1 = 'md-primary';
        vm.buttonHue1 = 'md-default';

        vm.buttonClass2 = 'md-primary';
        vm.buttonHue2 = 'md-default';

        vm.buttonClass3 = 'md-primary';
        vm.buttonHue3 = 'md-default';

        vm.buttonDisabled = false;
        vm.determinateValue = 30;
        vm.determinateValue2 = 30;
        $interval(intervalTriggered, 100, 0, true);

        ////////////////

        function intervalTriggered() {
            vm.determinateValue += 1;
            vm.determinateValue2 += 1.5;
            if(vm.determinateValue > 100) {
                vm.determinateValue = 30;
                vm.determinateValue2 = 30;
            }
        }
    }
})();
