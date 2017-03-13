(function() {
    'use strict';

    angular
        .module('Settings')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
      $stateProvider
      .state('triangular.Taxonomy-page', {
          url: '/admin/Taxonomys',
          views: {
                    '@triangular': {
                            templateUrl: 'app/Settings/Taxonomies/taxonomies-page.tmpl.html',
                            // set the controller to load for this page
                            controller: 'TaxonomiesPageController',
                            controllerAs: 'vm',

                          },
                          'belowContent@triangular': {
                              templateUrl: 'app/Settings/Taxonomies/taxonomies-fabs.tmpl.html',
                              controller: 'TaxonomiesFabController',
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
            name: 'Settings',
            icon: 'zmdi zmdi-home',
            type: 'dropdown',
            priority: 0.3,
            children: [{
                name: 'Taxonomy',
                state: 'triangular.Taxonomy-page',
                type: 'link',
                icon: 'fa fa-flag',
                priority: 0.1,
                permission: 'viewElements',
            }]
        });

    }
})();
