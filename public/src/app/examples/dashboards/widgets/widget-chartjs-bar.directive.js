(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .directive('chartjsBarWidget', chartjsBarWidget);

    /* @ngInject */
    function chartjsBarWidget($timeout) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            require: 'triWidget',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs, widgetCtrl) {
            widgetCtrl.setLoading(true);

            $timeout(function() {
                widgetCtrl.setLoading(false);
            }, 2500);

            widgetCtrl.setMenu({
                icon: 'zmdi zmdi-more-vert',
                items: [{
                    icon: 'zmdi zmdi-refresh',
                    title: 'Refresh',
                    click: function() {
                        widgetCtrl.setLoading(true);
                        $timeout(function() {
                            widgetCtrl.setLoading(false);
                        }, 1500);
                    }
                },{
                    icon: 'zmdi zmdi-share',
                    title: 'Share'
                },{
                    icon: 'zmdi zmdi-print',
                    title: 'Print'
                }]
            });

            $scope.labels = ['Facebook', 'Twitter', 'Google+', 'Others'];
            $scope.series = ['This Week', 'Last week'];

            $scope.data = [
                [65, 59, 80, 81],
                [28, 48, 40, 19]
            ];
        }
    }
})();