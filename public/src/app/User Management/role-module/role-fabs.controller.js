(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('RoleFabController', RoleFabController);

    /* @ngInject */
    function RoleFabController($rootScope) {
        var vm = this;
        vm.addRole = addRole;

        ////////////////

        function addRole($event) {
            $rootScope.$broadcast('addRole', $event);
        }
    }
})();
