(function() {
    'use strict';

    angular
        .module('busin-module')
        .controller('BusFabController', BusFabController);

    /* @ngInject */
    function BusFabController($rootScope) {
        var vm = this;
        vm.addBus = addBus;

        ////////////////

        function addBus($event) {
            $rootScope.$broadcast('addbus', $event);
        }
    }
})();
