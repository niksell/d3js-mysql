(function() {
    'use strict';

    angular
        .module('eurozone')
        .controller('barChartPageController', barChartPageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function barChartPageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG,$log) {
        var vm = this;

        vm.act;
        vm.event={};
        $scope.defin;
        $scope.countryId;
        vm.options = {
          rowSelection: true,
          multiSelect: true,
          autoSelect: true,
          decapitate: false,
          largeEditDialog: false,
          boundaryLinks: false,
          limitSelect: true,
          pageSelect: true
        };
        $scope.Countrys;
        $scope.Definitions;

        ////////////**************************************///////////////////////////////////
        vm.lat;
        vm.lon;

        vm.createSelectOptions=createSelectOptions;
    $scope.update1=function() {
      console.log("mphka");
      console.log($scope.countryId);
      var params={
        countryId: $scope.countryId,
        definitionId:$scope.defin,
      }
      $http.post(API_CONFIG.BASE + '/api/years', params)
          .success(function(response) {
            $rootScope.values=response.data;
            $state.go('triangular.viewBarChart');
          }).error(function(response) {

          });
    }
    function createSelectOptions() {
      Data.getCountrys(function (res) {


        $scope.Countrys=res.data;

      }, function () {
         $rootScope.error = 'Failed to fetch restricted API content.';
     });
     Data.getDefinitions(function (res) {


       $scope.Definitions=res.data;

     }, function () {
        $rootScope.error = 'Failed to fetch restricted API content.';
    });
    }

    // init
    createSelectOptions();






         //retrieve employees listing from API








    }
})();
