(function() {
    'use strict';
    angular
        .module('ampmember')
        .factory('Member', Member);

    Member.$inject = ['$resource', 'DateUtils', 'SERVER_URL'];

    function Member ($resource, DateUtils,SERVER_URL) {
        var resourceUrl =  SERVER_URL+'/rest/member/:id';

        return $resource(resourceUrl, {id: '@id'}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.activationDate = DateUtils.convertDateTimeFromServer(data.activationDate);
                        data.expirationDate = DateUtils.convertDateTimeFromServer(data.expirationDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'findBy': {
                method: 'POST',
                url: SERVER_URL+'/rest/member/findBy'
            }
        });
    }
})();
