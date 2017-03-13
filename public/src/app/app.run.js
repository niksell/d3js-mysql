(function() {
    'use strict';

    angular
        .module('app')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $state,Auth) {

        // default redirect if access is denied
        //Auth.init();
        //function redirectError() {
          //  $state.go('/login-page');
        //}

        // watches

        // redirect all errors to permissions to 500
      //  var errorHandle = $rootScope.$on('$stateChangeError', redirectError);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            errorHandle();
        });
        $rootScope.$on('$routeChangeStart', function (event, next) {
        if (!Auth.checkPermissionForView(next)){
            event.preventDefault();
            $state.go("/login-page");
        }
    });
    }
})();
