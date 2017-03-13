(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('EventMerchantController', EventMerchantController);

    /* @ngInject */
    function EventMerchantController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event,Data) {

        var vm = this;
        vm.cancelClick = cancelClick;

        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.event = event;
        vm.okClick = okClick;
        // create start and end date of event


        ////////////////


        function okClick() {

            var params = {
              business_list:vm.event.business.id

            }
          $http.post(API_CONFIG.BASE + '/api/merchants', params)
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

          Data.getBus(function (res) {

            $scope.business = res.data.data;

          }, function () {
             $rootScope.error = 'Failed to fetch restricted API content.';
         });

        }
        createSelectOptions();
    }
})();
