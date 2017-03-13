(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial','satellizer','ngStorage','ngResource','flow','vAccordion',
            'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'hljs', 'md.data.table', angularDragula(angular), 'ngFileUpload', 'nvd3',

            'app.translate','multiselect-searchtree','isteven-multi-select',
            // only need one language?  if you want to turn off translations
            // comment out or remove the 'app.translate', line above
            'app.permission','BookingManagement',
            // dont need permissions?  if you want to turn off permissions
            // comment out or remove the 'app.permission', line above
            // also remove 'permission' from the first line of dependencies
            // https://github.com/Narzerus/angular-permission see here for why
            // uncomment above to activate the example seed module
            //'seed-module',
            'login-module','Settings',

            'busin-module','calendar-module','Activitys-module','Payment-module'
            //'app.examples'
            ,'Mybusiness-module','test1-module','UserManagement',
        ])

        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'BASE': 'http://tooristas.dev:8000'
        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider,$httpProvider) {

            //  <script src="../bower_components/satellizer/dist/satellizer.js"></script>
    //<script src="../bower_components/ngstorage/ngStorage.js"></script>
			// Satellizer configuration that specifies which API
			// route the JWT should be retrieved from
			$authProvider.loginUrl = '/api/authenticate';
      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
     return {
         'request': function (config) {
             config.headers = config.headers || {};
             if ($localStorage.token) {
                 config.headers.Authorization = 'Bearer ' + $localStorage.token;
             }
             return config;
         },
         'responseError': function (response) {
             if (response.status === 401 || response.status === 403) {
                 $location.path('/login-page');
             }
             return $q.reject(response);
         }
     };
  }]);
    })
    .config(['flowFactoryProvider', function (flowFactoryProvider) {
        flowFactoryProvider.defaults = {
          target: '',
          permanentErrors: [404, 500, 501],
          maxChunkRetries: 1,
          chunkRetryInterval: 5000,
          simultaneousUploads: 4
        };
        //flowFactoryProvider.factory = fustyFlowFactory;

        flowFactoryProvider.on('catchAll', function (event) {
          console.log('catchAll', arguments);
        });
        // Can be used with different implementations of Flow.js
        // flowFactoryProvider.factory = fustyFlowFactory;
      }])
    .factory('Auth', function ($http,$sessionStorage,$state, $localStorage, $resource, $rootScope, API_CONFIG,RoleStore,$q) {
       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user;
       }
       //var auth = {};
       var tokenClaims = getClaimsFromToken();
       var userHasPermissionForView = function(view){
           if(!auth.isLoggedIn()){
               return false;
           }

           if(!view.permissions || !view.permissions.length){
               return true;
           }

           return auth.userHasPermission(view.permissions);
       };
       var auth = {
           init : function(){
               if (auth.isLoggedIn()){
                   $rootScope.user = currentUser();
               }
            },
           signup: function (data, success, error) {
               $http.post(API_CONFIG.BASE + '/signup', data).success(success).error(error)
           },
           signin: function (data, success, error) {
               $http.post(API_CONFIG.BASE + '/api/authenticate', data).success(success).error(error)
          },
           logout: function (success) {
               tokenClaims = {};
               delete $localStorage.token;
               delete $sessionStorage.user;
               delete $rootScope.user;
                $state.go('authenticate.login');
           },
           checkPermissionForView : function(view) {
               if (!view.requiresAuthentication) {
                   return true;
               }

               return userHasPermissionForView(view);
           },
           getTokenClaims: function () {
               return tokenClaims;
           },
           currentUser : function(){
               return $sessionStorage.user;
           },
           hasPermission :function(permission) {
               var deferred = $q.defer();
               var hasPermission = false;

               // check if user has permission via its roles

               angular.forEach($sessionStorage.user.roles, function(role) {
                   // check role exists
                   if(RoleStore.hasRoleDefinition(role.machine)) {
                       // get the role
                       var roles = RoleStore.getStore();
                       if(angular.isDefined(roles[role.machine])) {
                           // check if the permission we are validating is in this role's permissions
                           if(-1 !== roles[role.machine].validationFunction.indexOf(permission)) {
                               hasPermission = true;
                           }
                       }
                   }
               });

               // if we have permission resolve otherwise reject the promise
               if(hasPermission) {
                   deferred.resolve();
               }
               else {
                   deferred.reject();
               }

               // return promise
               return deferred.promise;
           },
            userHasPermission :function(permissions){
                if(!auth.isLoggedIn()){
                    return false;
                }

                var found = false;


                angular.forEach(permissions, function(permission, index){
                    if ($sessionStorage.user.roles[0].machine.indexOf(permission) >= 0){
                        found = true;
                        return;
                    }
                });

                return found;
            },



            isLoggedIn : function(){
                return $sessionStorage.user != null;
            }
       };

       return auth;
   })
   .factory('Data', function ($http, API_CONFIG) {

       return {
           getUsers: function (success, error) {
               //updated
               $http.get(API_CONFIG.BASE + '/api/users').success(success).error(error)
           },
           getAuthenticatedUser: function (success, error) {
               //Updated api
               $http.get(API_CONFIG.BASE + '/api/authenticate/user').success(success).error(error)
           },
           getApiData: function (success, error) {
               $http.get(API_CONFIG.BASE + '/api/authenticate/user').success(success).error(error)
           },getProfile: function (success, error) {
                //updated
               $http.get(API_CONFIG.BASE + '/api/profile').success(success).error(error)
           },getRoles: function (success, error) {
                //updated
               $http.get(API_CONFIG.BASE + '/api/roles').success(success).error(error)
           },getBus: function (success, error) {
               $http.get(API_CONFIG.BASE + '/api/businesses').success(success).error(error)
           },getMerchant: function (success, error) {
                //updated
               $http.get(API_CONFIG.BASE + '/api/merchants').success(success).error(error)
           },getPermissions: function (success, error) {
                //updated
               $http.get(API_CONFIG.BASE + '/api/permissions').success(success).error(error)
           },getFlags:function (success, error) {
             //updated
               $http.get(API_CONFIG.BASE + '/api/flags').success(success).error(error)
           },getParticipants:function (success, error) {
              //updated
               $http.get(API_CONFIG.BASE + '/api/participants').success(success).error(error)
           },getCustomers:function (success, error) {
              //updated
               $http.get(API_CONFIG.BASE + '/api/customers').success(success).error(error)
           },getActivities:function (success, error) {
               $http.get(API_CONFIG.BASE + '/api/activities').success(success).error(error)
           },getLanguages:function (success, error) {
               $http.get(API_CONFIG.BASE + '/api/languages').success(success).error(error)
           },getTaxonomies:function (success, error) {
               $http.get(API_CONFIG.BASE + '/api/taxonomies').success(success).error(error)
           }
       };
   });
})();
