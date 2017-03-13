(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('editPermision', editPermision);

    /* @ngInject */
    function editPermision($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,permission) {

        var vm = this;
        vm.cancelClick = cancelClick;


        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.permission = permission;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        // create start and end date of event


        ////////////////



        function okClick() {

            var params = {
              name: vm.permission.name,
              machine:vm.permission.machine,
              description: vm.permission.description,
              group: vm.permission.group

            }
          $http.patch(API_CONFIG.BASE + '/api/permissions/'+vm.permission.id, params)
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
