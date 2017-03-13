(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .factory('AnalyticsService', AnalyticsService);

    /* @ngInject */
    function AnalyticsService() {
        var service = {
            getData: getData
        };

        return service;

        function getData(start, end, span) {
            var startTime = angular.copy(start);
            var endTime = angular.copy(end);

            var data = {
                sessionsLineChartData: [{
                    key: 'Sessions',
                    values: [],
                    area: true
                }],
                visitorPieChartData: [{
                    name: 'New Visitor',
                    value: 0
                },{
                    name: 'Returning Visitor',
                    value: 0
                }],
                usersLineChartData: [{
                    key: 'Users',
                    values: [],
                    area: true
                }],
                pageviewsLineChartData: [{
                    key: 'Users',
                    values: [],
                    area: true
                }],
                pagesSessionsLineChartData: [{
                    key: 'Pages / Session',
                    values: [],
                    area: true
                }],
                avgSessionLineChartData: [{
                    key: 'Avg. Session Duration',
                    values: [],
                    area: true
                }],
                bounceLineChartData: [{
                    key: 'Bounce Rate',
                    values: [],
                    area: true
                }],
                social: {
                    comments: Math.floor((Math.random() * (100)) + 1),
                    tweets: Math.floor((Math.random() * (200)) + 1),
                    likes: Math.floor((Math.random() * (200)) + 1),
                    pageviews: Math.floor((Math.random() * (400)) + 1)
                },
                totals: {
                    sessions: 0,
                    users: 0,
                    pageviews: 0,
                    pagesessions: 0.0,
                    avgsessions: 0,
                    bounces: 0
                }
            };

            // fake pie chart
            data.visitorPieChartData[0].value = Math.random();
            data.visitorPieChartData[1].value = 1 - data.visitorPieChartData[0].value;

            // loop through time to create fake data
            for (var m = startTime; m.diff(endTime, span) <= 0; m.add(1, span)) {
                // fake sessions
                var sessions = Math.floor((Math.random() * (70000 - 50000)) + 50000);
                data.sessionsLineChartData[0].values.push([m.clone().toDate(), sessions]);
                data.totals.sessions += sessions;

                // fake users
                var users = Math.floor((Math.random() * (70000 - 50000)) + 50000);
                data.usersLineChartData[0].values.push([m.clone().toDate(), users]);
                data.totals.users += users;

                // fake pageviews
                var pageviews = Math.floor((Math.random() * (70000 - 50000)) + 50000);
                data.pageviewsLineChartData[0].values.push([m.clone().toDate(), pageviews]);
                data.totals.pageviews += pageviews;

                // fake pages / sessions
                var pagesessions = Math.random() * 4 + 1;
                data.pagesSessionsLineChartData[0].values.push([m.clone().toDate(), pagesessions.toFixed(2)]);
                data.totals.pagesessions += pagesessions;

                // fake avg session in sec
                var avgsession = Math.floor(Math.random() * 240 + 1);
                data.avgSessionLineChartData[0].values.push([m.clone().toDate(), avgsession]);
                data.totals.avgsessions += avgsession;

                // fake bounce rate
                var bounce = Math.random() * 100 + 1;
                data.bounceLineChartData[0].values.push([m.clone().toDate(), bounce]);
                data.totals.bounces += bounce;
            }

            // calculate average for pagesessions
            data.totals.pagesessions = data.totals.pagesessions / data.pagesSessionsLineChartData[0].values.length;
            data.totals.pagesessions = data.totals.pagesessions.toFixed(2);

            // calculate average for avgsessions
            data.totals.avgsessions = Math.floor(data.totals.avgsessions / data.avgSessionLineChartData[0].values.length);

            // calculate average for bounces
            data.totals.bounces = data.totals.bounces / data.bounceLineChartData[0].values.length;


            // Create fake language data
            data.languages = [{
                language: 'en-us',
                percent: 52.86
            },{
                language: 'fr',
                percent: 4.58
            },{
                language: 'en-gb',
                percent: 4.37
            },{
                language: 'es',
                percent: 4.21
            },{
                language: 'pt-br',
                percent: 4.18
            },{
                language: 'de',
                percent: 2.99
            },{
                language: 're',
                percent: 2.93
            },{
                language: 'tr',
                percent: 2.18
            },{
                language: 'it',
                percent: 1.86
            },{
                language: 'nl',
                percent: 1.54
            }];

            for (var lang = 0; lang < data.languages.length; lang++) {
                data.languages[lang].sessions = Math.floor(data.totals.sessions * data.languages[lang].percent);
            }

            // create fake country data
            data.countries = [{
                country: 'United States',
                percent: 14.75
            },{
                country: 'India',
                percent: 11.00
            },{
                country: 'Brazil',
                percent: 4.99
            },{
                country: 'United Kingdom',
                percent: 4.42
            },{
                country: 'France',
                percent: 3.87
            },{
                country: 'Germany',
                percent: 3.82
            },{
                country: 'Spain',
                percent: 3.31
            },{
                country: 'Turkey',
                percent: 3.27
            },{
                country: 'Italy',
                percent: 3.14
            },{
                country: 'Canada',
                percent: 2.62
            }];

            for (var c = 0; c < data.countries.length; c++) {
                data.countries[c].sessions = Math.floor(data.totals.sessions * data.countries[c].percent);
            }

            return data;
        }
    }
})();
