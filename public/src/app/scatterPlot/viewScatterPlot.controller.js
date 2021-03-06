(function() {
    'use strict';

    angular
        .module('scatterPlot')
        .controller('viewScatterPlotPageController', viewScatterPlotPageController);
    ///////ELEMENTS TABLE
    /* @ngInject */
    function viewScatterPlotPageController($localStorage,$scope, $state, $q, $timeout, $mdToast, $filter, $mdDialog, $http, $rootScope, Data, API_CONFIG, $log) {
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
                      var p = 0;
                          $scope.data1 = [];
                          for (var j = 0; j < response.data[0].length; j++) {

                              var X=response.data[0][j].avg_value;
                              var Y=response.data[1][j].avg_value;

                              $scope.data1.push({
                                  x: X,
                                  y: Y,
                                  shape:'circle',
                                  size:Math.random()

                              });
                          }
                          p = p + 1;
                          $scope.data.push({
                              key: $localStorage.scatterCountry,
                              values: $scope.data1
                          });

                    }).error(function(response) {

                    });


            } else if (choise == 2) {


                var params = $localStorage.selectedData;

                $http.post(API_CONFIG.BASE + '/api/avg10YRS', params)
                    .success(function(response) {
                      console.log(response);
                      var p = 0;
                          $scope.data1 = [];
                          for (var j = 0; j < response.data[0].length; j++) {

                              var X=response.data[0][j].avg_value;
                              var Y=response.data[1][j].avg_value;

                              $scope.data1.push({
                                  x: X,
                                  y: Y,
                                  shape:'circle',
                                  size:Math.random()

                              });
                          }
                          p = p + 1;
                          $scope.data.push({
                              key: $localStorage.scatterCountry,
                              values: $scope.data1
                          });


                    }).error(function(response) {

                    });

            } else if (choise == 1) {


              var params = $localStorage.selectedData;

              $http.post(API_CONFIG.BASE + '/api/singleYears', params)
                  .success(function(response) {
                      var p = 0;
                          $scope.data1 = [];
                          for (var j = 0; j < response.data[0].length; j++) {

                              var X=response.data[0][j].value;
                              var Y=response.data[1][j].value;

                              $scope.data1.push({
                                  x: X,
                                  y: Y,
                                  shape:'circle',
                                  size:Math.random()

                              });
                          }
                          p = p + 1;
                          $scope.data.push({
                              key: $localStorage.scatterCountry,
                              values: $scope.data1
                          });

                      //}
                  }).error(function(response) {

                  });
              $scope.ScatterOptions = {
                  chart: {
                      type: 'scatterChart',
                      height: 450,
                      color: d3.scale.category10().range(),
                      scatter: {
                          onlyCircles: false
                      },
                      showDistX: true,
                      showDistY: true,
                    //tooltipContent: function(d) {
                    //    return d.series && '<h3>' + d.series[0].key + '</h3>';
                    //},
                      duration: 350,
                      xAxis: {
                          axisLabel: 'X Axis',

                      },
                      yAxis: {
                          axisLabel: 'Y Axis',

                          axisLabelDistance: -5
                      }/*,
                      zoom: {
                          //NOTE: All attributes below are optional
                          enabled: true,
                          scaleExtent: [1, 10],
                          useFixedDomain: false,
                          useNiceScale: false,
                          horizontalOff: false,
                          verticalOff: false,
                          unzoomEventType: 'dblclick.zoom'
                      }*/
                  }
              };

            }
        }

        function createSelectOptions() {
          $scope.data1 = [];
          $scope.data = [];
            var params = $localStorage.selectedData;

            $http.post(API_CONFIG.BASE + '/api/singleYears', params)
                .success(function(response) {

                    var p = 0;
                        $scope.data1 = [];
                        for (var j = 0; j < response.data[0].length; j++) {

                            var X=response.data[0][j].value;
                            var Y=response.data[1][j].value;

                            $scope.data1.push({
                                x: X,
                                y: Y,
                                shape:'circle',
                                size:Math.random()

                            });
                        }
                        p = p + 1;
                        $scope.data.push({
                            key: $localStorage.scatterCountry,
                            values: $scope.data1
                        });

                }).error(function(response) {

                });
            $scope.ScatterOptions = {
                chart: {
                    type: 'scatterChart',
                    height: 450,
                    color: d3.scale.category10().range(),
                    scatter: {
                        onlyCircles: false
                    },
                    showDistX: true,
                    showDistY: true,
                  //tooltipContent: function(d) {
                  //    return d.series && '<h3>' + d.series[0].key + '</h3>';
                  //},
                    duration: 350,
                    xAxis: {
                        axisLabel: $localStorage.nameX,

                    },
                    yAxis: {
                        axisLabel: $localStorage.nameY,

                        axisLabelDistance: -5
                    }
                }
            };

        }

        // init
        createSelectOptions();


    }
})();
