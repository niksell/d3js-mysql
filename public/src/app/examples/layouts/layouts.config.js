(function() {
    'use strict';

    angular
        .module('app.examples.layouts')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.standard-page',  {
            url: '/layouts/standard-page',
            templateUrl: 'app/examples/layouts/standard-page.tmpl.html',
            data: {
                layout: {
                    contentClass: 'layout-column'
                },
                permissions: {
                    only: ['viewLayouts']
                }
            }
        })
        .state('triangular.no-scroll-page',  {
            url: '/layouts/no-scroll-page',
            templateUrl: 'app/examples/layouts/no-scroll-page.tmpl.html',
            data: {
                layout: {
                    contentClass: 'triangular-non-scrolling'
                },
                permissions: {
                    only: ['viewLayouts']
                }
            }
        })
        .state('triangular.layouts-composer', {
            url: '/layouts/composer',
            templateUrl: 'app/examples/layouts/composer.tmpl.html',
            controller: 'LayoutsComposerController',
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: ['viewLayouts']
                }
            }
        })
        .state('triangular.layouts-example-full-width', {
            url: '/layouts/full-width',
            templateUrl: 'app/examples/dashboards/general/dashboard-general.tmpl.html',
            data: {
                layout: {
                    sideMenuSize: 'hidden'
                },
                permissions: {
                    only: ['viewLayouts']
                }
            }
        })
        .state('triangular.layouts-example-tall-toolbar', {
            url: '/layouts/tall-toolbar',
            templateUrl: 'app/examples/dashboards/server/dashboard-server.tmpl.html',
            controller: 'DashboardServerController',
            controllerAs: 'vm',
            data: {
                layout: {
                    toolbarSize: 'md-tall',
                    toolbarClass: 'md-warn'
                },
                permissions: {
                    only: ['viewLayouts']
                }
            }
        })
        .state('triangular.layouts-example-icon-menu', {
            url: '/layouts/icon-menu',
            templateUrl: 'app/examples/dashboards/general/dashboard-general.tmpl.html',
            data: {
                layout: {
                    sideMenuSize: 'icon'
                },
                permissions: {
                    only: ['viewLayouts']
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Layouts',
            icon: 'zmdi zmdi-view-module',
            type: 'dropdown',
            priority: 2.4,
            permission: 'viewLayouts',
            children: [{
                name: 'Standard Page',
                type: 'link',
                state: 'triangular.standard-page'
            },{
                name: 'Non Scrolling Page',
                type: 'link',
                state: 'triangular.no-scroll-page'
            },{
                name: 'Full Width Layout',
                type: 'link',
                state: 'triangular.layouts-example-full-width'
            },{
                name: 'Icon Menu',
                type: 'link',
                state: 'triangular.layouts-example-icon-menu'
            },{
                name: 'Tall Toolbar with background',
                type: 'link',
                state: 'triangular.layouts-example-tall-toolbar'
            },{
                name: 'Composer',
                type: 'link',
                state: 'triangular.layouts-composer'
            }]
        });
    }
})();
