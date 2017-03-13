(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('permissionsFabController', permissionsFabController);

    /* @ngInject */
    function permissionsFabController($rootScope) {
        var vm = this;
        vm.addPermission = addPermission;

        ////////////////

        function addPermission($event) {
            $rootScope.$broadcast('addPermission', $event);
        }
    }
})();
