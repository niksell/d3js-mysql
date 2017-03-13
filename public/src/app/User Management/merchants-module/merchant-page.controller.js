(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('MerchantPageController', MerchantPageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function MerchantPageController($state,$scope, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addMerchant = addMerchant;
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
        vm.getMerchants = getMerchants;
        vm.removeFilter = removeFilter;

        vm.deleteMerchant = deleteMerchant;
        $scope.$on('addMerchant', addMerchant);
        vm.MerchantDetails = MerchantDetails;
        vm.editMerchant=editMerchant;
        /////////////////////////////////
        function editMerchant(merch,$event) {
          $mdDialog.show({
              controller: 'EditMDialogController',
              controllerAs: 'vm',
              templateUrl: 'app/User Management/merchants-module/edit-Mdialog.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit merchant',
                      confirmButtonText: 'Add'
                  },
                  merch: merch,
                  event: {
                      title: $filter('triTranslate')('Edit merchant'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
             // vm.eventSources[0].events.push(event);
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('Merchant Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function MerchantDetails(merch, $event) {
            $mdDialog.show({
                controller: 'MerDetailDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/User Management/merchants-module/detail-Mdialog.tmpl.html',
                locals: {
                    merch: merch,
                    event: {
                        title: $filter('triTranslate')('View merchant'),

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

                vm.getMerchants();
            });
        }

        function getMerchants() {
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
                  Data.getMerchant(function (res) {

                    $scope.merchants = res.data.data;
                    if($scope.merchants.length==0){
                      $scope.empty=true;
                    }else{
                      $scope.empty=false;

                    }

                  }, function () {
                     $rootScope.error = 'Failed to fetch restricted API content.';
                 });
        }
       function deleteMerchant(){

         var Id;
         angular.forEach(vm.selected, function(child) {
              Id=child.id;


         });
         var params = {
           id: Id
         }
         swal({
           title: "Are you sure?",
           text: "You will not be able to recover this Merchant!",
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
                 $http.delete(API_CONFIG.BASE + '/api/merchants/'+ Id)
                     .success(function(response) {
                       $mdToast.show(
                           $mdToast.simple()
                           .content($filter('triTranslate')('Merchant Deleted'))
                           .position('bottom right')
                           .hideDelay(2000)
                       );

                       $state.reload();

                     }).error(function(response) {

                     });
                     swal("Deleted!", "Your Merchant has been deleted.", "success");
            } else {
              swal("Cancelled", "Your Merchant is safe :)", "error");
            }
          });
       }


       function addMerchant(event, $event) {
           $mdDialog.show({
               controller: 'EventMerchantController',
               controllerAs: 'vm',
               templateUrl: 'app/User Management/merchants-module/event-Merchant.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add Merchant',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New Merchant'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
              // vm.eventSources[0].events.push(event);
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('Merchant Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
               $state.reload();
           });
       }
       // listeners



    }
})();
