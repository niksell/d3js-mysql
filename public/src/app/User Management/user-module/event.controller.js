(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('EventController', EventController);

    /* @ngInject */
    function EventController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data) {

        var vm = this;
        vm.cancelClick = cancelClick;
        $scope.settF = [];
        $scope.flag_ids = [];
        $scope.flag_name = [];
        $scope.flag_machine = [];
        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;


        function okClick() {
            //console.log(vm.event);
            var id=[];
            var bid=[];
            var index = $scope.flag_name.indexOf(vm.event.role);
            id.push($scope.flag_ids[index]);
            bid.push(vm.event.business.id);
            var params = {
              firstname: vm.event.firstname,
              lastname:vm.event.lastname,
              email: vm.event.email,
              mobile: vm.event.mobile,
              role_list: id,
              business_list:bid
            }

          $http.post(API_CONFIG.BASE + '/api/users', params)
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
        createSelectOptions();


    }
})();
