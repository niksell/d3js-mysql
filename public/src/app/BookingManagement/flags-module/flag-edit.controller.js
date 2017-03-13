(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('editFlag', editFlag);

    /* @ngInject */
    function editFlag($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,flag) {

        var vm = this;
        vm.cancelClick = cancelClick;


        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.flag = flag;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        // create start and end date of event


        ////////////////



        function okClick() {
            //console.log(vm.event);
            console.log(vm.flag);

            var params = {
              name: vm.flag.name,
              machine:vm.flag.machine

            }
          $http.patch(API_CONFIG.BASE + '/api/flags/'+vm.flag.id, params)
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
