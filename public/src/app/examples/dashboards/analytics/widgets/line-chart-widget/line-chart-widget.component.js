(function() {
    'use strict';
    angular
        .module('app.examples.dashboards')
        .component('lineChartWidget', {
            templateUrl: 'app/examples/dashboards/analytics/widgets/line-chart-widget/line-chart-widget.tmpl.html',
            controllerAs: 'vm',
            bindings: {
                start: '<',
                end: '<',
                timeSpans: '<',
                onTimeChange: '&',
                data: '<',
                options: '<'
            }
        });
})();
