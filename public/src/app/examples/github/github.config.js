(function() {
    'use strict';

    angular
        .module('app.examples.github')
        .config(config);

    /* @ngInject */
    function config($stateProvider, triMenuProvider) {
        $stateProvider
        .state('triangular.github', {
            url: '/github',
            templateUrl: 'app/examples/github/github.tmpl.html',
            controller: 'GithubController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column full-image-background mb-bg-fb-16 background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                },
                permissions: {
                    only: ['viewGitHub']
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'GitHub',
            state: 'triangular.github',
            type: 'link',
            icon: 'fa fa-github',
            priority: 2.2,
            permission: 'viewGitHub'
        });
    }
})();
