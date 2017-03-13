(function() {
    'use strict';

    angular
        .module('busin-module')
        .controller('BusDetailDialogController', BusDetailDialogController);

    /* @ngInject */
    function BusDetailDialogController($rootScope ,$scope,$http, $filter,$window, $mdDialog,event,Data, bus,API_CONFIG) {
        var vm = this;
        vm.init = init;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.bus = bus;
        vm.printClick = printClick;
        vm.event = event;
        $scope.per=[];
        init();

        ////////////////
        function init(){
          $http.get(API_CONFIG.BASE + '/api/businesses/'+vm.bus.id)
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
