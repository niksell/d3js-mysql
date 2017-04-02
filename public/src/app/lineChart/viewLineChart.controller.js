(function() {
    'use strict';

    angular
        .module('eurozone')
        .controller('viewLineChartPageController', viewLineChartPageController);
    ///////ELEMENTS TABLE
    /* @ngInject */
    function viewLineChartPageController($localStorage,$scope, $state, $q, $timeout, $mdToast, $filter, $mdDialog, $http, $rootScope, Data, API_CONFIG, $log) {
        var vm = this;
        $scope.t1;
        $scope.choises = [{
            id: 1,
            value: 'single years'
        }, {
            id: 2,
            value: '10 years'
        }, {
            id: 3,
            value: '5 years'
        }];
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
        $scope.data1 = [];
        $scope.test = function(choise) {
            $scope.data1 = [];
            $scope.data = [];
            var sum = 0;
            var count = 0;
            var keep;
            if (choise == '3') {
                var params = $rootScope.selectedData;
                $http.post(API_CONFIG.BASE + '/api/avg5YRS', params)
                    .success(function(response) {
                      console.log(response);
                        var p = 0;
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.data1 = [];
                            for (var j = 0; j < response.data[i].length; j++) {
                                //console.log(response.data[i][j].country_id);
                                //console.log(response.data[i][j]['5YRS']);
                                $scope.data1.push({
                                    key: p,
                                    x: response.data[i][j]['5YRS'].split('-')[0],
                                    y: response.data[i][j].avg_value

                                });
                            }
                            p = p + 1;
                            $scope.data.push({
                                key: i,
                                values: $scope.data1
                            });

                        }
                    }).error(function(response) {

                    });


            } else if (choise == 2) {


                var params = $rootScope.selectedData;

                $http.post(API_CONFIG.BASE + '/api/avg10YRS', params)
                    .success(function(response) {

                        var p = 0;
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.data1 = [];
                            for (var j = 0; j < response.data[i].length; j++) {
                                //console.log(response.data[i][j].country_id);
                                //console.log(response.data[i][j]['5YRS']);
                                $scope.data1.push({
                                    key: p,
                                    x: response.data[i][j]['10YRS'],
                                    y: response.data[i][j].avg_value

                                });
                            }
                            p = p + 1;
                            $scope.data.push({
                                key: i,
                                values: $scope.data1
                            });

                        }
                    }).error(function(response) {

                    });

            } else if (choise == 1) {


                var params = $rootScope.selectedData;
                $http.post(API_CONFIG.BASE + '/api/singleYears', params)
                    .success(function(response) {
                        var p = 0;
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.data1 = [];
                            for (var j = 0; j < response.data[i].length; j++) {
                                //console.log(response.data[i][j].country_id);
                                //console.log(response.data[i][j]['5YRS']);
                                $scope.data1.push({
                                    key: p,
                                    x: response.data[i][j]['years'],
                                    y: response.data[i][j].value

                                });
                            }
                            p = p + 1;
                            $scope.data.push({
                                key: i,
                                values: $scope.data1
                            });

                        }
                    }).error(function(response) {

                    });

            }
        }

        function createSelectOptions() {
          $scope.data1 = [];
          $scope.data = [];
            var params = $localStorage.selectedData;

            $http.post(API_CONFIG.BASE + '/api/singleYears', params)
                .success(function(response) {
                    var p = 0;
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.data1 = [];
                        for (var j = 0; j < response.data[i].length; j++) {
                            //console.log(response.data[i][j].country_id);
                            //console.log(response.data[i][j]['5YRS']);
                            $scope.data1.push({
                                key: p,
                                x: response.data[i][j]['years'],
                                y: response.data[i][j].value

                            });
                        }
                        p = p + 1;
                        $scope.data.push({
                            key: i,
                            values: $scope.data1
                        });

                    }
                }).error(function(response) {

                });
            vm.LineOptions = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 60
                    },
                    useInteractiveGuideline: true,
                    dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Years'
                },
                yAxis: {
                    axisLabel: 'Value',

                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                },


                },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            },


            };
        }

        // init
        createSelectOptions();


    }
})();
