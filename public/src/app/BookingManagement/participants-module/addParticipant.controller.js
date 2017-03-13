(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('addParticipantController', addParticipantController);

    /* @ngInject */
    function addParticipantController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data) {

        var vm = this;
        vm.cancelClick = cancelClick;

        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        // create start and end date of event


        ////////////////

        function okClick() {
            //console.log(vm.event);

            var params = {
              name: vm.event.name,
              description:vm.event.description


            }

          $http.post(API_CONFIG.BASE + '/api/participants', params)
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



    }
})();
