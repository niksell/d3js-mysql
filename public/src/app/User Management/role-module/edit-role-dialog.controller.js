(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('EditRoleDialogController', EditRoleDialogController);

    /* @ngInject */
    function EditRoleDialogController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,role) {

        var vm = this;
        vm.cancelClick = cancelClick;
        $scope.settF = [];
        $scope.flag_ids = [];
        $scope.flag_name = [];
        $scope.flag_machine = [];
        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.role = role;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        $scope.per=[];
        $scope.per1=[];
        $scope.perm=[];
        vm.selected=[];
        $scope.id=[];
        $scope.bi=[];
        // create start and end date of event


        ////////////////


        function okClick() {
            var id=[];

            var bid=[];
            angular.forEach(vm.event.permissions, function(child) {
              if(child.enabled==1){
                bid.push(child.id);
              }
            });
            var params = {
              name: vm.role.name,
              machine:vm.role.machine,
              description: vm.role.description,
              permissions: bid

            }
            $http.patch(API_CONFIG.BASE + '/api/roles/'+vm.role.id, params)
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


        function createSelectOptions() {
            // create options for time select boxes (this will be removed in favor of mdDatetime picker when it becomes available)
            vm.selected.length=0;
            $http.get(API_CONFIG.BASE + '/api/roles/'+vm.role.id)
                .success(function(response) {

                  angular.forEach(response.data.perms, function(child) {


                      if(child.enabled==1){
                        $scope.per.push({
                          id:child.id,
                          name: child.name,
                          enabled:true
                        });
                        $scope.bi.push(child.id);
                      }else{
                        $scope.per.push({
                          id:child.id,
                          name: child.name,
                          enabled:false
                        });
                      }
                  });


                }).error(function(response) {

                });




                vm.event.permissions=$scope.per;

        }

        // init
        createSelectOptions();


    }
})();
