(function() {
    'use strict';

    angular
        .module('Activitys-module')
        .controller('addActivitysController', addActivitysController);

    /* @ngInject */
    function addActivitysController($rootScope ,$scope,$http,dialogData, $mdDialog, $filter,API_CONFIG,event) {
      var vm = this;
      vm.cancelClick = cancelClick;
      vm.dialogData = dialogData;

      vm.deleteClick = deleteClick;
      vm.event=event ;
      vm.okClick = okClick;



      function okClick() {

          var params = {
            title: vm.event.titl,
            slug:vm.event.slug,
            description:vm.event.desc,
            summary: vm.event.summary,
            availability: vm.event.availability,
            duration: vm.event.duration

          }
          console.log(params);
        $http.post(API_CONFIG.BASE + '/api/activities', params)
            .success(function(response) {
              console.log(response);
              $mdDialog.hide(vm.event);


            }).error(function(response) {

            });
      }

      function cancelClick() {
          $mdDialog.cancel();
      }

      function deleteClick() {
          vm.event.deleteMe = true;
          $mdDialog.hide(vm.event);
      }





    }
})();
