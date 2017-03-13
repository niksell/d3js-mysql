(function() {
    'use strict';

    angular
        .module('busin-module')
        .controller('EditBDialogController', EditBDialogController);

    /* @ngInject */
    function EditBDialogController($rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data,bus) {

        var vm = this;
        vm.cancelClick = cancelClick;
        $scope.settF = [];
        $scope.flag_ids = [];
        $scope.flag_name = [];
        $scope.flag_machine = [];
        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.bus = bus;
        vm.edit = edit;
        vm.event = event;
        vm.okSettingsClick = okSettingsClick;
        vm.update = update;
        $scope.per=[];
        $scope.perm=[];
        vm.selected=[];
        $scope.id=[];
        $scope.ac;
        vm.selected=[];
        // create options for time select boxes (this will be removed in favor of mdDatetime picker when it becomes available)
          $scope.hours=[];
          $scope.minutes=[];
        // create start and end date of event
      //  vm.start = event.start.toDate();
      //  vm.startTime = convertMomentToTime(event.start);

      //  if(event.end !== null) {
      //      vm.end = event.end.toDate();
      //      vm.endTime = convertMomentToTime(event.end);
      //  }
        // create start and end date of event


        ////////////////


        function update() {


        }
        function okSettingsClick() {
            var id=[];


        }
        function cancelClick() {
            $mdDialog.cancel();
        }

        function deleteClick() {
            vm.event.deleteMe = true;
            $mdDialog.hide(vm.event);
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
              if(vm.bus.active==1){
              $scope.ac="true";
            }else{
              $scope.ac="false";
            }
            $http.get(API_CONFIG.BASE + '/api/businesses/'+vm.bus.id+'/closed')
                .success(function(response) {


                }).error(function(response) {

                });



                vm.event.permissions=$scope.per;

        }

        // init
        createSelectOptions();


    }
})();
