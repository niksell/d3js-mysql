/* global d3 */
(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController);

    /* @ngInject */
    function DashboardAnalyticsController($scope, $timeout, $mdToast, $filter, $mdDialog, AnalyticsService) {
        var vm = this;
        vm.timeSpans = [{
            name: 'Hourly',
            value: 'hours'
        },{
            name: 'Daily',
            value: 'days'
        },{
            name: 'Weekly',
            value: 'weeks'
        },{
            name: 'Monthly',
            value: 'months'
        }];
        vm.timeSpanChanged = timeSpanChanged;
        /////////////////////

        function init() {
            vm.start = moment().subtract(30, 'days');
            vm.end = moment();
            vm.activeTimeSpan = vm.timeSpans[1];

            // create some fake data
            createFakeData(vm.start, vm.end, vm.activeTimeSpan.value);

            // pop a toast telling users about datepicker
            $timeout(popAToast, 3000);
        }

        function changeDate($event) {
            $mdDialog.show({
                controller: 'DashboardAnalyticsDateChangeDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/analytics/date-change-dialog.tmpl.html',
                locals: {
                    start: vm.start,
                    end: vm.end
                },
                targetEvent: $event
            })
            .then(function(response) {

                vm.start = response.start;
                vm.end = response.end;

                // create new data
                createFakeData(vm.start, vm.end, vm.activeTimeSpan.value);

                // pop a toast
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Date Range Updated'))
                    .position('bottom right')
                    .hideDelay(2000)
                );
            });

        }

        function createFakeData(start, end, span) {
            vm.data = AnalyticsService.getData(start, end, span);

            vm.overviewLineChartOptions = {
                chart: {
                    type: 'lineChart',
                    x: function(d){
                        return d[0];
                    },
                    y: function(d){
                        return d[1];
                    },
                    color: ['#82B1FF'],
                    xAxis: {
                        tickFormat: function(d) {
                            return d3.time.format('%m/%d/%y')(new Date(d));
                        },
                        showMaxMin: false
                    },

                    yAxis: {
                        tickFormat: function(d){
                            return d3.format(',')(d);
                        },
                        domain: [0, 100000]
                    }
                }
            };

            vm.visitorPieChartOptions = {
                chart: {
                    type: 'pieChart',
                    height: 300,
                    x: function(d){
                        return d.name;
                    },
                    y: function(d){
                        return d.value;
                    },
                    showLegend: true,
                    valueFormat: function(d) {
                        return d3.format(',.1%')(d);
                    },
                    color: ['#4CAF50', '#2196F3'],
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            };

            vm.statLineChartOptions = {
                chart: {
                    type: 'lineChart',
                    height: 40,
                    x: function(d){
                        return d[0];
                    },
                    y: function(d){
                        return d[1];
                    },
                    color: ['#82B1FF'],
                    showXAxis: false,
                    showYAxis: false,
                    showLegend: false,
                    xAxis: {
                        tickFormat: function(d) {
                            return d3.time.format('%m/%d/%y')(new Date(d));
                        },
                        showMaxMin: false
                    },
                    yAxis: {
                        tickFormat: function(d){
                            return d3.format(',')(d);
                        }
                    },
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            };

            vm.statTimeLineChartOptions = angular.copy(vm.statLineChartOptions);
            vm.statTimeLineChartOptions.chart.yAxis.tickFormat = function(d) {
                d = $filter('secondsToDate')(d);
                d = $filter('date')(d, 'HH:mm:ss');
                return d;
            };

            vm.statPercentLineChartOptions = angular.copy(vm.statLineChartOptions);
            vm.statPercentLineChartOptions.chart.yAxis.tickFormat = function(d) {
                return d.toFixed(2) + '%';
            };
        }

        function popAToast() {
            var toast = $mdToast.simple()
                .textContent('Try changing your analytics date, click the icon above.')
                .highlightAction(true)
                .position('bottom right');
            $mdToast.show(toast);
        }

        function timeSpanChanged(span) {
            vm.activeTimeSpan = span;
            // create new data
            createFakeData(vm.start, vm.end, vm.activeTimeSpan.value);
        }

        // init

        init();

        // events

        $scope.$on('analyticsChangeDate', changeDate);
    }
})();
