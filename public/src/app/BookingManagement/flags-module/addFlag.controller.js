(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('AddFlagController', AddFlagController);

    /* @ngInject */
    function AddFlagController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data) {

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
              machine:vm.event.machine


            }

          $http.post(API_CONFIG.BASE + '/api/flags', params)
              .success(function(response) {
                console.log("edws");
                console.log(response);
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
