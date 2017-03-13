(function() {
    'use strict';

    angular
        .module('app.examples.calendar')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.calendar', {
            // set the url of this page
            url: '/calendar',
            views: {
                '@triangular': {
                    // set the html template to show on this page
                    templateUrl: 'app/examples/calendar/calendar.tmpl.html',
                    // set the controller to load for this page
                    controller: 'CalendarController',
                    controllerAs: 'vm'
                },
                'toolbar@triangular': {
                    templateUrl: 'app/examples/calendar/layouts/toolbar/toolbar.tmpl.html',
                    controller: 'CalendarToolbarController',
                    controllerAs: 'vm'
                },
                'belowContent@triangular': {
                    templateUrl: 'app/examples/calendar/calendar-fabs.tmpl.html',
                    controller: 'CalendarFabController',
                    controllerAs: 'vm'
                }
            },
            data: {
                layout: {
                    contentClass: 'triangular-non-scrolling layout-column',
                    footer: false
                },
                permissions: {
                    only: ['viewCalendar']
                }
            }
        });

        triMenuProvider.addMenu({
            // give the menu a name to show (should be translatable and in the il8n folder json)
            name: 'Calendar',
            // point this menu to the state we created in the $stateProvider above
            state: 'triangular.calendar',
            // set the menu type to a link
            type: 'link',
            // set an icon for this menu
            icon: 'zmdi zmdi-calendar-alt',
            // set a proirity for this menu item, menu is sorted by priority
            priority: 2.3,
            permission: 'viewCalendar'
        });
    }
})();
