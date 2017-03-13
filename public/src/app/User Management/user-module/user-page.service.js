(function() {
    'use strict';

    angular
        .module('UserManagement')
        .factory('UserSearchService', Service);



    /* @ngInject */
    function Service($http,$q,API_CONFIG) {
        return {
            getUsers: getUsers
        };

        ////////////////

        function getUsers(query) {
          var order = query.order === 'id' ? 'desc':'asc';
           return $http.post(API_CONFIG.BASE+'/api/users/search?key='+query.filter).
            success(function(data) {

                return data;
            }).error(function(response) {

            });
        }
    }
})();
