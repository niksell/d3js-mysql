(function() {
    'use strict';

    angular
        .module('Payment-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.MyPayment', {
            url: '/MyPayment',
            views: {
                      '@triangular': {
                              templateUrl: 'app/Payment-module/Payment-page.tmpl.html',
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
            name: 'MyPayment',
            state: 'triangular.MyPayment',
            type: 'link',
            icon: 'fa fa-money',
            priority: 0.0,
            permission: ['viewMyBusiness','Admin'],
        });
    }
})();
