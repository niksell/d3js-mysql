(function() {
    'use strict';

    angular
        .module('eurozone')
        .controller('lineChartPageController', lineChartPageController);
    ///////ELEMENTS TABLE
    /* @ngInject */
    function lineChartPageController($localStorage,$scope, $state, $q, $timeout, $mdToast, $filter, $mdDialog, $http, $rootScope, Data, API_CONFIG, $log) {
        var vm = this;

        vm.act;
        vm.event = {};
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


        vm.createSelectOptions = createSelectOptions;
        $scope.test = function() {
            if ($scope.countryId.length > 3) {
                swal("You can select up two 3 !");

                var temp = [];
                var i=0;
                var temp1=0;
                while (temp1<3) {
                  if($scope.countryId[i]!=null){
                    temp.push($scope.countryId[i]);
                    temp1=temp1+1;

                  }
                  i=i+1;
                }
        

                $scope.countryId.length = 0;
                for (var i = 0; i < 3; i++) {


                    $scope.countryId.push(temp[i]);
                }
            }
        }
        $scope.update1 = function() {

            var params = {
                countryId: $scope.countryId,
                definitionId: $scope.defin,
            }
            var name;
            for (var k = 0; k < $scope.Definitions.length; k++) {
              if ($scope.Definitions[k].id==$scope.defin) {
                name=$scope.Definitions[k].Indicator_name;
              }
            }
            $rootScope.title=name;
            $rootScope.selectedData = params;

            $localStorage.selectedData=params;
            $http.post(API_CONFIG.BASE + '/api/years', params)
                .success(function(response) {
                    $rootScope.values = response.data;
                    $state.go('triangular.viewLineChart');
                }).error(function(response) {

                });
        }

        function createSelectOptions() {
            Data.getCountrys(function(res) {


                $scope.Countrys = res.data;

            }, function() {
                $rootScope.error = 'Failed to fetch restricted API content.';
            });
            Data.getDefinitions(function(res) {


                $scope.Definitions = res.data;

            }, function() {
                $rootScope.error = 'Failed to fetch restricted API content.';
            });
        }

        // init
        createSelectOptions();






        //retrieve employees listing from API








    }
})();
