(function() {
    'use strict';

    angular
        .module('eurozone')
        .controller('viewBarChartPageController', viewBarChartPageController);
    ///////ELEMENTS TABLE
    /* @ngInject */
    function viewBarChartPageController($localStorage,$scope, $state, $q, $timeout, $mdToast, $filter, $mdDialog, $http, $rootScope, Data, API_CONFIG, $log) {
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
            console.log(choise);
            if (choise == '3') {
                var params = $rootScope.selectedData;
                console.log("fgfdsfhfhe");
                $http.post(API_CONFIG.BASE + '/api/avg5YRS', params)
                    .success(function(response) {

                        var p = 0;
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.data1 = [];
                            for (var j = 0; j < response.data[i].length-1; j++) {
                                //console.log(response.data[i][j].country_id);
                                //console.log(response.data[i][j]['5YRS']);
                                $scope.data1.push({
                                    key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
                                    x: response.data[i][j]['5YRS'],
                                    y: response.data[i][j].avg_value

                                });
                            }
                            p = p + 1;
                            $scope.data.push({
                                key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
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
                            for (var j = 0; j < response.data[i].length-1; j++) {
                                //console.log(response.data[i][j].country_id);
                                //console.log(response.data[i][j]['5YRS']);
                                $scope.data1.push({
                                    key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
                                    x: response.data[i][j]['10YRS'],
                                    y: response.data[i][j].avg_value

                                });
                            }
                            p = p + 1;
                            $scope.data.push({
                                key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
                                values: $scope.data1
                            });

                        }
                    }).error(function(response) {

                    });

            } else if (choise == 1) {


                var params = $rootScope.selectedData;
                console.log("fgfdsfhfhe");
                $http.post(API_CONFIG.BASE + '/api/singleYears', params)
                    .success(function(response) {
                        console.log(response.data);
                        var p = 0;
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.data1 = [];
                            for (var j = 0; j < response.data[i].length-1; j++) {
                                //console.log(response.data[i][j].country_id);
                                //console.log(response.data[i][j]['5YRS']);
                                $scope.data1.push({
                                    key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
                                    x: response.data[i][j]['years'],
                                    y: response.data[i][j].value

                                });
                            }
                            p = p + 1;
                            $scope.data.push({
                                key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
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
            console.log($rootScope.selectedData);
            console.log("fgfdsfhfhe");
            $http.post(API_CONFIG.BASE + '/api/singleYears', params)
                .success(function(response) {
                    console.log(response.data);
                    var p = 0;
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.data1 = [];
                        for (var j = 0; j < response.data[i].length-1; j++) {
                            //console.log(response.data[i][j].country_id);
                            //console.log(response.data[i][j]['5YRS']);
                            $scope.data1.push({
                                key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
                                x: response.data[i][j]['years'],
                                y: response.data[i][j].value

                            });
                        }
                        p = p + 1;
                        $scope.data.push({
                            key: $scope.Countrys[response.data[i][response.data[i].length-1]].country,
                            values: $scope.data1
                        });

                    }
                }).error(function(response) {

                });
            vm.BarOptions = {
                chart: {
                    type: 'multiBarChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 60
                    },
                    clipEdge: true,
                    //staggerLabels: true,
                    duration: 500,
                    stacked: true,

                    xAxis: {
                        axisLabel: 'years',

                        showMaxMin: false

                    },

                    yAxis: {
                        axisLabel: 'value',
                        axisLabelDistance: -20,
                        tickFormat: function(d) {
                            return d3.format(',.1f')(d);
                        }
                    },

                    zoom: {
                        enabled: false,
                        scaleExtent: [1, 10],
                        useFixedDomain: false,
                        useNiceScale: false,
                        horizontalOff: false,
                        verticalOff: true,
                        unzoomEventType: 'dblclick.zoom'
                    }
                }
            };
        }

        // init
        Data.getCountrys(function(res) {


            $scope.Countrys = res.data;

        }, function() {
            $rootScope.error = 'Failed to fetch restricted API content.';
        });
        createSelectOptions();

    }
})();
