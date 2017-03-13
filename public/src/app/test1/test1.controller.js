(function() {
    'use strict';

    angular
        .module('test1-module')
        .controller('test1PageController', test1PageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function test1PageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG,uiGmapGoogleMapApi,$log) {
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
        vm.allDayChanged = allDayChanged;
        vm.createSelectOptions=createSelectOptions;
        // create options for time select boxes (this will be removed in favor of mdDatetime picker when it becomes available)
        $scope.hours=[];
        $scope.minutes=[];
        $scope.map = { center: { latitude: 37.10120867317552, longitude: 25.352935058593744 }, zoom: 8 };
        vm.data = {
            account: {
                username: 'Oxygenna'
            }
        };

        $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;

    $scope.marker = {
      id: 0,
      coords: {
        latitude: 37.10120867317552,
        longitude: 25.352935058593744
      },
      options: { draggable: true },
      events: {
        click: function (marker) {
          swal({
            title: "Event",
                  text: vm.event.description,
                  timer: 5000,
                  showConfirmButton: true
            });
        },
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          vm.lat = marker.getPosition().lat();
          vm.lon = marker.getPosition().lng();
          $log.log(vm.lat);
          $log.log(vm.lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: vm.event.description,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
      $scope.coordsUpdates++;
    });
    $timeout(function () {
      $scope.marker.coords = {
        latitude: 37.10120867317552,
        longitude: 25.352935058593744
      };
      $scope.dynamicMoveCtr++;
      $timeout(function () {
        $scope.marker.coords = {
          latitude: 37.10120867317552,
          longitude: 25.352935058593744
        };
        $scope.dynamicMoveCtr++;
      }, 2000);
    }, 1000);
  $scope.updateContact= function() {
      var params = {
        name: vm.act.title,
        slug:vm.act.slug,
        description:vm.act.description,
        summary: vm.act.summary,
        availability: vm.act.availability,
        duration: vm.act.duration

      }
      console.log(params);
    $http.patch(API_CONFIG.BASE + '/api/activities/'+vm.act.id, params)
        .success(function(response) {
          console.log(response);
          $state.go('triangular.Activitys');


        }).error(function(response) {

        });
    }
    function createSelectOptions() {

        // hours
        for(var hour = 0; hour <= 23; hour++) {
            $scope.hours.push(hour);
        }
        // minutes
        for(var minute = 0; minute <= 59; minute++) {
            $scope.minutes.push(minute);
        }

        vm.act=$rootScope.activityToEdit;
        console.log(vm.act);
        console.log('1111');
        console.log($rootScope.activityToEdit);
    }

    // init
    createSelectOptions();
    function allDayChanged() {
        // if all day turned on and event already saved we need to create a new date
        if(vm.event.allDay === false && vm.event.end === null) {
            vm.event.end = moment(vm.event.start);
            vm.event.end.endOf('day');
            vm.end = vm.event.end.toDate();
            vm.endTime = convertMomentToTime(vm.event.end);
        }
    }





         //retrieve employees listing from API








    }
})();
