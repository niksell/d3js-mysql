(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('AddPermissionController', AddPermissionController);

    /* @ngInject */
    function AddPermissionController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data) {

        var vm = this;
        vm.cancelClick = cancelClick;

        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;


        function okClick() {

            var params = {
              name: vm.event.name,
              machine:vm.event.machine,
              description: vm.event.description,
              group: vm.event.group

            }

          $http.post(API_CONFIG.BASE + '/api/permissions', params)
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
