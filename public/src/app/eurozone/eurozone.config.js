(function() {
    'use strict';

    angular
        .module('eurozone')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {



        triMenuProvider.addMenu({
            name: 'Home',
            icon: 'zmdi zmdi-home',
            type: 'link',
            priority: 1.0,

        });
    }
})();
