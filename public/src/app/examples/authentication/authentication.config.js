(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('authentication', {
            abstract: true,
            views: {
                'root': {
                    templateUrl: 'app/examples/authentication/layouts/authentication.tmpl.html'
                }
            },
            data: {
                permissions: {
                    only: ['viewAuthentication']
                }
            }
        })
        .state('authentication.login', {
            url: '/login',
            templateUrl: 'app/examples/authentication/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('authentication.signup', {
            url: '/signup',
            templateUrl: 'app/examples/authentication/signup/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'vm'
        })
        .state('authentication.lock', {
            url: '/lock',
            templateUrl: 'app/examples/authentication/lock/lock.tmpl.html',
            controller: 'LockController',
            controllerAs: 'vm'
        })
        .state('authentication.forgot', {
            url: '/forgot',
            templateUrl: 'app/examples/authentication/forgot/forgot.tmpl.html',
            controller: 'ForgotController',
            controllerAs: 'vm'
        })
        .state('triangular.profile', {
            url: '/profile',
            templateUrl: 'app/examples/authentication/profile/profile.tmpl.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'Authentication',
            icon: 'zmdi zmdi-account',
            type: 'dropdown',
            priority: 4.1,
            permission: 'viewAuthentication',
            children: [{
                name: 'Login',
                state: 'authentication.login',
                type: 'link'
            },{
                name: 'Sign Up',
                state: 'authentication.signup',
                type: 'link'
            },{
                name: 'Forgot Password',
                state: 'authentication.forgot',
                type: 'link'
            },{
                name: 'Lock Page',
                state: 'authentication.lock',
                type: 'link'
            },{
                name: 'Profile',
                state: 'triangular.profile',
                type: 'link'
            }]
        });
    }
})();
