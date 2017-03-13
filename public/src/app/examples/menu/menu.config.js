(function() {
    'use strict';

    angular
        .module('app.examples.menu')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.menu-levels', {
            url: '/menu-levels/:level',
            controller: 'LevelController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/menu/level.tmpl.html',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.menu-dynamic', {
            url: '/menu/dynamic',
            controller: 'MenuDynamicController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/menu/dynamic.tmpl.html',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.menu-dynamic-dummy-page', {
            url: '/menu/dynamic-page',
            templateUrl: 'app/examples/menu/dynamic-page.tmpl.html',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Menu',
            icon: 'zmdi zmdi-receipt',
            type: 'dropdown',
            priority: 6.1,
            children: [{
                name: 'Dynamic Menu',
                type: 'link',
                state: 'triangular.menu-dynamic'
            },{
                name: 'On Click Menu',
                type: 'link',
                click: ['$mdDialog', function($mdDialog) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Menu Item Clicked')
                        .htmlContent('You can now set menu item click events when you configure your menu as well as routes!.  See <code>app/examples/menu/menu.config.js</code> to learn how.')
                        .ok('Got it Thanks.')
                    );
                }]
            },{
                name: 'Open in new tab',
                type: 'link',
                state: 'triangular.dashboard-general',
                openInNewTab: true
            },{
                name: 'Unlimited Levels',
                type: 'dropdown',
                children: [{
                    name: 'Level 2-1',
                    type: 'dropdown',
                    children: [{
                        name: 'Level 3-1',
                        type: 'dropdown',
                        children: [{
                            name: 'Level 4-1',
                            type: 'link',
                            state: 'triangular.menu-levels',
                            params: {
                                level: 'Item1-1-1-1'
                            }
                        },{
                            name: 'Level 4-2',
                            type: 'link',
                            state: 'triangular.menu-levels',
                            params: {
                                level: 'Item1-1-1-2'
                            }
                        },{
                            name: 'Level 4-3',
                            type: 'link',
                            state: 'triangular.menu-levels',
                            params: {
                                level: 'Item1-1-1-3'
                            }
                        }]
                    }]
                }]
            }]
        });
    }
})();
