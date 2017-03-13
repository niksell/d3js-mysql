(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('RolePageController', RolePageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function RolePageController($state,$scope, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addRole = addRole;
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
        vm.getRoles = getRoles;
        vm.removeFilter = removeFilter;
        vm.query = {
            order: 'Id',
            limit: 5,
            page: 1
        };
        vm.deleteRole = deleteRole;
        $scope.$on('addRole', addRole);
        vm.RoleDetail = RoleDetail;
        vm.editRole=editRole;
        /////////////////////////////////
        function editRole(role,$event) {
          $mdDialog.show({
              controller: 'EditRoleDialogController',
              controllerAs: 'vm',
              templateUrl: 'app/User Management/role-module/edit-role-dialog.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit Role',
                      confirmButtonText: 'Add'
                  },
                  role: role,
                  event: {
                      title: $filter('triTranslate')('Edit Role'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('Role Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function RoleDetail(role, $event) {
            $mdDialog.show({
                controller: 'RoleDetailDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/User Management/role-module/detail-dialog.tmpl.html',
                locals: {
                    role: role,
                    event: {
                        title: $filter('triTranslate')('View Role'),

                    },
                },
                targetEvent: $event
            });
        }
        activate();
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

                vm.getRoles();
            });
        }

        function getRoles() {
          //gia to search otan ginei like users
        }

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve  listing from API
        Data.getRoles(function (res) {

          $scope.roles = res.data;

        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });
       function deleteRole(){
         var Id;
         angular.forEach(vm.selected, function(child) {
              Id=child.id;
         });
         var params = {
           id: Id
         }
         swal({
            title: "Are you sure?",
            text: "You will not be able to recover this role!",
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
                 $http.delete(API_CONFIG.BASE + '/api/roles/'+ Id)
                     .success(function(response) {
                       $mdToast.show(
                           $mdToast.simple()
                           .content($filter('triTranslate')('role Deleted'))
                           .position('bottom right')
                           .hideDelay(2000)
                       );

                       $state.reload();

                     }).error(function(response) {

                     });
                     swal("Deleted!", "role has been deleted.", "success");
           } else {
              swal("Cancelled", "role is safe :)", "error");
            }
          });
       }


       function addRole(event, $event) {
           $mdDialog.show({
               controller: 'EventRoleController',
               controllerAs: 'vm',
               templateUrl: 'app/User Management/role-module/add-dialog.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add Role',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New Role'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('role Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
               $state.reload();
           });
       }


    }
})();
