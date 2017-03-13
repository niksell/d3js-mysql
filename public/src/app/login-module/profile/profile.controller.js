(function() {
    'use strict';

    angular
        .module('login-module')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope,$rootScope,Data,$http, API_CONFIG) {
        var vm = this;
        $scope.first;
        $scope.last;
        $scope.mobile;
        $scope.email;
        $scope.id;
        $scope.InsertItems = function(e)
          {
          //Do what you need to do
          console.log(e);
          }
        $scope.stepsModel = [];

        $scope.imageUpload = function(event){
             var files = event.target.files; //FileList object
             console.log(files);
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

        Data.getProfile(function (res) {

                  $scope.email=res.data.email;
                  $scope.first=res.data.firstname;
                  $scope.last=res.data.lastname;
                  $scope.mobile=res.data.mobile;
                  $scope.id=res.data.id;
                  vm.user = {
                      Id:$scope.id,
                      Firstname: $scope.first,
                      Lastname:$scope.last,
                      email: $scope.email,
                      mobile: $scope.mobile,

                      current: '',
                      password: '',
                      confirm: ''
                  };
            }, function () {
               $rootScope.error = 'Failed to fetch restricted API content.';
           });

        $scope.update = function()
        {
          var params = {
            firstname: vm.user.Firstname,
            lastname:vm.user.Lastname,
            email: vm.user.email,
            mobile: vm.user.mobile,

            password: vm.user.password,
          }
          $http.patch(API_CONFIG.BASE + '/api/profile/'+vm.user.Id, params)
            .success(function(response) {


            }).error(function(response) {

            });
        }
    }
})();
