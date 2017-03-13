(function() {
    'use strict';

    angular
        .module('login-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {


        $stateProvider
        .state('authenticate', {
            abstract: true,
            views: {
                'root': {
                    templateUrl: 'app/login-module/layouts/authentication.tmpl.html'
                }
            }

        })
        .state('authenticate.login', {
            url: '/login-page',
            templateUrl: 'app/login-module/login-page.tmpl.html',
            controller: 'LoginPageController',
            controllerAs: 'vm'
        })
        .state('triangular.userprofile', {
            url: '/userProfile',
            templateUrl: 'app/login-module/profile/profile.tmpl.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
        });

    }
})();
