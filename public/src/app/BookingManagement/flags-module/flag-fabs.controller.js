(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('FlagFabController', FlagFabController);

    /* @ngInject */
    function FlagFabController($rootScope) {
        var vm = this;
        vm.addFlag = addFlag;

        ////////////////

        function addFlag($event) {
            $rootScope.$broadcast('addFlag', $event);
        }
    }
})();
