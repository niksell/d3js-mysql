(function() {
    'use strict';

    angular
        .module('Settings')
        .controller('TaxonomiesFabController', TaxonomiesFabController);

    /* @ngInject */
    function TaxonomiesFabController($rootScope) {
        var vm = this;
        vm.addTaxonomy = addTaxonomy;

        ////////////////

        function addTaxonomy($event) {
            $rootScope.$broadcast('addTaxonomy', $event);
        }
    }
})();
