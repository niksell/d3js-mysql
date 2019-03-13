(function() {
    'use strict';

    angular
        .module('lineChart')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider

        .state('triangular.lineChart', {
            url: '/eurozone/lineChart',
            views: {
                      '@triangular': {
                              templateUrl: 'app/lineChart/lineChart.tmpl.html',
                              // set the controller to load for this page
                              controller: 'lineChartPageController',
                              controllerAs: 'vm',

                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          }
                      }
        }).state('triangular.viewLineChart', {
            url: '/eurozone/LineChart',
            views: {
                      '@triangular': {
                              templateUrl: 'app/lineChart/viewLineChart.tmpl.html',
                              // set the controller to load for this page
                              controller: 'viewLineChartPageController',
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
            name: 'Line Chart',
            icon: 'zmdi zmdi-chart',
            type: 'link',
            priority: 1.2,
            state:'triangular.lineChart'
        });
    }
})();
