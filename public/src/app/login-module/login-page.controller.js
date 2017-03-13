(function() {
    'use strict';

    angular
        .module('login-module')
        .controller('LoginPageController', LoginPageController);

    /* @ngInject */
    function LoginPageController($state, triSettings,API_CONFIG,$http,$rootScope,Data, $sessionStorage,$scope, $location, $localStorage, Auth) {
        var vm = this;
        vm.loginClick = loginClick;
        $scope.failed = false;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };
        function errorAuth(res) {
            swal("Something went wrong", "Invalid credentials.");
           $rootScope.error = 'Invalid credentials.';
        }
        function successAuth(res) {

               $localStorage.token = res.token;
               //Auth.init();
               //to xw na emfanizetai gia to postman
               console.log(res.token);
               Data.getAuthenticatedUser(function (res) {

                 $sessionStorage.user = res.user;
                 $rootScope.user = $sessionStorage.user;
                 check();

               }, function () {
                   $rootScope.error = 'Failed to fetch restricted API content.';
              });
          }
        // H check den xrhsimopoihte kapou akoma alla h logikh ths aposkopei sto na elegxoume an exei dikaiwmata na dei kati o xrhsths
        function check() {
          if (Auth.userHasPermission(["administrator"])){
            var userName = Auth.currentUser().email;
             $state.go('triangular.user-page');
          }else{
            $state.go('triangular.Mybusiness');
          }
        }
        function loginClick() {
          var credentials = {
          email: vm.user.email,
          password: vm.user.password
          }
          Auth.signin(credentials, successAuth,errorAuth )

        }
        $scope.token = $localStorage.token;
        $scope.tokenClaims = Auth.getTokenClaims();
    }
})();
