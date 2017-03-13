(function() {
    'use strict';
    angular
        .module('app.examples.dashboards')
        .component('statChartWidget', {
            templateUrl: 'app/examples/dashboards/analytics/widgets/stat-chart-widget/stat-chart-widget.tmpl.html',
            controllerAs: 'vm',
            bindings: {
                name: '@',
                statistic: '@',
                data: '<',
                options: '<'
            }
        });
})();
