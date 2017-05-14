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
