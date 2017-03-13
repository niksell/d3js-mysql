(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('editCustomer', editCustomer);

    /* @ngInject */
    function editCustomer($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,customer) {

        var vm = this;
        vm.cancelClick = cancelClick;

        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.customer = customer;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        $scope.active;

        function okClick() {

            var bid=[];

            bid.push(vm.event.business.id);

            var params = {
              firstname: vm.customer.firstname,
              lastname:vm.customer.lastname,
              email: vm.customer.email,
              mobile: vm.customer.mobile,
              active: vm.event.active,
              subscriber:vm.event.subscriber,
              business_list:bid,
            }
            console.log(params);
          $http.patch(API_CONFIG.BASE + '/api/customers/'+vm.customer.id, params)
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
          $scope.salutation=["Mr","Mrs"];
           Data.getBus(function (res) {


             $scope.businesses=res.data.data;

           }, function () {
              $rootScope.error = 'Failed to fetch restricted API content.';
          });
          vm.event.active=vm.customer.active;
          vm.event.subscriber=vm.customer.subscriber;
        }

        // init
        createSelectOptions();


    }
})();
