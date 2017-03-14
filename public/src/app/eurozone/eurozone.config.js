(function() {
    'use strict';

    angular
        .module('eurozone')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider

        .state('triangular.barChart', {
            url: '/eurozone/barChart',
            views: {
                      '@triangular': {
                              templateUrl: 'app/eurozone/barChart/barChart.tmpl.html',
                              // set the controller to load for this page
                              controller: 'barChartPageController',
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
            type: 'dropdown',
            priority: 1.0,

            children: [{
                name: 'Bar Chart ',
                state: 'triangular.barChart',
                type: 'link',

                priority: 0.0,
            }]
        });
    }
})();
