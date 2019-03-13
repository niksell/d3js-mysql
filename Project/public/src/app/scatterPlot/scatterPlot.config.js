(function() {
    'use strict';

    angular
        .module('scatterPlot')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider

        .state('triangular.scatterPlot', {
            url: '/eurozone/scatterPlot',
            views: {
                      '@triangular': {
                              templateUrl: 'app/scatterPlot/scatterPlot.tmpl.html',
                              // set the controller to load for this page
                              controller: 'scatterPlotPageController',
                              controllerAs: 'vm',

                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          }
                      }
        }).state('triangular.viewscatterPlot', {
            url: '/eurozone/ScatterPlot',
            views: {
                      '@triangular': {
                              templateUrl: 'app/scatterPlot/viewScatterPlot.tmpl.html',
                              // set the controller to load for this page
                              controller: 'viewScatterPlotPageController',
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
            name: 'scatter Plot',
            icon: 'zmdi zmdi-chart',
            type: 'link',
            priority: 1.3,
            state:'triangular.scatterPlot'
        });
    }
})();
