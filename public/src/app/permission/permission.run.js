(function() {
    'use strict';

    angular
        .module('app.permission')
        .run(permissionRun);

    /* @ngInject */
    function permissionRun($rootScope, $cookies, $state, PermissionStore, RoleStore,Auth,Data,$http) {
        // normally this would be done at the login page but to show quick
        // demo we grab username from cookie and login the user
        /*Data.getPermissions(function (res) {
            console.log("33434");
            console.log(res);
        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });*/

        // create permissions and add check function verify all permissions
        var permissions = ['Admin','viewEmail', 'viewGitHub', 'viewCalendar', 'viewLayouts', 'viewTodo', 'viewElements', 'viewAuthentication', 'viewCharts', 'viewMaps','viewMyBusiness'];
        PermissionStore.defineManyPermissions(permissions, function (permissionName) {
            return Auth.hasPermission(permissionName);
        });

        // create roles for app
        RoleStore.defineManyRoles({
            'administrator': ['viewEmail', 'viewGitHub', 'viewCalendar', 'viewLayouts', 'viewTodo', 'viewElements', 'viewAuthentication', 'viewCharts', 'viewMaps','Admin'],
            'business': ['viewLayouts', 'viewTodo', 'viewAuthentication', 'viewCharts', 'viewMaps','viewMyBusiness'],
            'employee': ['viewAuthentication', 'viewCharts', 'viewMaps'],
            'ANONYMOUS': []
        });


        ///////////////////////

        // default redirect if access is denied
        function accessDenied() {
            $state.go('login');
        }

        // watches

        // redirect all denied permissions to 401
        var deniedHandle = $rootScope.$on('$stateChangePermissionDenied', accessDenied);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            deniedHandle();
        });
    }
})();
