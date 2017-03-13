(function() {
    'use strict';

    angular
        .module('app.examples.todo')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.todo', {
            url: '/todo',
            views: {
                '': {
                    templateUrl: 'app/examples/todo/todo.tmpl.html',
                    controller: 'TodoController',
                    controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/examples/todo/fab-button.tmpl.html',
                    controller: 'TodoFabController',
                    controllerAs: 'vm'
                }
            },
            data: {
                layout: {
                    contentClass: 'layout-column full-image-background mb-bg-fb-08 background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                },
                permissions: {
                    only: ['viewTodo']
                }
            }
        });

        triMenuProvider.addMenu({
            id: 'todo',
            name: 'To do',
            icon: 'zmdi zmdi-check',
            state: 'triangular.todo',
            type: 'link',
            permission: 'viewTodo',
            badge: '',
            priority: 2.4
        });
    }
})();
