(function() {
    'use strict';
    angular
        .module('app.examples.dashboards')
        .component('pieChartWidget', {
            templateUrl: 'app/examples/dashboards/analytics/widgets/pie-chart-widget/pie-chart-widget.tmpl.html',
            controllerAs: 'vm',
            bindings: {
                data: '<',
                options: '<'
            }
        });
})();
