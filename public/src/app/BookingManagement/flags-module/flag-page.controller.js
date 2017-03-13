(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('FlagPageController', FlagPageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function FlagPageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addFlag = addFlag;
        $scope.urls=[];
        $scope.visit=[];
        $scope.flags;
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
        vm.searchflags = searchflags;
        vm.removeFilter = removeFilter;
        vm.query;
        vm.deleteFlag = deleteFlag;
        $scope.$on('addFlag', addFlag);
        vm.flagDetail = flagDetail;
        vm.editFlag=editFlag;
        $scope.pageContro = function(page, limit) {

            if($scope.urls[page-2]!=null   ){
              if($scope.visit.indexOf(page-2)==-1){
              $http.get($scope.urls[page-2])
                  .success(function(response) {
                    $scope.visit.push(page-2);
                    if(response.data.next_page_url!=null){
                      $scope.urls.push(response.data.next_page_url);
                    }
                    angular.forEach(response.data.data, function(child) {
                      $scope.flags.push(child);
                    })

                  }).error(function(response) {

                  });
            }
          }
        }
        /////////////////////////////////
        function editFlag(flag,$event) {
          $mdDialog.show({
              controller: 'editFlag',
              controllerAs: 'vm',
              templateUrl: 'app/BookingManagement/flags-module/flag-edit.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit flag',
                      confirmButtonText: 'Add'
                  },
                  flag: flag,
                  event: {
                      title: $filter('triTranslate')('Edit flag'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
             // vm.eventSources[0].events.push(event);
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('flag Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function flagDetail(flag, $event) {
            $mdDialog.show({
                controller: 'flagDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/BookingManagement/flags-module/flag-detail.tmpl.html',
                locals: {
                    flag: flag
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

                vm.searchflags();
            });
        }
        function searchflags(query) {

        }


        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve employees listing from API
        Data.getFlags(function (res) {

          vm.query={
            order: 'Id',
            limit: res.data.per_page,
            page: 1,

            total:res.data.total
          }
          $scope.urls.push(res.data.next_page_url);
          $scope.flags = res.data.data;
          activate();

        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });
       function deleteFlag(){

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
          text: "You will not be able to recover this Flag!",
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
            swal("Deleted!", "Your flag has been deleted.", "success");
               $http.delete(API_CONFIG.BASE + '/api/flags/'+ Id)
                   .success(function(response) {
                     $mdToast.show(
                         $mdToast.simple()
                         .content($filter('triTranslate')('flag Deleted'))
                         .position('bottom right')
                         .hideDelay(2000)
                     );
                     $state.reload();

                   }).error(function(response) {

                   });
                 } else {
            swal("Cancelled", "Your flag is safe :)", "error");
          }
        });
       }


       function addFlag(event, $event) {
           $mdDialog.show({
               controller: 'AddFlagController',
               controllerAs: 'vm',
               templateUrl: 'app/BookingManagement/flags-module/addFlag.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add Flag',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New Flag'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
              // vm.eventSources[0].events.push(event);
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('Flag Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
              $state.reload();
           });
       }
       // listeners



    }
})();
