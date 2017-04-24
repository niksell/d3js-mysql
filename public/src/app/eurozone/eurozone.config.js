(function() {
    'use strict';

    angular
        .module('eurozone')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
      $stateProvider

      .state('triangular.home', {
          url: '/home',
          views: {
                    '@triangular': {
                            templateUrl: 'app/eurozone/eurozone.tmpl.html',
                            // set the controller to load for this page
                            //controller: 'lineChartPageController',
                            //controllerAs: 'vm',

                          }
                    },
                    data: {
                        layout: {
                            contentClass: 'layout-column'
                        }
                    }
      });


        triMenuProvider.addMenu({
            name: 'Home',
            icon: 'zmdi zmdi-home',
            type: 'link',
            state:'triangular.home',
            priority: 1.0,

        });
    }
})();
