(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.flag-page', {
            url: '/admin/flags',
            views: {
                      '@triangular': {
                              templateUrl: 'app/BookingManagement/flags-module/flag-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'FlagPageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/BookingManagement/flags-module/flag-fabs.tmpl.html',
                                controller: 'FlagFabController',
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
        })
        .state('triangular.participant-page', {
            url: '/admin/participants',
            views: {
                      '@triangular': {
                              templateUrl: 'app/BookingManagement/participants-module/participant-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'participantsPageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/BookingManagement/participants-module/participant-fabs.tmpl.html',
                                controller: 'participantsFabController',
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
            name: 'BookingManagement',
            icon: 'zmdi zmdi-home',
            type: 'dropdown',
            priority: 0.2,
            children: [
              {
                  name: 'flag',
                  state: 'triangular.flag-page',
                  type: 'link',
                  icon: 'fa fa-flag',
                  priority: 0.1,
                  permission: 'viewElements',
              },
              {
                  name: 'participant',
                  state: 'triangular.participant-page',
                  type: 'link',
                  icon: 'fa fa-legal',
                  priority: 0.2,
                  permission: 'viewElements',
              }
            ]
        });

    }
})();
