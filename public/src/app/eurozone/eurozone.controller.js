(function() {
    'use strict';

    angular
        .module('eurozone')
        .controller('eurozonePageController', test1PageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function test1PageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG,$log) {
        var vm = this;

        vm.act;


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


        ////////////**************************************///////////////////////////////////
        vm.lat;
        vm.lon;

        vm.createSelectOptions=createSelectOptions;
        // create options for time select boxes (this will be removed in favor of mdDatetime picker when it becomes available)
        $scope.hours=[];
        $scope.minutes=[];


    function createSelectOptions() {
      Data.getCountrys(function (res) {


        console.log(res);

      }, function () {
         $rootScope.error = 'Failed to fetch restricted API content.';
     });

    }

    // init
    createSelectOptions();






         //retrieve employees listing from API








    }
})();
