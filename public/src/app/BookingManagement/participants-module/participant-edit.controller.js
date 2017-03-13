(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('editParticipant', editParticipant);

    /* @ngInject */
    function editParticipant($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,participant) {

        var vm = this;
        vm.cancelClick = cancelClick;


        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.participant = participant;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        // create start and end date of event


        ////////////////



        function okClick() {

            var params = {
              name: vm.participant.name,
              description:vm.participant.description

            }
          $http.patch(API_CONFIG.BASE + '/api/participants/'+vm.participant.id, params)
              .success(function(response) {
                $mdDialog.hide(vm.event);


              }).error(function(response) {

              });
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function deleteClick() {
            vm.event.deleteMe = true;
            $mdDialog.hide(vm.event);
        }




        // init

    }
})();
