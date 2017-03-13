(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('EditMDialogController', EditMDialogController);

    /* @ngInject */
    function EditMDialogController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,merch) {

        var vm = this;
        vm.cancelClick = cancelClick;
        $scope.settF = [];
        $scope.flag_ids = [];
        $scope.flag_name = [];
        $scope.flag_machine = [];
        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.merch = merch;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;

        vm.selected=[];
        $scope.id=[];
        $scope.ac;
        vm.selected=[];
        // create start and end date of event


        ////////////////


        function okClick() {

            var params = {

              business_list:vm.event.bus.id
            }
          $http.patch(API_CONFIG.BASE + '/api/merchants/'+vm.merch.id, params)
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
            Data.getBus(function (res) {

              $scope.business = res.data.data;

            }, function () {
               $rootScope.error = 'Failed to fetch restricted API content.';
           });
            $http.get(API_CONFIG.BASE + '/api/merchants/'+vm.merch.id)
                .success(function(response) {
                  //angular.forEach(response.data.data, function(child) {
                    //  console.log(child);
                    //$scope.per.push({
                    //    id:child.id,
                  //      name: child.name
                  //    });
                  //});


                }).error(function(response) {

                });




        }

        // init
        createSelectOptions();


    }
})();
