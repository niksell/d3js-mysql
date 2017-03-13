(function() {
    'use strict';
    angular
        .module('app.examples.dashboards')
        .component('tabsWidget', {
            templateUrl: 'app/examples/dashboards/analytics/widgets/tabs-widget/tabs-widget.tmpl.html',
            controller: TabsWidget,
            controllerAs: 'vm',
            bindings: {
                languages: '<',
                countries: '<'
            }
        });

    /* @ngInject */
    function TabsWidget() {
        var vm = this;

        vm.tableQueries = {
            languages: {
                order: '-percent',
                limit: 5,
                page: 1
            },
            countries: {
                order: '-percent',
                limit: 5,
                page: 1
            }
        };
    }
})();
