(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('participantsFabController', participantsFabController);

    /* @ngInject */
    function participantsFabController($rootScope) {
        var vm = this;
        vm.addParticipant = addParticipant;

        ////////////////

        function addParticipant($event) {
            $rootScope.$broadcast('addParticipant', $event);
        }
    }
})();
