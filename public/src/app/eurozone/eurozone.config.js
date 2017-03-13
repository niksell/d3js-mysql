(function() {
    'use strict';

    angular
        .module('eurozone')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider

        .state('triangular.eurozone', {
            url: '/eurozone',
            views: {
                      '@triangular': {
                              templateUrl: 'app/eurozone/eurozone-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'eurozonePageController',
                              controllerAs: 'vm',

                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          }
                      }
        });

        triMenuProvider.addMenu({
            name: 'Charts',
            icon: 'zmdi zmdi-chart',
            type: 'link',
            priority: 5.1,
            state: 'triangular.eurozone',

        });
    }
})();
