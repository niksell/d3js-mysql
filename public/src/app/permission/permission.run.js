(function() {
    'use strict';

    angular
        .module('app.permission')
        .run(permissionRun);

    /* @ngInject */
    function permissionRun($rootScope, $cookies, $state, PermissionStore, RoleStore, UserService) {
        // normally this would be done at the login page but to show quick
        // demo we grab username from cookie and login the user
        var cookieUser = $cookies.get('tri-user');
        if(angular.isDefined(cookieUser)) {
            UserService.login(cookieUser);
        }

        // create permissions and add check function verify all permissions
        var permissions = ['viewEmail', 'viewGitHub', 'viewCalendar', 'viewLayouts', 'viewTodo', 'viewElements', 'viewAuthentication', 'viewCharts', 'viewMaps'];
        PermissionStore.defineManyPermissions(permissions, function (permissionName) {
            return UserService.hasPermission(permissionName);
        });

        // create roles for app
        RoleStore.defineManyRoles({
            'SUPERADMIN': ['viewEmail', 'viewGitHub', 'viewCalendar', 'viewLayouts', 'viewTodo', 'viewElements', 'viewAuthentication', 'viewCharts', 'viewMaps'],
            'ADMIN': ['viewLayouts', 'viewTodo', 'viewElements', 'viewAuthentication', 'viewCharts', 'viewMaps'],
            'USER': ['viewAuthentication', 'viewCharts', 'viewMaps'],
            'ANONYMOUS': []
        });


        ///////////////////////

        // default redirect if access is denied
        function accessDenied() {
            $state.go('401');
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
