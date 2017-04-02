(function() {
    'use strict';

    angular
        .module('scatterPlot')
        .controller('scatterPlotPageController', scatterPlotPageController);
    ///////ELEMENTS TABLE
    /* @ngInject */
    function scatterPlotPageController($localStorage,$scope, $state, $q, $timeout, $mdToast, $filter, $mdDialog, $http, $rootScope, Data, API_CONFIG, $log) {
        var vm = this;

        vm.act;
        vm.event = {};
        $scope.defin1;
        $scope.defin2;

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

        vm.createSelectOptions = createSelectOptions;

        $scope.update1 = function() {
            console.log("mphka");
            $scope.defin=[];
            $scope.defin.push($scope.defin1);
            $scope.defin.push($scope.defin2);

            var params = {
                countryId: $scope.countryId,
                definitionId: $scope.defin,
            }


            $rootScope.selectedData = params;
            console.log(params);
            $localStorage.selectedData=params;
            $http.post(API_CONFIG.BASE + '/api/years', params)
                .success(function(response) {
                    $rootScope.values = response.data;
                    $state.go('triangular.viewscatterPlot');
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
