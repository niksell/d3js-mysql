(function() {
    'use strict';

    angular
        .module('BookingManagement')
        .controller('participantsPageController', participantsPageController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function participantsPageController($scope,$state, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG) {
        var vm = this;
        vm.addParticipant = addParticipant;
        $scope.urls=[];
        $scope.visit=[];
        $scope.participants;
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
        vm.searchParticipants = searchParticipants;
        vm.removeFilter = removeFilter;
        vm.query;
        vm.deleteParticipant = deleteParticipant;
        $scope.$on('addParticipant', addParticipant);
        vm.participantDetail = participantDetail;
        vm.editParticipant=editParticipant;
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
                      $scope.participants.push(child);
                    })

                  }).error(function(response) {

                  });
            }
          }
        }
        /////////////////////////////////
        function editParticipant(participant,$event) {
          $mdDialog.show({
              controller: 'editParticipant',
              controllerAs: 'vm',
              templateUrl: 'app/BookingManagement/participants-module/participant-edit.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit participant',
                      confirmButtonText: 'Add'
                  },
                  participant: participant,
                  event: {
                      title: $filter('triTranslate')('Edit participant'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
             // vm.eventSources[0].events.push(event);
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('participant Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
        }
        /////////////////////////////////

        function participantDetail(participant, $event) {
            $mdDialog.show({
                controller: 'participantDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/BookingManagement/participants-module/participant-detail.tmpl.html',
                locals: {
                    participant: participant
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

                vm.searchParticipants();
            });
        }
        function searchParticipants(query) {
            //var order = query.order;
            console.log(query);
            //return $http.get(API_CONFIG.BASE + '/api/users/search').
            //success(function(data) {
            //    return data;
            //});
        }


        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

         //retrieve employees listing from API
        Data.getParticipants(function (res) {


          vm.query={
            order: 'Id',
            limit: res.data.per_page,
            page: 1,

            total:res.data.total
          }
          $scope.urls.push(res.data.next_page_url);
          $scope.participants = res.data.data;
          activate();

        }, function () {
           $rootScope.error = 'Failed to fetch restricted API content.';
       });
       function deleteParticipant(){

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
          text: "You will not be able to recover this participant!",
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
            swal("Deleted!", "Your participant has been deleted.", "success");
               $http.delete(API_CONFIG.BASE + '/api/participants/'+ Id)
                   .success(function(response) {
                     $mdToast.show(
                         $mdToast.simple()
                         .content($filter('triTranslate')('participant Deleted'))
                         .position('bottom right')
                         .hideDelay(2000)
                     );
                     $state.reload();

                   }).error(function(response) {

                   });
                 } else {
            swal("Cancelled", "Your participant is safe :)", "error");
          }
        });
       }


       function addParticipant(event, $event) {
           $mdDialog.show({
               controller: 'addParticipantController',
               controllerAs: 'vm',
               templateUrl: 'app/BookingManagement/participants-module/addParticipant.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add participant',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New participant'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('participant Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
              $state.reload();
           });
       }
       // listeners



    }
})();
