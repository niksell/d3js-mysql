(function() {
    'use strict';

    angular
        .module('barChart')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider

        .state('triangular.barChart', {
            url: '/eurozone/barChart',
            views: {
                      '@triangular': {
                              templateUrl: 'app/barChart/barChart.tmpl.html',
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
        }).state('triangular.viewBarChart', {
            url: '/eurozone/BarChart',
            views: {
                      '@triangular': {
                              templateUrl: 'app/barChart/viewBarChart.tmpl.html',
                              // set the controller to load for this page
                              controller: 'viewBarChartPageController',
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
            name: 'Bar chart',
            icon: 'zmdi zmdi-chart',
            type: 'link',
            priority: 1.1,
            state:'triangular.barChart'

        });
    }
})();
