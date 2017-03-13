(function() {
    'use strict';

    angular
        .module('UserManagement')
        .controller('customersPageController', customersPageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function customersPageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addCustomer = addCustomer;
        $scope.urls=[];
        $scope.visit=[];
        $scope.customers;
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
        vm.searchCustomers = searchCustomers;
        vm.removeFilter = removeFilter;
        vm.query;
        vm.deleteCustomer = deleteCustomer;
        $scope.$on('addCustomer', addCustomer);
        vm.CustomerDetail = CustomerDetail;
        vm.editCustomer=editCustomer;
        $scope.pageController = function(page, limit) {

            if($scope.urls[page-2]!=null   ){
              if($scope.visit.indexOf(page-2)==-1){
              $http.get($scope.urls[page-2])
                  .success(function(response) {
                    $scope.visit.push(page-2);
                    if(response.data.next_page_url!=null){
                      $scope.urls.push(response.data.next_page_url);
                    }
                    angular.forEach(response.data.data, function(child) {
                      $scope.customers.push(child);
                    })

                  }).error(function(response) {

                  });
            }
          }
        }
        /////////////////////////////////
        function editCustomer(customer,$event) {
          $mdDialog.show({
              controller: 'editCustomer',
              controllerAs: 'vm',
              templateUrl: 'app/User Management/customers-module/customer-edit.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit customer',
                      confirmButtonText: 'Add'
                  },
                  customer: customer,
                  event: {
                      title: $filter('triTranslate')('Edit customer'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
             // vm.eventSources[0].events.push(event);
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('customer Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function CustomerDetail(customer, $event) {
            $mdDialog.show({
                controller: 'customerDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/User Management/customers-module/customer-detail.tmpl.html',
                locals: {
                    customer: customer
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

                vm.searchCustomers();
            });
        }
        function searchCustomers(query) {

        }

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve employees listing from API
        Data.getCustomers(function (res) {

          vm.query={
            order: 'Id',
            limit: res.data.per_page,
            page: 1,

            total:res.data.total
          }
          $scope.urls.push(res.data.next_page_url);
          $scope.customers = res.data.data;
          if($scope.customers.length==0){
            $scope.empty=true;
          }else{
            $scope.empty=false;

          }
          activate();

        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });
       function deleteCustomer(){

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
          text: "You will not be able to recover this Customer!",
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
            swal("Deleted!", "Your Customer has been deleted.", "success");
               $http.delete(API_CONFIG.BASE + '/api/customers/'+ Id)
                   .success(function(response) {
                     $mdToast.show(
                         $mdToast.simple()
                         .content($filter('triTranslate')('Customer Deleted'))
                         .position('bottom right')
                         .hideDelay(2000)
                     );
                     $state.reload();

                   }).error(function(response) {

                   });
                 } else {
            swal("Cancelled", "Your Customer is safe :)", "error");
          }
        });
       }


       function addCustomer(event, $event) {
           $mdDialog.show({
               controller: 'addCustomerController',
               controllerAs: 'vm',
               templateUrl: 'app/User Management/customers-module/addCustomer.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add Customer',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New customer'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
              // vm.eventSources[0].events.push(event);
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('customer Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
              $state.reload();
           });
       }
       // listeners



    }
})();
