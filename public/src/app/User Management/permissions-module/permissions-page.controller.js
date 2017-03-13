(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('permissionsPageController', permissionsPageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function permissionsPageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addPermission = addPermission;
        $scope.urls=[];
        $scope.visit=[];
        $scope.permissions;
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
        vm.searchPermission = searchPermission;
        vm.removeFilter = removeFilter;
        vm.query;
        vm.deletePermission = deletePermission;
        $scope.$on('addPermission', addPermission);
        vm.permissionDetail = permissionDetail;
        vm.editPermision=editPermision;
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
                      $scope.permissions.push(child);
                    })

                  }).error(function(response) {

                  });
            }
          }
        }
        /////////////////////////////////
        function editPermision(permission,$event) {
          $mdDialog.show({
              controller: 'editPermision',
              controllerAs: 'vm',
              templateUrl: 'app/User Management/permissions-module/permission-edit.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit permission',
                      confirmButtonText: 'Add'
                  },
                  permission: permission,
                  event: {
                      title: $filter('triTranslate')('Edit permission'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('permission Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function permissionDetail(permission, $event) {
            $mdDialog.show({
                controller: 'PermissionDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/User Management/permissions-module/permission-detail.tmpl.html',
                locals: {
                    permission: permission
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

                vm.searchPermission();
            });
        }
        function searchPermission(query) {

        }

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve employees listing from API
        Data.getPermissions(function (res) {

          vm.query={
            order: 'Id',
            limit: res.data.per_page,
            page: 1,

            total:res.data.total
          }
          $scope.urls.push(res.data.next_page_url);
          $scope.permissions = res.data.data;
          activate();

        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });
       function deletePermission(){
         var Id;
         angular.forEach(vm.selected, function(child) {
              Id=child.id;
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
          text: "You will not be able to recover this permission!",
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
            swal("Deleted!", "Your permission has been deleted.", "success");
               $http.delete(API_CONFIG.BASE + '/api/permissions/'+ Id)
                   .success(function(response) {
                     $mdToast.show(
                         $mdToast.simple()
                         .content($filter('triTranslate')('permission Deleted'))
                         .position('bottom right')
                         .hideDelay(2000)
                     );
                     $state.reload();

                   }).error(function(response) {

                   });
                 } else {
            swal("Cancelled", "Your permission is safe :)", "error");
          }
        });
       }


       function addPermission(event, $event) {
           $mdDialog.show({
               controller: 'AddPermissionController',
               controllerAs: 'vm',
               templateUrl: 'app/User Management/permissions-module/addpermission.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add permission',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New permission'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('permission Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
              $state.reload();
           });
       }



    }
})();
