(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('EventRoleController', EventRoleController);

    /* @ngInject */
    function EventRoleController($localStorage,$rootScope ,$scope,$http, $mdDialog, $filter, triTheming, dialogData, API_CONFIG ,event, edit,Data) {

        var vm = this;
        vm.cancelClick = cancelClick;

      vm.selected=[];

        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;

        $scope.per=[];
        $scope.urlC=[];


        ////////////////



        function okClick() {
            var id=[];
            var bid=[];
            angular.forEach(vm.selected, function(child) {
                bid.push(child.id);
            });
            var params = {
              name: vm.event.name,
              machine:vm.event.machine,
              description: vm.event.desc,

              permissions:bid
            }
          $http.post(API_CONFIG.BASE + '/api/roles', params)
              .success(function(response) {
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


        function createSelectOptions() {
            // create options for time select boxes (this will be removed in favor of mdDatetime picker when it becomes available)

            $http.get(API_CONFIG.BASE + '/api/permissions')
                .success(function(response) {
                  angular.forEach(response.data.data, function(child) {
                    if (response.data.next_page_url != null) {
                      $scope.urlC.length = 0;
                      $scope.urlC.push(response.data.next_page_url);
                    }
                    $scope.per.push({
                          id:child.id,
                          name: child.name,
                          machine:child.machine
                      });

                  });
                  //Otan paw na to kanw me while mou mpainei atermono
                  if ($scope.urlC[0] != null) {
                    $http.get($scope.urlC[0])
                        .success(function(response) {
                          $scope.urlC.length = 0;
                          $scope.urlC.push(response.data.next_page_url);
                          angular.forEach(response.data.data, function(child) {
                            if (response.data.next_page_url != null) {
                              $scope.urlC.length = 0;
                              $scope.urlC.push(response.data.next_page_url);
                            }
                            $scope.per.push({
                                  id:child.id,
                                  name: child.name,
                                  machine:child.machine
                              });

                          });
                          if ($scope.urlC[0] != null) {

                            $http.get($scope.urlC[0])
                                .success(function(response) {
                                  $scope.urlC.length = 0;
                                  $scope.urlC.push(response.data.next_page_url);
                                  angular.forEach(response.data.data, function(child) {
                                    if (response.data.next_page_url != null) {
                                      $scope.urlC.length = 0;
                                      $scope.urlC.push(response.data.next_page_url);
                                    }

                                    $scope.per.push({
                                          id:child.id,
                                          name: child.name,
                                          machine:child.machine
                                    });

                                });
                                }).error(function(response) {

                                });
                              }
                        }).error(function(response) {

                        });
                      }
                }).error(function(response) {

                });

        }

        // init
        createSelectOptions();


    }
})();
