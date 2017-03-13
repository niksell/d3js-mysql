(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('UserFabController', UserFabController);

    /* @ngInject */
    function UserFabController($rootScope) {
        var vm = this;
        vm.addUser = addUser;

        ////////////////

        function addUser($event) {
            $rootScope.$broadcast('addUser', $event);
        }
    }
})();
