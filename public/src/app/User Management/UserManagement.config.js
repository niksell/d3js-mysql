(function() {
    'use strict';

    angular
        .module('UserManagement')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.user-page', {
            url: '/User Management/user-module/user-page',
            views: {
                      '@triangular': {
                              templateUrl: 'app/User Management/user-module/user-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'UserPageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/User Management/user-module/user-fabs.tmpl.html',
                                controller: 'UserFabController',
                                controllerAs: 'vm'
                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          }, permissions: {
                                only: ['Admin']
                            }
                      }
        })
        .state('triangular.customers-page', {
            url: '/admin/customers',
            views: {
                      '@triangular': {
                              templateUrl: 'app/User Management/customers-module/customers-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'customersPageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/User Management/customers-module/customers-fabs.tmpl.html',
                                controller: 'customersFabController',
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
        .state('triangular.role-page', {
            url: '/role-module/role-page',
            views: {
                      '@triangular': {
                              templateUrl: 'app/User Management/role-module/role-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'RolePageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/User Management/role-module/role-fabs.tmpl.html',
                                controller: 'RoleFabController',
                                controllerAs: 'vm'
                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          },  permissions: {
                                only: ['Admin']
                            }
                      }
        })
        .state('triangular.permission-page', {
            url: '/admin/permissions',
            views: {
                      '@triangular': {
                              templateUrl: 'app/User Management/permissions-module/permissions-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'permissionsPageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/User Management/permissions-module/permissions-fabs.tmpl.html',
                                controller: 'permissionsFabController',
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
        .state('triangular.merchant-page', {
            url: '/admin/merchants',
            views: {
                      '@triangular': {
                              templateUrl: 'app/User Management/merchants-module/merchant-page.tmpl.html',
                              // set the controller to load for this page
                              controller: 'MerchantPageController',
                              controllerAs: 'vm',

                            },
                            'belowContent@triangular': {
                                templateUrl: 'app/User Management/merchants-module/merchant-fabs.tmpl.html',
                                controller: 'MerchantFabController',
                                controllerAs: 'vm'
                            }
                      },
                      data: {
                          layout: {
                              contentClass: 'layout-column'
                          }, permissions: {
                                only: ['Admin']
                            }
                      }
        });

        triMenuProvider.addMenu({
            name: 'UserManagement',
            icon: 'zmdi zmdi-home',
            type: 'dropdown',
            priority: 0.1,
            children: [{
                name: 'Users ',
                state: 'triangular.user-page',
                type: 'link',
                icon: 'fa fa-user',
                priority: 0.0,
                permission:'Admin'
            },
            {name: 'customers',
            state: 'triangular.customers-page',
            type: 'link',
            icon: 'fa fa-users',
            priority: 0.1,
            permission: 'viewElements'
          },
          {
              name: 'Roles',
              state: 'triangular.role-page',
              type: 'link',
              icon: 'fa fa-bomb',
              priority: 0.2,
              permission:'Admin'
          },
          {
              name: 'permissions',
              state: 'triangular.permission-page',
              type: 'link',
              icon: 'fa fa-lock',
              priority: 0.3,
              permission: 'viewElements',
          },
          {
              name: 'merchant',
              state: 'triangular.merchant-page',
              type: 'link',
              icon: 'fa fa-truck',
              priority: 0.4,
              permission:'Admin',
          }]
        });

    }
})();
