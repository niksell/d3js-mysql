(function() {
    'use strict';

    angular
        .module('eurozone')
        .controller('viewBarChartPageController', viewBarChartPageController);
    ///////ELEMENTS TABLE
    /* @ngInject */
    function viewBarChartPageController($scope, $state, $q, $timeout, $mdToast, $filter, $mdDialog, $http, $rootScope, Data, API_CONFIG, $log) {
        var vm = this;
        $scope.t1;
        $scope.choises = [
        { id: 1, value: 'single years' },
        { id: 2, value: '10 years' },
        { id: 3, value: '5 years' }
      ];
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
        $scope.test=function (choise) {
          $scope.data1.length=0;
          var sum =0;
          var count=0;
          var keep;
          console.log(choise);
          if (choise=='3') {
            console.log("fgfdsfhfhe");

          angular.forEach($rootScope.values, function(val) {

              if (count==5) {
                var temp=sum/count;
                $scope.data1.push({
                    key: "1",
                    x:keep,
                    y:temp

                });
                sum=0;
                count=0;
              }
              if(count==0){
                keep=val['5YRS'];
                console.log("sfdfdfdfdfdfdfdfdfdfd");
                console.log(keep);
                }
              sum=sum+val.value;
              count=count+1;
              /*$scope.data1.push({
                  key: "1",
                  x:val.years,
                  y:val.value

              });*/
          })
          var temp=sum/count;
          $scope.data1.push({
              key: "1",
              x:keep,
              y:temp

          });
          $scope.data = [{
            key: '1',
            values: $scope.data1
          }];
          console.log($scope.data);
        }
        }
        function createSelectOptions() {
            angular.forEach($rootScope.values, function(val) {
                $scope.data1.push({
                    key: "1",
                    x:val.years,
                    y:val.value

                });
            })
            //vm.BarData = $scope.data;
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

                        showMaxMin: false
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
        createSelectOptions();
        $scope.data = [{
          key: '1',
          values: $scope.data1
        }];
        /* Random Data Generator (took from nvd3.org) */
      /*  function generateData() {


                return {
                    key: '1',
                    values: $scope.data1
                };




        }

        /* Inspired by Lee Byron's test data generator.
        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }*/

        /* Another layer generator using gamma distributions.
        function stream_waves(n, m) {
            return d3.range(n).map(function(i) {
                return d3.range(m).map(function(j) {
                    var x = 20 * j / m - i / 3;
                    return 2 * x * Math.exp(-.5 * x);
                }).map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }*/





        //retrieve employees listing from API








    }
})();
