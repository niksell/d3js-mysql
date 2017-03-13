(function() {
    'use strict';

    angular
        .module('calendar-module')
        .controller('CalendarFabController', CalendarFabController);

    /* @ngInject */
    function CalendarFabController($rootScope) {
        var vm = this;
        vm.addEvent = addEvent;

        ////////////////

        function addEvent($event) {
            $rootScope.$broadcast('addEvent', $event);
        }
    }
})();
