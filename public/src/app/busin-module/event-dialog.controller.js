(function() {
    'use strict';

    angular
        .module('busin-module')
        .controller('EventDialogController', EventDialogController);

    /* @ngInject */
    function EventDialogController($rootScope ,$scope,$http, $mdDialog, $filter, $timeout,$log,triTheming, dialogData, API_CONFIG ,event, edit,Data,uiGmapGoogleMapApi) {

        var vm = this;
        vm.cancelClick = cancelClick;
        $scope.settF = [];
        $scope.languageSettings = [];
        $scope.TaxonomiesSettings=[];
        vm.lat;
        vm.lon;
        $scope.map = { center: { latitude: 37.10120867317552, longitude: 25.352935058593744 }, zoom: 8 };
        $scope.flag_ids = [];
        $scope.flag_name = [];
        $scope.flag_machine = [];
        vm.deleteClick = deleteClick;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        vm.test = test;
        $scope.output_data_1 = [];
        $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;

    $scope.marker = {
      id: 0,
      coords: {
        latitude: 37.10120867317552,
        longitude: 25.352935058593744
      },
      options: { draggable: true },
      events: {
        click: function (marker) {
          swal({
            title: "Event",
                  text: vm.event.description,
                  timer: 5000,
                  showConfirmButton: true
            });
        },
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          vm.lat = marker.getPosition().lat();
          vm.lon = marker.getPosition().lng();
          $log.log(vm.lat);
          $log.log(vm.lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: vm.event.description,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
      $scope.coordsUpdates++;
    });
    $timeout(function () {
      $scope.marker.coords = {
        latitude: 37.10120867317552,
        longitude: 25.352935058593744
      };
      $scope.dynamicMoveCtr++;
      $timeout(function () {
        $scope.marker.coords = {
          latitude: 37.10120867317552,
          longitude: 25.352935058593744
        };
        $scope.dynamicMoveCtr++;
      }, 2000);
    }, 1000);
  /*  var events = {
    places_changed: function (searchBox) {
        var place = searchBox.getPlaces();
        if (!place || place == 'undefined' || place.length == 0) {
            console.log('no place data :(');
            return;
        }

        $scope.map = {
            "center": {
                "latitude": place[0].geometry.location.lat(),
                "longitude": place[0].geometry.location.lng()
            },
            "zoom": 18
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: place[0].geometry.location.lat(),
                longitude: place[0].geometry.location.lng()
            }
        };
    }
};
$scope.searchbox = { template: 'searchbox.tpl.html', events: events };*/
$scope.InsertItems = function(e)
  {
  //Do what you need to do
  console.log(e);
  }
$scope.stepsModel = [];
$scope.CustomCallback=function(item, selectedItems){
  console.log(item );
  console.log(selectedItems);
}
$scope.imageUpload = function(event){
     var files = event.target.files; //FileList object
     console.log(files);


     for (var i = 0; i < files.length; i++) {
         var file = files[i];

             var reader = new FileReader();
             reader.onload = $scope.imageIsLoaded;
             reader.readAsDataURL(file);
             /*$http.post(API_CONFIG.BASE + '/api/business-media?business_id=1&type=1', file)
                 .success(function(response) {
                   console.log(response);



                 }).error(function(response) {
                   console.log(response);
                 });*/
     }
}

$scope.imageIsLoaded = function(e){
    $scope.$apply(function() {
        $scope.stepsModel.push(e.target.result);
    });
}
        function okClick() {
            console.log(vm.lat);
            console.log(vm.lon);
            var socials=[{provider:"vimeo",url:vm.event.vimeo},{provider:"fb",url:vm.event.fb},{provider:"twitter",url:vm.event.tweet}]
            var location=[vm.lat,vm.lon]
            var params = {
              name: vm.event.name,
              slug:vm.event.slug,
              description:vm.event.desc,
              email: vm.event.email,
              phone: vm.event.mobile,
              active: vm.event.check,
              language_list:vm.event.langua,
              social_media_list:socials,
              locations_list:location

            }
            console.log(params);
          $http.post(API_CONFIG.BASE + '/api/businesses', params)
              .success(function(response) {
                console.log(response);
                $mdDialog.hide(vm.event);


              }).error(function(response) {
                console.log(response);
              });
        }

        function cancelClick() {
            $mdDialog.cancel();
        }
        function test(x) {
            console.log(x);
        }
        function deleteClick() {
            vm.event.deleteMe = true;
            $mdDialog.hide(vm.event);
        }


        function createSelectOptions() {
            Data.getRoles(function (res) {

              angular.forEach(res.data, function(child) {
                  $scope.settF.push({
                      id: child.id,
                      name: child.name,
                      machine: child.machine
                    });

              });
              for (var i = 0; i < $scope.settF.length; i++) {

            $scope.flag_ids.push($scope.settF[i].id);
            $scope.flag_name.push($scope.settF[i].name);
            $scope.flag_machine.push($scope.settF[i].machine);
          };


            }, function () {
               $rootScope.error = 'Failed to fetch restricted API content.';
           });
           Data.getBus(function (res) {
             var id=[];

             angular.forEach(res.data.data, function(child) {
                id.push(child.id);
             });

             vm.event.businesses=id;

           }, function () {
              $rootScope.error = 'Failed to fetch restricted API content.';
          });
          Data.getLanguages(function (res) {
            angular.forEach(res.data.data, function(child) {
              $scope.languageSettings.push({
                  id: child.id,
                  name: child.name,
                  native: child.native
                });
            });



          }, function () {
             $rootScope.error = 'Failed to fetch restricted API content.';
         });
         Data.getTaxonomies(function (res) {
          angular.forEach(res.data, function(child) {
            console.log(child);

             $scope.TaxonomiesSettings.push({

                 id: child.id,
                 name: child.slug,
                 children: child.children,
                 selected: false
               });
           });



         }, function () {
            $rootScope.error = 'Failed to fetch restricted API content.';
        });
        console.log($scope.TaxonomiesSettings);
        }

        // init
        createSelectOptions();

    }
})();
