(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('TaxonomiesPageController', TaxonomiesPageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function TaxonomiesPageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addTaxonomy = addTaxonomy;
        $scope.urls=[];
        $scope.visit=[];
        $scope.Taxonomies;
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
        vm.searchTaxonomies = searchTaxonomies;
        vm.removeFilter = removeFilter;
        vm.query;
        vm.deleteTaxonomies = deleteTaxonomies;
        $scope.$on('addTaxonomy', addTaxonomy);
        vm.TaxonomyDetail = TaxonomyDetail;
        vm.editTaxonomy=editTaxonomy;
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
                      $scope.Taxonomies.push(child);
                    })

                  }).error(function(response) {

                  });
            }
          }
        }
        /////////////////////////////////
        function editTaxonomy(Taxonomy,$event) {
          $mdDialog.show({
              controller: 'editTaxonomy',
              controllerAs: 'vm',
              templateUrl: 'app/Settings/Taxonomies/taxonomies-edit.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit Taxonomy',
                      confirmButtonText: 'Add'
                  },
                  Taxonomy: Taxonomy,
                  event: {
                      title: $filter('triTranslate')('Edit Taxonomy'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
             // vm.eventSources[0].events.push(event);
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('Taxonomy Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function TaxonomyDetail(Taxonomy, $event) {
            $mdDialog.show({
                controller: 'TaxonomyDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/Settings/Taxonomies/taxonomies-detail.tmpl.html',
                locals: {
                    Taxonomy: Taxonomy
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

                vm.searchTaxonomies();
            });
        }
        function searchTaxonomies(query) {

        }


        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve employees listing from API
        Data.getTaxonomies(function (res) {
          console.log(res);
          vm.query={
            order: 'Id',
            limit: res.data.per_page,
            page: 1,

            total:res.data.total
          }
          $scope.urls.push(res.data.next_page_url);
          $scope.Taxonomies = res.data;
          activate();

        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });
       function deleteTaxonomies(){

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
          text: "You will not be able to recover this Taxonomy!",
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
            swal("Deleted!", "Your Taxonomy has been deleted.", "success");
               $http.delete(API_CONFIG.BASE + '/api/taxonomies/'+ Id)
                   .success(function(response) {
                     $mdToast.show(
                         $mdToast.simple()
                         .content($filter('triTranslate')('Taxonomy Deleted'))
                         .position('bottom right')
                         .hideDelay(2000)
                     );
                     $state.reload();

                   }).error(function(response) {

                   });
                 } else {
            swal("Cancelled", "Your Taxonomy is safe :)", "error");
          }
        });
       }


       function addTaxonomy(event, $event) {
           $mdDialog.show({
               controller: 'AddTaxonomyController',
               controllerAs: 'vm',
               templateUrl: 'app/Settings/Taxonomies/addTaxonomy.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add Taxonomy',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New Taxonomy'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
              // vm.eventSources[0].events.push(event);
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('Taxonomy Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
              $state.reload();
           });
       }
       // listeners



    }
})();
