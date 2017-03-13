(function() {
    'use strict';

    angular
        .module('busin-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.busi-page', {
            url: '/admin/businesses',
            views: {
                      '@triangular': {
                              templateUrl: 'app/busin-module/busi-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'BusPageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/busin-module/busin-fabs.tmpl.html',
                                controller: 'BusFabController',
                                controllerAs: 'vm'
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

        triMenuProvider.addMenu({
            name: 'businesses',
            state: 'triangular.busi-page',
            type: 'link',
            icon: 'fa fa-suitcase',
            priority: 0.0,
            permission: 'viewElements',
        });
    }
})();
