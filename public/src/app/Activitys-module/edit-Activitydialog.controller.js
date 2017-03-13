(function() {
    'use strict';

    angular
        .module('Activitys-module')
        .controller('EditActivityDialogController', EditActivityDialogController);

    /* @ngInject */
    function EditActivityDialogController($scope,uiGmapGoogleMapApi,$log,$timeout) {
        var vm = this;
        vm.event;
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

    function createSelectOptions() {

        // hours
        for(var hour = 0; hour <= 23; hour++) {
            $scope.hours.push(hour);
        }
        // minutes
        for(var minute = 0; minute <= 59; minute++) {
            $scope.minutes.push(minute);
        }


        console.log($scope.minutes);


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
    }
})();
