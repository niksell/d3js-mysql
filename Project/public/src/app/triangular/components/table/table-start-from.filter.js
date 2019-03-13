(function() {
    'use strict';

    angular
        .module('triangular.components')
        .filter('startFrom', startFrom);

    function startFrom() {
        return filterFilter;

        ////////////////

        function filterFilter(input, start) {
            if (input && input.length > 0) {
                start = +start;
                return input.slice(start);
            }
        }
    }

})();
