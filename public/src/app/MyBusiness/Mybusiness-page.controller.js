(function() {
    'use strict';

    angular
        .module('Mybusiness-module')
        .controller('MybusinessController', MybusinessController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function MybusinessController($scope,$rootScope,Data,$http, API_CONFIG) {
        var vm = this;

        vm.bus ;
        vm.event ;
        vm.allDayChanged = allDayChanged;
        vm.createSelectOptions=createSelectOptions;
        vm.selected=[];
        $scope.id=[];
        $scope.ac;
        // create options for time select boxes (this will be removed in favor of mdDatetime picker when it becomes available)
          $scope.hours=[];
          $scope.minutes=[];


       $scope.InsertItems = function(e)
          {
          //Do what you need to do
          console.log(e);
          }
          $scope.stepsModel = [];

    $scope.imageUpload = function(event){
         var files = event.target.files; //FileList object
         console.log(event);
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded;
                 reader.readAsDataURL(file);
         }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
        });
    }


//        console.log(vm.user);
        $scope.update = function()
        {
          console.log(1);
          var params = {
            firstname: vm.user.Firstname,
            lastname:vm.user.Lastname,
            email: vm.user.email,
            mobile: vm.user.mobile,

            password: vm.user.password,
          }
          console.log(params);
          $http.patch(API_CONFIG.BASE + '/api/profile/'+vm.user.Id, params)
            .success(function(response) {
              console.log(response);


            }).error(function(response) {

            });
        }
        function createSelectOptions() {
          $http.get(API_CONFIG.BASE + '/api/businesses/'+1)
              .success(function(response) {
              console.log('1243');
               console.log(response);
               vm.bus=response.data;
               console.log(vm.bus);
                 if(vm.bus.active==1){
                 $scope.ac="true";
               }else{
                 $scope.ac="false";
               }


              }).error(function(response) {

              });
            // hours
            for(var hour = 0; hour <= 23; hour++) {
                $scope.hours.push(hour);
            }
            // minutes
            for(var minute = 0; minute <= 59; minute++) {
                $scope.minutes.push(minute);
            }

              console.log(  $scope.ac);
            $http.get(API_CONFIG.BASE + '/api/businesses/'+1+'/closed')
                .success(function(response) {
                console.log('1243');
                 console.log(response);


                }).error(function(response) {

                });



              //  vm.event.permissions=$scope.per;

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
