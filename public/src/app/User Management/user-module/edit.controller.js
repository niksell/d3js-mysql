(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('EditController', EditController);

    /* @ngInject */
    function EditController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,employee) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.colors = [];
        $scope.settF = [];
        $scope.flag_ids = [];
        $scope.flag_name = [];
        $scope.flag_machine = [];
        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.employee = employee;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        // create start and end date of event


        ////////////////


        function okClick() {
            //console.log(vm.event);
            var id=[];
            if(vm.event.role==null){
              vm.event.role=vm.employee.roles[0].name;
            }
            var index = $scope.flag_name.indexOf(vm.event.role);
            var bid=[];

            bid.push(vm.event.business.id);

            id.push($scope.flag_ids[index]);
            var params = {
              firstname: vm.employee.firstname,
              lastname:vm.employee.lastname,
              email: vm.employee.email,
              mobile: vm.employee.mobile,
              role_list: id,
              business_list:bid,
              active:"1"
            }
          $http.patch(API_CONFIG.BASE + '/api/users/'+vm.employee.id, params)
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


        function createRoleSelectOptions() {
            // create options for time select boxes (this will be removed in favor of mdDatetime picker when it becomes available)
            Data.getRoles(function (res) {



              angular.forEach(res.data, function(child) {
                  $scope.settF.push({
                      id: child.id,
                      name: child.name,
                      machine: child.machine
                    });

              });
              for (var i = 0; i < $scope.settF.length; i++) {

            $scope.flag_ids.push($scope.settF[i].id);
            $scope.flag_name.push($scope.settF[i].name);
            $scope.flag_machine.push($scope.settF[i].machine);
          };


            }, function () {
               $rootScope.error = 'Failed to fetch restricted API content.';
           });
           Data.getBus(function (res) {


             $scope.businesses=res.data.data;

           }, function () {
              $rootScope.error = 'Failed to fetch restricted API content.';
          });
        }

        // init
        createRoleSelectOptions();


    }
})();
