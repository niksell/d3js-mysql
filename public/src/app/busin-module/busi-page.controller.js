(function() {
    'use strict';

    angular
        .module('busin-module')
        .controller('BusPageController', BusPageController);
    /* @ngInject */
    function BusPageController($state,$scope, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addbus = addbus;
        $scope.page=[];
        init();
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
        vm.query = {
            order: 'Id',
            limit: 5,
            page: 1
        };
        vm.selected = [];
        vm.filter = {
            options: {
                debounce: 500
            }
        };
        vm.getbu = getbu;
        vm.removeFilter = removeFilter;

        vm.deleteBus = deleteBus;
        $scope.$on('addbus', addbus);
        vm.busDetail = busDetail;
        vm.editbus=editbus;
        /////////////////////////////////
        function editbus(bus,$event) {
          $mdDialog.show({
              controller: 'EditBDialogController',
              controllerAs: 'vm',
              templateUrl: 'app/busin-module/edit-Businessdialog.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit business',
                      confirmButtonText: 'Add'
                  },
                  bus: bus,
                  event: {
                      title: $filter('triTranslate')('Edit business'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
             // vm.eventSources[0].events.push(event);
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('bus Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function busDetail(bus, $event) {
            $mdDialog.show({
                controller: 'BusDetailDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/busin-module/detail-dialog.tmpl.html',
                locals: {
                    bus: bus,
                    event: {
                        title: $filter('triTranslate')('View business'),

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

                vm.getbu();
            });
        }

        function getbu() {
            //vm.promise = GithubService.getUsers(vm.query);
            //vm.promise.then(function(users){
              //  vm.users = users.data;
            //});
        }

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve  listing from API
         function init() {

                  var per;
                  var last;
                  Data.getBus(function (res) {
                      per=res.data.per_page;
                      last=res.data.last_page;

                    $scope.business = res.data.data;


                  }, function () {
                     $rootScope.error = 'Failed to fetch restricted API content.';
                 });
                 $scope.page.push({
                   perpage:per,
                   lastpage:last
                 });
        }
       function deleteBus(){

         var Id;
         angular.forEach(vm.selected, function(child) {
              Id=child.id;


         });
         var params = {
           id: Id
         }
         swal({
                title: "Are you sure?",
                text: "You will not be able to recover this business file!",
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
                     $http.delete(API_CONFIG.BASE + '/api/businesses/'+ Id)
                         .success(function(response) {
                           $mdToast.show(
                               $mdToast.simple()
                               .content($filter('triTranslate')('business Deleted'))
                               .position('bottom right')
                               .hideDelay(2000)
                           );

                           $state.reload();

                         }).error(function(response) {

                         });
                         swal("Deleted!", "Your business  has been deleted.", "success");
                } else {
                  swal("Cancelled", "Your business  is safe :)", "error");
                }
              });
          }


       function addbus(event, $event) {
           $mdDialog.show({
               controller: 'EventDialogController',
               controllerAs: 'vm',
               templateUrl: 'app/busin-module/event-dialog.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add Bus',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New Bus'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
              // vm.eventSources[0].events.push(event);
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('Business Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
               $state.reload();
           });
       }
       // listeners



    }
})();
