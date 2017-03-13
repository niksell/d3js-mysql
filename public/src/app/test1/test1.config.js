(function() {
    'use strict';

    angular
        .module('test1-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.test1-page', {
            url: '/admin/Activities/edit/',
            views: {
                      '@triangular': {
                              templateUrl: 'app/test1/test1-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'test1PageController',
                              controllerAs: 'vm',

                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          },
                          permissions: {
                              only: ['viewElements']
                          }
                      }
        });

        /*triMenuProvider.addMenu({
            name: 'test1',
            state: 'triangular.test1-page',
            type: 'link',
            icon: 'fa fa-flag',
            priority: 0.0,
            permission: 'viewElements',
        });*/
    }
})();
