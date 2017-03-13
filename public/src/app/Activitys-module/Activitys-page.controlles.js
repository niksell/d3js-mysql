(function() {
    'use strict';

    angular
        .module('Activitys-module')
        .controller('MyActivitysController', MyActivitysController);
        ///////ELEMENTS TABLE
    /* @ngInject */
    function MyActivitysController($state,$scope, $q, $timeout, $mdToast, $filter, $mdDialog,$http,$rootScope,Data,API_CONFIG,uiGmapGoogleMapApi) {
        var vm = this;
        vm.addActiviy = addActiviy;
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

        vm.deleteActivity = deleteActivity;
        $scope.$on('addActiviy', addActiviy);
        vm.activityDetail = activityDetail;
        vm.editactivity=editactivity;
        /////////////////////////////////
        function editactivity(activity,$event) {
          /*
          $mdDialog.show({
              controller: 'EditActivityDialogController',
              controllerAs: 'vm',
              templateUrl: 'app/test1/test1-page.tmpl.html',
              targetEvent: $event,
              focusOnOpen: false,
              locals: {
                  dialogData: {
                      title: 'Edit activity',
                      confirmButtonText: 'Add'
                  },
                  activity: activity,
                  event: {
                      title: $filter('triTranslate')('Edit Activity'),

                  },
                  edit: false
              }
          })
          .then(function(event) {
             // vm.eventSources[0].events.push(event);
              $mdToast.show(
                  $mdToast.simple()
                  .content($filter('triTranslate')('activity Edited'))
                  .position('bottom right')
                  .hideDelay(2000)
              );
              $state.reload();
          });
          */
          $rootScope.activityToEdit=activity;
          console.log($rootScope.activityToEdit);

          $state.go('triangular.test1-page');
        }
        /////////////////////////////////

        function activityDetail(activity, $event) {
            $mdDialog.show({
                controller: 'activityDetailDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/Activitys-module/detail-activity.tmpl.html',
                locals: {
                    activity: activity,
                    event: {
                        title: $filter('triTranslate')('View activitys'),

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
                  Data.getActivities(function (res) {
                    console.log(res);
                    console.log("11111111");
                    console.log(res.data);


                      per=res.data.per_page;
                      last=res.data.last_page;



                    $scope.activitys = res.data.data;


                  }, function () {
                     $rootScope.error = 'Failed to fetch restricted API content.';
                 });
                 $scope.page.push({
                   perpage:per,
                   lastpage:last
                 });
                   console.log( $scope.page);
        }
       function deleteActivity(){
         console.log('1111111113333333333');
         console.log(vm.selected);
         var Id;
         angular.forEach(vm.selected, function(child) {
              Id=child.id;


         });
         var params = {
           id: Id
         }
         console.log(params);
         swal({
                title: "Are you sure?",
                text: "You will not be able to recover this activity file!",
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
                     $http.delete(API_CONFIG.BASE + '/api/activities/'+ Id)
                         .success(function(response) {
                          console.log(response);
                           $mdToast.show(
                               $mdToast.simple()
                               .content($filter('triTranslate')('activity Deleted'))
                               .position('bottom right')
                               .hideDelay(2000)
                           );

                           $state.reload();

                         }).error(function(response) {

                         });
                         swal("Deleted!", "Your activity  has been deleted.", "success");
                } else {
                  swal("Cancelled", "Your activity  is safe :)", "error");
                }
              });
          }


       function addActiviy(event, $event) {
         console.log('21');
           $mdDialog.show({
               controller: 'addActivitysController',
               controllerAs: 'vm',
               templateUrl: 'app/Activitys-module/Activity-add.tmpl.html',
               targetEvent: $event,
               focusOnOpen: false,
               locals: {
                   dialogData: {
                       title: 'Add Activity',
                       confirmButtonText: 'Add'
                   },
                   event: {
                       title: $filter('triTranslate')('New Activity'),

                   },
                   edit: false
               }
           })
           .then(function(event) {
              // vm.eventSources[0].events.push(event);
               $mdToast.show(
                   $mdToast.simple()
                   .content($filter('triTranslate')('Activity Created'))
                   .position('bottom right')
                   .hideDelay(2000)
               );
               $state.reload();
           });
       }
       // listeners



    }
})();
