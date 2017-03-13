(function() {
    'use strict';

    angular
        .module('Activitys-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider,uiGmapGoogleMapApiProvider) {

        $stateProvider
        .state('triangular.Activitys', {
            url: '/Activitys',
            views: {
                      '@triangular': {
                              templateUrl: 'app/Activitys-module/Activitys-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'MyActivitysController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/Activitys-module/Activity-fabs.tmpl.html',
                                controller: 'ActivitysFabController',
                                controllerAs: 'vm'
                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column image-background mb-bg-41 background-overlay-static',
                              innerContentClass: 'overlay-gradient-30'
                          },
                          permissions: {
                              only: ['viewMyBusiness','Admin']
                          }
                      }
        });
        uiGmapGoogleMapApiProvider.configure({
            v: '3.26',
            libraries: 'weather,geometry,visualization',
            key:'AIzaSyCiZpUz_HYkBdGWQ78fmZoAMWu5QpVW6Pg'
        });
        triMenuProvider.addMenu({
            name: 'Activitys',
            state: 'triangular.Activitys',
            type: 'link',
            icon: 'fa fa-plane',
            priority: 0.0,
            permission: ['viewMyBusiness','Admin'],
        });
    }
})();
