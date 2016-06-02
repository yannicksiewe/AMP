(function() {
    'use strict';
    angular
        .module('ampmember')
        .factory('Partner', Partner);

    Partner.$inject = ['$resource', 'DateUtils', 'SERVER_URL'];

    function Partner ($resource, DateUtils,SERVER_URL) {
        var resourceUrl =  SERVER_URL+'/rest/partner/:id';

        return $resource(resourceUrl, {id: '@id'}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.companyCreationDate = DateUtils.convertDateTimeFromServer(data.companyCreationDate);
                        data.emissionDate = DateUtils.convertDateTimeFromServer(data.emissionDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'findByLike': {
                method: 'POST',
                url: SERVER_URL+'/rest/partner/findByLike'
            }
        });
    }
})();
