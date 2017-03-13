(function() {
    'use strict';
    angular
        .module('app.examples.dashboards')
        .component('mapWidget', {
            templateUrl: 'app/examples/dashboards/analytics/widgets/map-widget/map-widget.tmpl.html',
            controller: MapWidgetController,
            controllerAs: 'vm'
        });

    /* @ngInject */
    function MapWidgetController(uiGmapGoogleMapApi) {
        var vm = this;

        // setup map
        uiGmapGoogleMapApi.then(function(maps) {
            vm.map = {
                center: {
                    latitude: 40.1451,
                    longitude: -99.6680
                },
                zoom: 4,
                bounds: {
                    northeast: {
                        latitude: 45.1451,
                        longitude: -80.6680
                    },
                    southwest: {
                        latitude: 30.000,
                        longitude: -120.6680
                    }
                },
                options: {
                    scrollwheel: false,
                    mapTypeId: maps.MapTypeId.TERRAIN
                }
            };

            var markers = [];
            for (var i = 0; i < 10; i++) {
                markers.push(createRandomMarker(i, vm.map.bounds));
            }
            vm.randomMarkers = markers;
        });

        function createRandomMarker(i, bounds, idKey) {
            var latMin = bounds.southwest.latitude,
                latRange = bounds.northeast.latitude - latMin,
                lngMin = bounds.southwest.longitude,
                lngRange = bounds.northeast.longitude - lngMin;

            if (idKey == null) {
                idKey = 'id';
            }

            var latitude = latMin + (Math.random() * latRange);
            var longitude = lngMin + (Math.random() * lngRange);
            var ret = {
                latitude: latitude,
                longitude: longitude,
                title: 'm' + i
            };
            ret[idKey] = i;
            return ret;
        }
    }
})();
