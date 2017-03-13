(function() {
    'use strict';

    angular
        .module('Activitys-module')
        .controller('ActivitysFabController', ActivitysFabController);

    /* @ngInject */
    function ActivitysFabController($rootScope) {
        var vm = this;
        vm.addActiviy = addActiviy;

        ////////////////

        function addActiviy($event) {
            $rootScope.$broadcast('addActiviy', $event);
            console.log('12');
        }
    }
})();
