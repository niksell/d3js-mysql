(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('MerDetailDialogController', MerDetailDialogController);

    /* @ngInject */
    function MerDetailDialogController($rootScope ,$scope,$http, $filter,$window, $mdDialog,event,Data, merch,API_CONFIG) {
        var vm = this;
        vm.init = init;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.merch = merch;
        vm.printClick = printClick;
        vm.event = event;
        $scope.per=[];
        init();

        ////////////////
        function init(){
          $http.get(API_CONFIG.BASE + '/api/merchants/'+vm.merch.id)
              .success(function(response) {

                //angular.forEach(response.data.permissions, function(child) {
                  //  console.log(child);
                  //  $scope.per.push(child);
                //});


              }).error(function(response) {

              });

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
