(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('addCustomerController', addCustomerController);

    /* @ngInject */
    function addCustomerController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data) {

        var vm = this;
        vm.cancelClick = cancelClick;

        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        // create start and end date of event




        function okClick() {
            //console.log(vm.event);
            var bid=[];

            bid.push(vm.event.business.id);
            var params = {
              firstname: vm.event.firstname,
              lastname:vm.event.lastname,
              email: vm.event.email,
              mobile: vm.event.mobile,
              active: vm.event.active,
              subscriber:vm.event.subscribe,
              business_list:bid
            }

          $http.post(API_CONFIG.BASE + '/api/customers', params)
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


        function init() {
           $scope.salutation=["Mr","Mrs"];
           Data.getBus(function (res) {

             console.log(res.data.data[0].slug);
             $scope.businesses=res.data.data;

           }, function () {
              $rootScope.error = 'Failed to fetch restricted API content.';
          });
        }

        // init
        init();

    }
})();
