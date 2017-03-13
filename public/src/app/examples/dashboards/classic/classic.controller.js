(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardClassicController', DashboardAnalyticsController);

    /* @ngInject */
    function DashboardAnalyticsController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        vm.init = init;

        /////////////////////

        function init() {

            $timeout(function() {
                $rootScope.$broadcast('newMailNotification');

                var toast = $mdToast.simple()
                    .textContent('You have new email messages!')
                    .action('View')
                    .highlightAction(true)
                    .position('bottom right');
                $mdToast.show(toast).then(function(response) {
                    if (response == 'ok') {
                        $state.go('triangular.email.inbox');
                    }
                });
            }, 5000);
        }

        // init

        init();
    }
})();
