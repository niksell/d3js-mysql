(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('UserPageController', UserPageController);
    /* @ngInject */
    function UserPageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG,UserSearchService) {
        var vm = this;
        vm.addUser = addUser;
        $scope.urls=[];
        $scope.visit=[];
        $scope.employees;
        $scope.Susers=[];
        $scope.sear=false;
        vm.query;
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
        vm.selected = [];
        vm.filter = {
            options: {
                debounce: 500
            }
        };

        $scope.$on('addUser', addUser);
        vm.getUsers = getUsers;
        vm.removeFilter = removeFilter;
        vm.deleteUser = deleteUser;
        vm.UserDetail = UserDetail;
        vm.editUser=editUser;
        $scope.pagecontroller = function(page, limit) {

            if($scope.urls[page-2]!=null   ){
              if($scope.visit.indexOf(page-2)==-1){
              $http.get($scope.urls[page-2])
                  .success(function(response) {
                    $scope.visit.push(page-2);
                    if(response.data.next_page_url!=null){
                      $scope.urls.push(response.data.next_page_url);
                    }
                    angular.forEach(response.data.data, function(child) {
                      $scope.employees.push(child);
                    })

                  }).error(function(response) {

                  });
            }
          }
        }
        /////////////////////////////////
        function editUser(employee,$event) {
          $mdDialog.show({
              controller: 'EditController',
              controllerAs: 'vm',
              templateUrl: 'app/User Management/user-module/edit.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit User',
                      confirmButtonText: 'Add'
                  },
                  employee: employee,
                  event: {
                      title: $filter('triTranslate')('Edit User'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('User Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function UserDetail(employee, $event) {
            $mdDialog.show({
                controller: 'UserDetailDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/User Management/user-module/detail-dialog.tmpl.html',
                locals: {
                    employee: employee
                },
                targetEvent: $event
            });
        }
        ////////////////

        function activate() {
            var bookmark;
            $scope.$watch('vm.query.filter', function (newValue, oldValue) {
                if(!oldValue) {
                    bookmark = vm.query.page;
                }

                if(newValue !== oldValue) {
                    vm.query.page = 1;
                }

                if(!newValue) {
                    vm.query.page = bookmark;
                }

              //  vm.getUsers();
            });
        }

      function getUsers() {
            $scope.sear=true;
            $scope.Susers=null;
            vm.promise = UserSearchService.getUsers(vm.query);
            vm.promise.then(function(users){
                $scope.Susers = users.data.data;
            });
      }

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';
            $scope.sear=false;
            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve employees listing from API
        Data.getUsers(function (res) {


          vm.query={
            filter: '',
            order: 'Id',
            limit: res.data.per_page,
            page: 1,
            total:res.data.total
          }
          $scope.urls.push(res.data.next_page_url);
          $scope.employees = res.data.data;
          activate();

        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });
       function deleteUser(){

         var Id;
         angular.forEach(vm.selected, function(child) {
              Id=child.id;
              //gia otan svhnei polla
             //console.log(child.roles[0].machine);
             /*angular.forEach(child.roles, function(role) {
               console.log(role.machine);
               $scope.roles.push(role.machine);
             }).error(function(role) {

             });*/
          });
         var params = {
           id: Id
         }
         swal({
          title: "Are you sure?",
          text: "You will not be able to recover this User!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            swal("Deleted!", "Your User has been deleted.", "success");
               $http.delete(API_CONFIG.BASE + '/api/users/'+ Id)
                   .success(function(response) {
                     $mdToast.show(
                         $mdToast.simple()
                         .content($filter('triTranslate')('User Deleted'))
                         .position('bottom right')
                         .hideDelay(2000)
                     );
                     $state.reload();

                   }).error(function(response) {

                   });
                 } else {
            swal("Cancelled", "Your User is safe :)", "error");
          }
        });
       }


       function addUser(event, $event) {
           $mdDialog.show({
               controller: 'EventController',
               controllerAs: 'vm',
               templateUrl: 'app/User Management/user-module/event.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add User',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New User'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
              // vm.eventSources[0].events.push(event);
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('User Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
              $state.reload();
           });
       }
       // listeners



    }
})();
