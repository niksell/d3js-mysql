(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .filter('secondsToDate', secondsToDate);

    function secondsToDate() {
        return secondsToDateFilter;

        function secondsToDateFilter(seconds) {
            var d = new Date(0, 0, 0, 0, 0, 0, 0);
            d.setSeconds(seconds);
            return d;
        }
    }
})();
