(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('RoleDetailDialogController', RoleDetailDialogController);

    /* @ngInject */
    function RoleDetailDialogController($rootScope ,$scope,$http, $filter,$window, $mdDialog,event,Data, role,API_CONFIG) {
        var vm = this;
        vm.init = init;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.role = role;
        vm.printClick = printClick;
        vm.event = event;
        $scope.per=[];
        init();

        ////////////////
        function init(){
          $http.get(API_CONFIG.BASE + '/api/roles/'+vm.role.id)
              .success(function(response) {

                angular.forEach(response.data.permissions, function(child) {
                    $scope.per.push(child);
                });


              }).error(function(response) {

              });
              vm.event.permissions=$scope.per;

        }
        function okClick() {
            $mdDialog.hide();
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function printClick() {
            $window.print();
        }

    }
})();
