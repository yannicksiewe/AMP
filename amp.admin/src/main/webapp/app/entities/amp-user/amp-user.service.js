(function() {
    'use strict';
    angular
        .module('ampfrontApp')
        .factory('AmpUser', AmpUser);

    AmpUser.$inject = ['$resource', 'DateUtils','SERVER_URL'];

    function AmpUser ($resource, DateUtils,SERVER_URL) {
        var resourceUrl =  SERVER_URL+'/rest/ampuser/:id';

        return $resource(resourceUrl, {id: '@id'}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.credtlExpir = DateUtils.convertDateTimeFromServer(data.credtlExpir);
                        data.accountExpir = DateUtils.convertDateTimeFromServer(data.accountExpir);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'findByLike': {
                method: 'POST',
                url: SERVER_URL+'/rest/ampuser/findByLike'
            }
        });
    }
})();
