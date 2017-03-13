(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.ui-typography', {
            url: '/ui/typography',
            controller: 'TypographyController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/ui/typography.tmpl.html'
        })
        .state('triangular.ui-colors', {
            url: '/ui/colors',
            controller: 'ColorsController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/ui/colors.tmpl.html'
        })
        .state('triangular.ui-material-icons', {
            url: '/ui/material-icons',
            controller: 'MaterialIconsController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/ui/material-icons.tmpl.html',
            resolve: {
                icons: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'elements/icons'
                    });
                }
            }
        })
        .state('triangular.ui-weather-icons', {
            url: '/ui/weather-icons',
            controller: 'WeatherIconsController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/ui/weather-icons.tmpl.html'
        })
        .state('triangular.ui-fa-icons', {
            url: '/ui/fa-icons',
            controller: 'FaIconsController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/ui/fa-icons.tmpl.html',
            resolve: {
                icons: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'elements/icons-fa'
                    });
                }
            }
        })

        .state('triangular.ui-toolbar', {
            url: '/ui/toolbars/:extraClass/:background/:shrink',
            controller: 'ToolbarsUIController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/ui/toolbars.tmpl.html'
        })

        .state('triangular.ui-skins', {
            url: '/ui/skins',
            controller: 'SkinsUIController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/ui/skins.tmpl.html'
        });

        triMenuProvider.addMenu({
            name: 'UI',
            icon: 'zmdi zmdi-ruler',
            type: 'dropdown',
            priority: 3.2,
            children: [{
                name: 'Colors',
                state: 'triangular.ui-colors',
                type: 'link'
            },{
                name: 'Font Awesome',
                state: 'triangular.ui-fa-icons',
                type: 'link'
            },{
                name: 'Material Icons',
                state: 'triangular.ui-material-icons',
                type: 'link'
            },{
                name: 'Skins',
                state: 'triangular.ui-skins',
                type: 'link'
            },{
                name: 'Typography',
                state: 'triangular.ui-typography',
                type: 'link'
            },{
                name: 'Weather Icons',
                state: 'triangular.ui-weather-icons',
                type: 'link'
            }]
        });
    }
})();
