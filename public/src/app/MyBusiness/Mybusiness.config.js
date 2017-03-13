(function() {
    'use strict';

    angular
        .module('Mybusiness-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.Mybusiness', {
            url: '/Mybusiness',
            views: {
                      '@triangular': {
                              templateUrl: 'app/MyBusiness/Mybusiness-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'MybusinessController',
                              controllerAs: 'vm',

                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          },
                          permissions: {
                              only: ['viewMyBusiness','Admin']
                          }
                      }
        });

        triMenuProvider.addMenu({
            name: 'Mybusiness',
            state: 'triangular.Mybusiness',
            type: 'link',
            icon: 'fa fa-suitcase',
            priority: 0.0,
            permission: ['viewMyBusiness','Admin'],
        });
    }
})();
