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

            // dont need permissions?  if you want to turn off permissions
            // comment out or remove the 'app.permission', line above
            // also remove 'permission' from the first line of dependencies
            // https://github.com/Narzerus/angular-permission see here for why
            // uncomment above to activate the example seed module
            //'seed-module',
            'eurozone','barChart','lineChart','scatterPlot',
            //'app.permission'//,'app.examples'
        ])

        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'BASE': 'http://eurozoneg.dev:8000'
        })

   .factory('Data', function ($http, API_CONFIG) {

       return {
           getDefinitions: function (success, error) {
               //updated
               $http.get(API_CONFIG.BASE + '/api/definition').success(success).error(error)
           },
           getCountrys: function (success, error) {
               //Updated api
               $http.get(API_CONFIG.BASE + '/api/countrys').success(success).error(error)
           },
           getYears: function (success, error) {
               $http.get(API_CONFIG.BASE + '/api/years').success(success).error(error)
           }
       };
   });
})();
